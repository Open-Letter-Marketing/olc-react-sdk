import React, { useEffect, useState } from 'react';

// Import Polotno and third-party libraries
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { Workspace } from 'polotno/canvas/workspace';
import { setGoogleFonts } from 'polotno/config';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { StoreType } from 'polotno/model/store';

// Actions
import {
  CLEAR_REDUX,
  GET_ONE_TEMPLATE,
  SET_CUSTOM_FIELDS,
  SET_CUSTOM_FIELDS_V2,
  SET_PLATFORM_FIELDS,
  TEMPLATE_LOADING,
} from '../../redux/actions/action-types';
import { failure } from '../../redux/actions/snackbarActions';
import {
  searchAndAdvanceChange,
  selectProduct,
} from '../../redux/actions/templateActions';

// Utils
import {
  drawRestrictedAreaOnPage,
  getFileAsBlob,
} from '../../utils/template-builder';
import { addIdentifiersForTemplates } from '../../utils/templateIdentifierArea';
import { addElementsforRealPennedLetters } from '../../utils/templateRestrictedArea/realPenned';
import { DPI, allowedImageTypes, multiPageLetters } from '../../utils/constants';
import { addSafetyBordersForTemplates } from '../../utils/templateSafetyBorders';
import { MESSAGES } from '../../utils/message';
import { removeItem } from '../../utils/local-storage';

// @ts-ignore
import fonts from '../../utils/fonts.json';
// @ts-ignore
import LexiRegularFont from '../../assets/Fonts/Lexi-Regular.ttf';

// Components
import TopNavigation from '../TopNavigation';
import SidePanel from '../SidePanel';
import Typography from '../GenericUIBlocks/Typography';
import GenericSnackbar from '../GenericUIBlocks/GenericSnackbar/Toast';

import './styles.scss';

/**
 * This code defines a React functional component called `TemplateBuilder` that is responsible for rendering a template builder interface.
 * It includes various useEffect hooks to handle component lifecycle events and state updates.
 * The component uses the `polotno` library to create a canvas workspace where users can design templates.
 * It also includes a side panel with different sections for adding and customizing elements on the canvas.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.store - The store object passed as a prop to the `TemplateBuilder` component.
 * @param {Object} props.styles - The styles contain CSS Properties passed as a prop to the `TemplateBuilder` component.
 * @returns {JSX.Element} The rendered template builder interface.
 */

interface TemplateBuilderProps {
  store: StoreType;
  platformName?: string | null;
  templateGalleryModal?: boolean;
  createTemplateRoute?: string | null;
  olcTemplate?: Record<string, any>;
  designerTemplateQuery?: Record<string, any> | null;
  allowSenderFields?: boolean;
  allowPropertyFields?: boolean;
  excludedFields?: string[] | null;
  designerQueryAmount?: string | number;
  allowedAddOns?: any;
  allowedTemplateSections?: any;
  onReturnAndNavigate?: () => void;
  onGetCustomFields?: () => Promise<any>;
  onCreateCustomTemplateQuery?: (payload: any) => Promise<any>;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  store,
  platformName,
  templateGalleryModal,
  createTemplateRoute,
  designerTemplateQuery,
  olcTemplate,
  allowSenderFields,
  excludedFields,
  designerQueryAmount,
  allowPropertyFields,
  allowedAddOns,
  allowedTemplateSections,
  onCreateCustomTemplateQuery,
  onReturnAndNavigate,
  onGetOneTemplate,
  onGetCustomFields,
  onGetTemplates,
  onSubmit,
}) => {
  const [isStoreUpdated, setIsStoreUpdated] = useState(false);
  const [switchTabCount, setSwitchTabCount] = useState(1);
  const [selectedSection, setSelectedSection] = useState('text');

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const template = useSelector(
    (state: RootState) => state.templates.template
  ) as Record<string, any>;
  const product = useSelector(
    (state: RootState) => state.templates.product
  ) as Record<string, any>;
  const envelopeType = useSelector(
    (state: RootState) => state.templates.envelopeType
  );
  const allProducts = useSelector((state: RootState) => state.templates.products);

  const currentTemplateType = product?.productType;

  const containerStyle = {
    width: '100vw',
    height: '90vh',
    position: 'relative',
  };

  useEffect(() => {
    if (olcTemplate) {
      handleLoadTemplate();
    }
  }, [olcTemplate]);

  useEffect(() => {
    if (designerTemplateQuery) {
      setTimeout(() => {
        handleLoadDesignerTemplate();
      }, 100);
    }
  }, [designerTemplateQuery]);

  // Event listener for visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitchTabCount((prev) => prev + 1);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('.polotno-side-tabs-container') &&
        store?.openedSidePanel !== 'Templates'
      ) {
        setSelectedSection(store?.openedSidePanel);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    removeItem('hireDesignerFormState');
    removeItem('queryFiles');
  }, [])

  useEffect(() => {
    if (!product && !olcTemplate && !id && !designerTemplateQuery) {
      navigate(createTemplateRoute || '/create-template');
    }
  }, []);

  // @ts-ignore
  useEffect(() => {
    if (product || (id && onGetOneTemplate)) {
      setGoogleFonts(fonts);

      if (id && onGetOneTemplate) {
        try {
          onGetOneTemplate(id).then((template) => {
            if (template) {
              dispatch({ type: GET_ONE_TEMPLATE, payload: { data: template } });
              addSafetyBordersForTemplates(template?.product?.id, store);
              dispatch({ type: TEMPLATE_LOADING, payload: true });
            } else {
              dispatch(failure('Unable to load the Template'));
              setTimeout(() => {
                navigate(createTemplateRoute || '/create-template');
              }, 1000);
            }
          });
        } catch (error) {
          return error;
        } finally {
          dispatch({ type: TEMPLATE_LOADING, payload: false });
        }
        // @ts-ignore
      } else if (store.pages.length === 0 && !olcTemplate) {
        createInitialPage();
      }

      fetchCustomFields();

      const handleChange = () => {
        if (!isStoreUpdated) {
          setIsStoreUpdated(true);
        }
      };

      const off = store.on('change', handleChange);

      return () => {
        store.history.clear();
        store.clear();
        off();
      };
    }
  }, []);

  useEffect(() => {
    if (!id && !olcTemplate && product && store.pages.length === 0) {
      createInitialPage();
    }
  }, [product]);

  useEffect(() => {
    const handleBeforeUnload = (event: { returnValue: string }) => {
      const message = 'Are you sure you want to leave?';
      event.returnValue = message;
      return message;
    };

    const addBeforeUnloadListener = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('beforeunload', handleBeforeUnload);
    };

    const removeBeforeUnloadListener = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

    if (isStoreUpdated) {
      addBeforeUnloadListener();
    }

    return () => {
      removeBeforeUnloadListener();
    };
  }, [isStoreUpdated]);

  const fetchCustomFields = async () => {
    if (onGetCustomFields) {
      const allCustomFields: any = await onGetCustomFields();
      const platformFields: any = [];
      const customFields: any = [];


      if (allCustomFields?.version === 'v2') {
        const flattenedFields = allCustomFields.customFields.flatMap((section: { fields: any; }) => section.fields);

        for (const field of flattenedFields) {
          (field.isPlatformField ? platformFields : customFields).push(field);
        }
        const filteredCustomFields = allCustomFields?.customFields
          .map((customField: any) => ({
            ...customField,
            fields: customField.fields.filter((field: any) => customFields.includes(field))
          }))
          .filter((section: { fields: any[] }) => section.fields.length > 0);

        if (allCustomFields?.customFields?.length) {
          dispatch({ type: SET_CUSTOM_FIELDS, payload: [] });
          dispatch({ type: SET_CUSTOM_FIELDS_V2, payload: filteredCustomFields });
        } else {
          dispatch({ type: SET_CUSTOM_FIELDS, payload: [] });
          dispatch({ type: SET_CUSTOM_FIELDS_V2, payload: [] });
        }

        if (platformFields.length) {
          dispatch({ type: SET_PLATFORM_FIELDS, payload: platformFields });
        } else {
          dispatch({ type: SET_PLATFORM_FIELDS, payload: [] });
        }

      } else {

        for (const field of allCustomFields) {
          (field.isPlatformField ? platformFields : customFields).push(field);
        }

        if (customFields.length) {
          dispatch({ type: SET_CUSTOM_FIELDS, payload: customFields });
        } else {
          dispatch({ type: SET_CUSTOM_FIELDS, payload: [] });
        }

        if (platformFields.length) {
          dispatch({ type: SET_PLATFORM_FIELDS, payload: platformFields });
        } else {
          dispatch({ type: SET_PLATFORM_FIELDS, payload: [] });
        }
      }
    }
  };

  const createInitialPage = async () => {
    if (product) {
      store.openSidePanel('text');
      store.addPage();
      const paperSize = product?.selectedSize?.split('x');
      store.setUnit({
        unit: 'in',
        dpi: DPI,
      });
      store.setSize(+paperSize[1] * DPI, +paperSize[0] * DPI);
      if (multiPageLetters.includes(product.productType)) {
        store.addPage();
        store.selectPage(store.pages[0].id);
      }
      //@ts-ignore
      drawRestrictedAreaOnPage(store, product, envelopeType);
      addIdentifiersForTemplates(product.id, store);
      if (currentTemplateType === 'Real Penned Letter') {
        handleRealPennedLetters();
      }

      store.history.clear();
    }

    setIsStoreUpdated(false);
  };

  const handleRealPennedLetters = async () => {
    try {
      // Load Lexi Regular Fonts Into Store
      store.addFont({
        fontFamily: 'lexi Regular',
        url: LexiRegularFont,
      });
      addElementsforRealPennedLetters(store);

      const response = await fetch(LexiRegularFont);
      const blob = await response.blob();

      const reader = new FileReader();
      // Load Lexi Regular Base64 into JSON
      reader.onloadend = () => {
        store.addFont({
          fontFamily: 'lexi Regular',
          url: reader.result,
        } as any);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading the font file:', error);
    }
  };

  const handleLoadDesignerTemplate = async () => {
    if (designerTemplateQuery?.title && designerTemplateQuery?.product) {
      const flatProducts = allProducts.flatMap(product =>
        product.size.map((sizeItem: any) => ({
          id: sizeItem.id || product.id,
          title: product.title,
          productType: product.productType,
          size: [{ id: sizeItem.id || product.id, size: sizeItem.size }],
          ...(product.windowed !== undefined && { windowed: product.windowed })
        }))
      );
      const selectedProduct = flatProducts.find((product) => product.id === designerTemplateQuery?.product?.id);
      if (selectedProduct) {
        dispatch({ type: CLEAR_REDUX });
        store.clear();
        store.history.clear();
        dispatch(searchAndAdvanceChange('title', designerTemplateQuery?.title));
        if (selectedProduct.productType === 'Professional Letters') {
          let selectedEnvelope = selectedProduct.id == 2 ? '#10 Double-Window' : '#10 Grey'
          dispatch(searchAndAdvanceChange('envelopeType', selectedEnvelope));
        }
        dispatch(selectProduct(selectedProduct));
        return;
      }
    }
    onReturnAndNavigate ? onReturnAndNavigate() : navigate(createTemplateRoute || '/');
  };

  const handleLoadTemplate = async () => {
    const existingTemplate = olcTemplate;
    if (existingTemplate) {
      dispatch({ type: GET_ONE_TEMPLATE, payload: { data: existingTemplate } });
      const workspaceElement = document.querySelector(
        '.polotno-workspace-container'
      );
      if (workspaceElement) {
        workspaceElement.classList.add('show-loader');
      }
      // @ts-ignore
      const paperDimensions = existingTemplate?.product?.paperSize.split('x');
      store.setUnit({
        unit: 'in',
        dpi: 96,
      });
      store.setSize(+paperDimensions[1] * DPI, +paperDimensions[0] * DPI);
      let jsonData = await getFileAsBlob(existingTemplate?.templateUrl);
      if (existingTemplate?.product?.productType === 'Real Penned Letter') {
        let clonedJson = JSON.stringify(jsonData)
          .replace(/{{/g, '((')
          .replace(/}}/g, '))');
        jsonData = JSON.parse(clonedJson);
      }
      store.loadJSON(jsonData);
      await store.waitLoading();
      setIsStoreUpdated(false);
      addSafetyBordersForTemplates(existingTemplate?.product?.id, store);
      dispatch({ type: TEMPLATE_LOADING, payload: false });
      if (workspaceElement) {
        workspaceElement.classList.add('hide-loader');
      }
    }
  };

  // Incase of Real Penned Letters hide tooltip
  const Tooltip = () => null;

  return (
    <>
      <Typography className="hideTemplateBuilder">
        {MESSAGES.TEMPLATE_MESSAGE_ON_SMALL_SCREEN}
      </Typography>
      <div className="polotno-container">
        {switchTabCount > 0 && (
          <div className="builder-wrapper">
            <TopNavigation
              store={store}
              isStoreUpdated={isStoreUpdated}
              olcTemplate={olcTemplate}
              onReturnAndNavigate={onReturnAndNavigate}
              onSubmit={onSubmit}
            />

            <PolotnoContainer style={containerStyle}>
              <SidePanel
                store={store}
                currentTemplateType={currentTemplateType}
                platformName={platformName}
                templateGalleryModal={templateGalleryModal}
                allowSenderFields={allowSenderFields}
                allowPropertyFields={allowPropertyFields}
                excludedFields={excludedFields}
                designerQueryAmount={designerQueryAmount}
                allowedAddOns={allowedAddOns}
                allowedTemplateSections={allowedTemplateSections}
                onGetTemplates={onGetTemplates}
                onGetOneTemplate={onGetOneTemplate}
                onGetCustomFields={onGetCustomFields}
                selectedSection={selectedSection}
                onCreateCustomTemplateQuery={onCreateCustomTemplateQuery}
              />
              <WorkspaceWrap>
                {currentTemplateType !== 'Real Penned Letter' && (
                  <Toolbar store={store} downloadButtonEnabled={false} />
                )}
                {currentTemplateType !== 'Real Penned Letter' ? (
                  <Workspace store={store} pageControlsEnabled={false} />
                ) : (
                  <Workspace
                    store={store}
                    pageControlsEnabled={false}
                    components={{ Tooltip }}
                  />
                )}
                <ZoomButtons store={store} />
              </WorkspaceWrap>
            </PolotnoContainer>
            <GenericSnackbar />
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateBuilder;
