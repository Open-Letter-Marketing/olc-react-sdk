import React, { useEffect, useState } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';

// Actions
import {
  clearTemplateFields,
  loadFormDataToStore,
  downloadProof,
} from '../../redux/actions/templateActions';
import { failure, success } from '../../redux/actions/snackbarActions';

// Components
import SaveTemplateModel from './SaveTemplateModel';
import ConfirmNavigateDialog from './ConfirmNavigateDialog';
import EditTemplateNameModel from './EditTemplateNameModel';

// Utils
import { changeColorOfBoxesForSnapPack, downloadPDF, extractFontFamilies, isValidQR, multiPageTemplates, removeBracketsFromRPL, validateEmoji, validateGSV } from '../../utils/template-builder';
import { getItem, setItem } from '../../utils/local-storage';
import { MESSAGES } from '../../utils/message';
// @ts-ignore
import fonts from '../../utils/fonts.json';

// UI Components
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";
import CircularProgress from "../GenericUIBlocks/CircularProgress";
import { GridContainer, GridItem } from '../GenericUIBlocks/Grid';
import DuplicateTemplateModal from "./DuplicateTemplateModal";
import GeneralTooltip from '../GenericUIBlocks/GeneralTooltip';

// Icons
// @ts-ignore
import EditIcon from '../../assets/images/templates/edit-pencil-icon.tsx';
// @ts-ignore
import DownloadIcon from '../../assets/images/modal-icons/order-download.tsx';
// @ts-ignore
import CloneIcon from '../../assets/images/modal-icons/template-copy.tsx';
// Styles
import './styles.scss';



/**
 * Represents the top navigation bar of a template builder application.
 * Handles saving and navigation logic, as well as displaying a confirmation dialog for unsaved changes.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.store - The store object used for saving the template.
 * @param {boolean} props.isStoreUpdated - Indicates whether the store has been updated.
 * @returns {JSX.Element} The top navigation bar component.
 */

const buttonStyles: React.CSSProperties = {
  maxWidth: '120px',
  minHeight: '40px',
  backgroundColor: '#fff',
  color: 'var(--text-color)',
  border: '0.5px solid var(--border-color)',
  fontSize: '15px',
  fontWeight: '500',
};

const progressStyles: React.CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid var(--primary-color)',
};

interface TopNavigationProps {
  store: any;
  createTemplateRoute?: string | null;
  isStoreUpdated: boolean;
  setIsDuplication: any;
  olcTemplate?: Record<string, any>;
  designerTemplateQuery?: Record<string, any> | null;
  onDuplicateTemplate?: (payload: any) => Promise<any>;
  onReturnAndNavigate?: () => void;
  onSubmit?: (payload: any) => Promise<any>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  store,
  createTemplateRoute,
  isStoreUpdated,
  setIsDuplication,
  olcTemplate,
  designerTemplateQuery,
  onDuplicateTemplate,
  onReturnAndNavigate,
  onSubmit,
}) => {

  const [showNavigateDialog, setShowNavigateDialog] = useState<boolean>(false);
  const [isShowModel, setIsShowModel] = useState<{
    open: boolean;
    model: string;
    loading: boolean;
    inputValue?: string;
  }>({
    open: false,
    model: '',
    loading: false,
    inputValue: '',
  });
  const [downloadingProof, setDownloaingProof] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const title = useSelector((state: RootState) => state.templates.title);
  const product = useSelector((state: RootState) => state.templates.product) as Record<string, any>;

  const dynamicFields = useSelector(
    (state: RootState) => state.templates.dynamicFields
  );
  const defaultFields = useSelector(
    (state: RootState) => state.templates.defaultDynamicFields
  );

  const defaultSenderFields = useSelector(
    (state: RootState) => state.templates.defaultSenderFields
  );

  const customFields = useSelector(
    (state: RootState) => state.customFields.customFields
  );

  const customFieldsV2 = useSelector(
    (state: RootState) => state.customFields.customFieldsV2
  ) as Record<string, any>;

  const defaultPropertyFields = useSelector(
    (state: RootState) => state.templates.defaultPropertyFields
  );

  const templateType = useSelector(
    (state: RootState) => state.templates.templateType
  );
  const envelopeType = useSelector(
    (state: RootState) => state.templates.envelopeType
  );

  const rosOfferPercentage = useSelector(
    (state: RootState) => state.templates.offerPercentage
  );

  const defaultMiscFields = useSelector(
    (state: RootState) => state.templates.defaultMiscFields
  );

  useEffect(() => {
    if (!id) {
      const formData = getItem('formData');
      if (formData && !title) {
        dispatch(loadFormDataToStore(formData));
      } else {
        handleSaveFormData();
      }
    }
  }, [title]);

  const handleSaveFormData = () => {
    const data = { title, product, templateType, envelopeType };
    setItem('formData', JSON.stringify(data));
  };

  const handleBackPress = () => {
    if (isStoreUpdated) {
      setShowNavigateDialog(!showNavigateDialog);
    } else {
      handleNavigation(createTemplateRoute || '/create-template');
    }
  };

  const closeDuplicateModal = () => {
      setIsShowModel((prev) => ({
        ...prev,
        open: false,
        model: '',
        inputValue: '',
      }))
  }

  const handleNavigation = async (route = '/') => {
    handleClearFilters();
    if (templateType === 'json' && product?.productType !== 'Real Penned Letter') {
      await store.history.clear();
    }
    onReturnAndNavigate ? onReturnAndNavigate() : navigate(route); 
  };

  const handleClearFilters = () => dispatch(clearTemplateFields());

  const handleViewProofWithLamda = async () => {
    try {
      setDownloaingProof(true);
      let flattenedFieldsV2 = []; 
      if (customFieldsV2.length > 0) {
        flattenedFieldsV2 = customFieldsV2?.flatMap((section: { fields: any; }) => section.fields);
      }
      const fields = [...defaultFields, ...customFields, ...flattenedFieldsV2 ,...Object.values(dynamicFields), ...defaultSenderFields, ...defaultPropertyFields, ...defaultMiscFields, {value : "{{ROS.PROPERTY_OFFER}}",  key : "{{ROS.PROPERTY_OFFER}}", defaultValue: "$123,456.00"}];
      let json = store.toJSON();
      const jsonSize = new Blob([JSON.stringify(json)]).size;
      if (jsonSize > 5242880) {
        dispatch(failure(MESSAGES.TEMPLATE.SIZE_LIMIT_EXCEED));
        return;
      }
      if (product?.productType === "Real Penned Letter") {
        const removedUnsupportedBrackets = removeBracketsFromRPL(json);
        json = removedUnsupportedBrackets;
        let clonedJson = JSON.stringify(json)
          .replace(/\(\(/g, "{{")
          .replace(/\)\)/g, "}}");
        json = JSON.parse(clonedJson);
      }
      if (product.productType === 'Snap Pack Mailers') {
        const updatedBoxes = changeColorOfBoxesForSnapPack(json);
        json = updatedBoxes;
      }
      let jsonString = JSON.stringify(json);
      fields.forEach(({ key, defaultValue, value }) => {
        const regex = new RegExp(key, 'g');
        jsonString = jsonString.replace(regex, defaultValue || value);
      });
      const jsonWithDummyData = JSON.parse(jsonString);
      const response: any = await downloadProof({
        json: jsonWithDummyData,
      });
      if (response.status === 200) {
        const binaryData = atob(response.data.data.base64);
        // Create a Uint8Array from the binary data
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: 'application/pdf' });

        // Create an Object URL for the Blob
        const url = URL.createObjectURL(blob);
        downloadPDF(title.substring(0, 20), url);
        dispatch(success('Download Proof generated successfully'));
      } else {
        dispatch(failure(response?.data?.message || response?.message || MESSAGES.DOWNLOAD_ERROR));
      }
    } catch (error: any) {
      dispatch(
        failure(
          error?.response?.data?.message ||
          error?.message ||
          'Error while downloading proof'
        )
      );
    } finally {
      setDownloaingProof(false);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      const allFields = [...defaultFields, ...customFields, ...Object.values(dynamicFields), ...defaultSenderFields, ...defaultPropertyFields, ...defaultMiscFields];
      let selectedFields: any = [];
      if (templateType === 'json') {
        let jsonData = store.toJSON();

        const jsonSize = new Blob([JSON.stringify(jsonData)]).size;
        if (jsonSize > 5242880) {
          dispatch(failure(MESSAGES.TEMPLATE.SIZE_LIMIT_EXCEED));
          return;
        }

        const hasEmoji = validateEmoji(jsonData.pages);

        if (hasEmoji) {
          dispatch(failure(MESSAGES.TEMPLATE.EMOJI_NOT_ALLOWED));
          return;
        }

        if (product?.productType === "Real Penned Letter") {
          const removedUnsupportedBrackets = removeBracketsFromRPL(jsonData);
          jsonData = removedUnsupportedBrackets;
          let clonedJson = JSON.stringify(jsonData)
            .replace(/\(\(/g, "{{")
            .replace(/\)\)/g, "}}");
          jsonData = JSON.parse(clonedJson);
          await store.loadJSON(jsonData);
        }

        if (product.productType === 'Snap Pack Mailers') {
          const updatedBoxes = changeColorOfBoxesForSnapPack(jsonData);
          jsonData = updatedBoxes;
        }

        // get all fonts family from json
        const fontFamilies = extractFontFamilies(jsonData?.pages);

        // extract custom fonts and remove google fonts from that array
        const customFonts = fontFamilies.filter((item: any) => !fonts.includes(item));

        const availableBase64inJson = jsonData?.fonts?.map((font: any) => font?.fontFamily);

        const unAvailableFonts = customFonts.filter((item: any) => !availableBase64inJson?.includes(item));

        if (unAvailableFonts?.length) {
          dispatch(failure(`Please upload ${unAvailableFonts[0]} font in My Fonts section.`));
          return
        }

        const isGsvValid = validateGSV(jsonData.pages);

        if (!isGsvValid) {
          dispatch(failure(MESSAGES.TEMPLATE.GSV_RESTRICT_ONE_PER_PAGE));
          return;
        }

        const hasEmptyQR = !isValidQR(jsonData.pages);
        
        if (hasEmptyQR) {
          dispatch(failure(MESSAGES.TEMPLATE.EMPTY_QR_NOT_ALLOWED));
          return;
        }

        setIsShowModel((prev) => ({ ...prev, loading: true }));

        const blob = await store.toBlob();

        if (multiPageTemplates.includes(product.productType)) {
          const backJsonData = { ...jsonData, pages: [jsonData.pages[1]] }
          await store.loadJSON(backJsonData);
          await store.waitLoading();
          const backBlob = await store.toBlob();
          formData.append('backThumbnail', backBlob, 'backLogo.png');
          store.loadJSON(jsonData);
        }

        const jsonString = JSON.stringify(jsonData);
        const blobData = new Blob([jsonString], { type: 'application/json' });
        formData.append('json', blobData, 'template.json');
        formData.append('thumbnail', blob, 'logo.png');
        selectedFields = allFields.filter(field => jsonString.includes(field.key));
        jsonString.includes('ros_') || jsonString.includes('{{ROS.PROPERTY_OFFER}}') ?  formData.append('rosOfferPercentage', rosOfferPercentage) : undefined;
      }

      formData.append('title', title);
      formData.append('productId', product?.id);
      selectedFields.length ? formData.append('fields', JSON.stringify(selectedFields)) : undefined;
      envelopeType.length ?  formData.append('envelopeType', envelopeType) : undefined;

      if (onSubmit) {
        const saveTemplate = await onSubmit(formData);
        if (saveTemplate) {
          // dispatch(success(olcTemplate ? 'Template Updated Successfully' : 'Template Created Successfully'));
          handleNavigation();
        }
      } else {
        dispatch(failure("Please add onSubmit handler via Props to save template"))
      }
    } catch (error) {
      return error;
    } finally {
      setIsShowModel((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleChangeModel = (model: string = '', loading: string | null = null) => {
    setIsShowModel((prev) => ({
      ...prev,
      open: !prev.open,
      loading: loading === 'false' ? false : prev.loading,
      model,
    }));
  };

  return (
    <div className="top-navigation-container">
      {showNavigateDialog && (
        <ConfirmNavigateDialog
          open={showNavigateDialog}
          handleClose={() => setShowNavigateDialog(false)}
          handleNavigateAction={() =>
            handleNavigation(createTemplateRoute || '/create-template')
          }
        />
      )}
      {isShowModel?.open && isShowModel?.model === 'edit' && (
        <EditTemplateNameModel
          open={isShowModel?.open}
          handleClose={() => handleChangeModel()}
        />
      )}
      {isShowModel.open && isShowModel.model === 'save' && (
        <SaveTemplateModel
          loading={isShowModel.loading}
          open={isShowModel.open}
          handleClose={() => handleChangeModel()}
          handleSave={handleSave}
        />
      )}
      {/* Duplicate Template Modal */}
      <DuplicateTemplateModal
        open={isShowModel.open && isShowModel.model === 'duplicate'}
        value={isShowModel.inputValue || ''}
        onChange={(val) =>
          setIsShowModel((prev) => ({
            ...prev,
            inputValue: val,
          }))
        }
        error=""
        title={MESSAGES.TEMPLATE.DUPLICATE_MODAL.TITLE}
        submitButtonText={MESSAGES.TEMPLATE.DUPLICATE_MODAL.SUBMIT_BUTTON}
        onCancel={closeDuplicateModal}
        onDuplicateTemplate={onDuplicateTemplate}
        setIsDuplication={setIsDuplication}
        icon={<CloneIcon fill="var(--primary-color)" />}
      />
      <GridContainer style={{alignItems: 'center'}}>
        <GridItem lg={4} md={4} sm={0} xs={0}></GridItem>
        <GridItem lg={3} md={2} sm={2} xs={12}>
          <div className="middle">
            <Typography>{title}</Typography>
            <div onClick={() => handleChangeModel('edit')}>
              <EditIcon fill="var(--text-color)" />
            </div>
          </div>
        </GridItem>
        <GridItem lg={5} md={6} sm={9} xs={12}>
          <div className="actionsBtnWrapper right">
            {olcTemplate && !designerTemplateQuery && <div
              className="clone"
              style={{
                ...buttonStyles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40px',
                fontWeight: '400',
                maxWidth: 'auto',
                minWidth: '50px',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() =>
                setIsShowModel(prev => ({
                  ...prev,
                  open: true,
                  model: 'duplicate',
                  inputValue: '',
                }))
              }
            >
              <CloneIcon fill="#545454" />
            </div>}
            <GeneralTooltip
              title={MESSAGES.TEMPLATE.DUPLICATE_MODAL.TITLE}
              place="bottom"
              anchorSelect=".clone"
            />
            <div
              className="download"
              style={{
                ...buttonStyles,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40px',
                fontWeight: '400',
                maxWidth: 'auto',
                minWidth: '50px',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={handleViewProofWithLamda}
            >
              {downloadingProof ? (
                <CircularProgress style={progressStyles} />
              ) : (
                <DownloadIcon />
              )}
            </div>
            <GeneralTooltip
              title={MESSAGES.TEMPLATE.DOWNLOAD_PROOF_BUTTON}
              place="bottom"
              anchorSelect=".download"
            />
            <Button
              style={{
                ...buttonStyles,
                border: '0.5px solid var(--primary-color)',
                color: 'var(--primary-color)',
              }}
              onClick={() => handleBackPress()}
            >
              {MESSAGES.TEMPLATE.CANCEL_BUTTON}
            </Button>
            <Button
              style={{
                ...buttonStyles,
                border: 'none',
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
              }}
              onClick={() => handleChangeModel('save')}
            >
              {MESSAGES.TEMPLATE.SUBMIT_BUTTON}
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default TopNavigation;
