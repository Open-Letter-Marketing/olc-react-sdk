import React, { useEffect, useState } from 'react';

// Polotno and thrid party libraries
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

// Actions
import { failure, success } from '../../../redux/actions/snackbarActions';
import { SET_CUSTOM_FIELDS, SET_CUSTOM_FIELDS_V2, SET_PLATFORM_FIELDS } from '../../../redux/actions/action-types';

// Components
import Button from '../../GenericUIBlocks/Button';
import GeneralTootip from '../../GenericUIBlocks/GeneralTooltip';

// Utils
import { copyToClipboard } from '../../../utils/helper';

// Icons
import InfoIcon from '../../../assets/images/templates/info-icon';
import ContentCopyIcon from '../../..//assets/images/templates/content-copy-icon';
import Field from '../../../assets/images/templates/field';

// Styles
import './styles.scss'


type SideSection = typeof TemplatesSection;

const iconButtonStyles = {
  backgroundColor: 'transparent',
}

type CustomFieldsSectionProps = {
  store: StoreType;
  active: boolean;
  allowSenderFields?: boolean;
  allowPropertyFields?: boolean;
  excludedFields?: string[] | null;
  platformName?: string,
  onClick: () => void;
  onGetCustomFields?: () => Promise<any>;
};

const CustomFieldSection: SideSection = {
  name: 'Fields',
  Tab: observer(
    (props: { store: StoreType; active: boolean; onClick: () => void }) => (
      <SectionTab name="Fields" {...props}>
        <Field fill="var(--text-color)" />
      </SectionTab>
    )
  ) as SideSection['Tab'],

  Panel: observer(({ store, onGetCustomFields, allowSenderFields, excludedFields, allowPropertyFields, platformName }: CustomFieldsSectionProps) => {
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredDynamicFields, setFilteredDynamicFields] = useState([]);
    const [filteredPropertyFields, setFilteredPropertyFields] = useState([]);
    const [filteredCustomFieldsV2, setFilteredCustomFieldsV2] = useState([]);
    const [filteredSenderFields, setFilteredSenderFields] = useState([]);
    const [filteredPlatformFields, setFilteredPlatformFields] = useState([]);
    const [filteredCustomFields, setFilteredCustomFields] = useState([]);


    const dispatch = useDispatch<AppDispatch>();

    const customFields = useSelector(
      (state: RootState) => state.customFields.customFields
    ) as Record<string, any>;

    const customFieldsV2 = useSelector(
      (state: RootState) => state.customFields.customFieldsV2
    ) as Record<string, any>;

    const platformFields = useSelector(
      (state: RootState) => state.customFields.platformFields
    ) as Record<string, any>;

    const defaultDynamicFields = useSelector(
      (state: RootState) => state.customFields.defaultDynamicFields
    ) as Record<string, any>;

    const defaultSenderFields = useSelector(
      (state: RootState) => state.templates.defaultSenderFields
    ) as Record<string, any>;

    const defaultPropertyFields = useSelector(
      (state: RootState) => state.templates.defaultPropertyFields
    ) as Record<string, any>;

    const product = useSelector((state: RootState) => state.templates.product);
    const currentTemplateType = product?.productType;

    const handleShowDialog = () => {
      setIsShowDialog((prev) => !prev);
    };

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

    const copyCustomFieldText = (key: string, value: string = '') => {
      if (currentTemplateType === 'Real Penned Letter') {
        let modifiedString = key.replace(/{{/g, '((').replace(/}}/g, '))');
        copyToClipboard(modifiedString);
        dispatch(success(`${value} Copied`));
      } else {
        copyToClipboard(key);
        dispatch(success(`${value} Copied`));
      }
    };

    useEffect(() => {
      fetchCustomFields();
    }, []);

    useEffect(() => {
      setFilteredDynamicFields(defaultDynamicFields.filter(({ value }: any) =>
        value.toLowerCase().includes(search.toLowerCase())
      ));

      setFilteredPropertyFields(
        allowPropertyFields
          ? defaultPropertyFields.filter(({ value }: any) =>
            value.toLowerCase().includes(search.toLowerCase())
          )
          : []
      );

      setFilteredSenderFields(
        allowSenderFields
          ? defaultSenderFields.filter(({ value }: any) =>
            value.toLowerCase().includes(search.toLowerCase())
          )
          : []
      );

      setFilteredPlatformFields(platformFields.filter(({ value }: any) =>
        value.toLowerCase().includes(search.toLowerCase())
      ));

      setFilteredCustomFields(customFields.filter(({ value }: any) =>
        value.toLowerCase().includes(search.toLowerCase())
      ));

      if (customFieldsV2.length) {
        const newFilteredData = customFieldsV2
          .map((section: { fields: any[]; }) => ({
            ...section,
            fields: section.fields.filter((field: { value: string; }) =>
              field.value.toLowerCase().includes(search.toLowerCase())
            )
          })).filter((section: any) => section?.fields?.length > 0);

        setFilteredCustomFieldsV2(newFilteredData);
      } else {
        setFilteredDynamicFields(defaultDynamicFields.filter(({ value }: any) =>
          value.toLowerCase().includes(search.toLowerCase())
        ));

      }

    }, [search, defaultSenderFields, platformFields, customFields, defaultDynamicFields, customFieldsV2]);

    return (
      <div className="dynamic-content">
        <div className="bp5-input-group fields-search">
          <span aria-hidden="true" className="bp5-icon bp5-icon-search">
            <svg data-icon="search" height="16" role="img" viewBox="0 0 16 16" width="16">
              <path d="M15.55 13.43l-2.67-2.68a6.94 6.94 0 001.11-3.76c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.39 0 2.68-.42 3.76-1.11l2.68 2.67a1.498 1.498 0 102.12-2.12zm-8.56-1.44c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fillRule="evenodd"></path>
            </svg>
          </span>
          <input type="search" placeholder="Search..." className="bp5-input" style={{ marginBottom: '20px' }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {filteredDynamicFields.length > 0 &&
          <>
            <div className="dynamic-content__top">
              <div>
                <span className="title">Contact Fields</span>
                <InfoIcon fill="var(--primary-color)" className="infoIcon" />
                <GeneralTootip
                  anchorSelect=".infoIcon"
                  place="bottom"
                  title="Merge fields allow you to personalize your mailer with contact information."
                />
              </div>
            </div>
            {filteredDynamicFields
              ?.filter(({ key }) => !excludedFields?.includes(key))
              ?.map(
                ({ key, value }: { key: string; value: string }, i: number) => (
                  <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_contact'}>
                    <span
                      className="contact-element"
                      onClick={() =>
                        copyCustomFieldText(key, value)
                      }
                    >
                      {value}
                    </span>
                    <Button
                      style={iconButtonStyles}
                      onClick={() => copyCustomFieldText(key, value)}
                      backdrop={false}
                    >
                      <ContentCopyIcon className="copy" />
                    </Button>
                  </div>
                )
              )}
          </>}
        {allowPropertyFields && filteredPropertyFields.length > 0 && <>
          <hr className="divider" />
          <div className="dynamic-content__top">
            <div>
              <span className="title">Property Address</span>
              <InfoIcon fill="var(--primary-color)" className="property" />
              <GeneralTootip
                anchorSelect=".property"
                place="bottom"
                title="You can add property fields to your template."
              />
            </div>
          </div>
          {filteredPropertyFields
            ?.filter(({ key }) => !excludedFields?.includes(key))
            ?.map(
              ({ key, value }: { key: string; value: string }, i: number) => (
                <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_property'}>
                  <span
                    className="contact-element"
                    onClick={() =>
                      copyCustomFieldText(key, value)
                    }
                  >
                    {value}
                  </span>
                  <Button
                    style={iconButtonStyles}
                    onClick={() =>  copyCustomFieldText(key, value)}
                    backdrop={false}
                  >
                    <ContentCopyIcon className="copy" />
                  </Button>
                </div>
              )
            )}
        </>}
        {allowSenderFields && filteredSenderFields.length > 0 && <>
          <hr className="divider" />
          <div className="dynamic-content__top">
            <div>
              <span className="title">Sender Fields</span>
              <InfoIcon fill="var(--primary-color)" className="sender" />
              <GeneralTootip
                anchorSelect=".sender"
                place="bottom"
                title="You can add sender fields to your template."
              />
            </div>
          </div>
          {filteredSenderFields
            ?.filter(({ key }) => !excludedFields?.includes(key))
            ?.map(
              ({ key, value }: { key: string; value: string }, i: number) => (
                <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_sender'}>
                  <span
                    className="contact-element"
                    onClick={() =>
                      copyCustomFieldText(key, value)
                    }
                  >
                    {value}
                  </span>
                  <Button
                    style={iconButtonStyles}
                    onClick={() => copyCustomFieldText(key, value)}
                    backdrop={false}
                  >
                    <ContentCopyIcon className="copy" />
                  </Button>
                </div>
              )
            )}
        </>}
        <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
        {onGetCustomFields && platformFields?.length > 0 && (
          <>
            <hr className="divider" />
            <div className="dynamic-content__top">
              <div>
                <span className="title">{platformName ? `${platformName} Fields` : 'OLC Fields'}</span>
                <InfoIcon fill="var(--primary-color)" className="platform" />
                <GeneralTootip
                  anchorSelect=".platform"
                  place="bottom"
                  title={`You can add ${platformName ? `${platformName} Fields` : 'OLC Fields'} to your template.`}
                />
              </div>
              <Button onClick={handleShowDialog}></Button>
            </div>
            {filteredPlatformFields
              ?.filter(({ key }: { key: string }) => !excludedFields?.includes(key))
              ?.map(
                ({ key, value }: { key: string; value: string }, i: number) => (
                  <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_platform'}>
                    <span
                      className="contact-element"
                      onClick={() =>
                        copyCustomFieldText(key, value)
                      }
                    >
                      {value}
                    </span>
                    <Button
                      style={iconButtonStyles}
                      onClick={() => copyCustomFieldText(key, value)}
                      backdrop={false}
                    >
                      <ContentCopyIcon className="copy" />
                    </Button>
                  </div>
                )
              )}
          </>
        )}
        {onGetCustomFields && filteredCustomFieldsV2.length > 0 ?
          filteredCustomFieldsV2.map((section: any, index: number): any => (
            <div key={index + 'custom-section'}>
              <hr className="divider" />
              <div className="dynamic-content__top">
                <div>
                  <span className="title">{section?.section}</span>
                  <InfoIcon fill="var(--primary-color)" className={section?.section
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .trim()
                    .replace(/\s+/g, '-')} />
                  <GeneralTootip
                    anchorSelect={`.${section?.section
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, '')
                      .trim()
                      .replace(/\s+/g, '-')}`}
                    place="bottom"
                    title={`You can add ${section?.section} to your template.`}
                  />
                </div>

                <Button onClick={handleShowDialog}></Button>
              </div>

              {section.fields.map(({ key, value }: { key: string; value: string }, i: number) => (
                <div style={{ display: 'flex', alignItems: 'center' }} key={i + value}>
                  <span
                    className="contact-element"
                    onClick={() =>
                      copyCustomFieldText(key, value)
                    }
                  >
                    {value}
                  </span>
                  <Button
                    style={iconButtonStyles}
                    onClick={() => copyCustomFieldText(key, value)}
                    backdrop={false}
                  >
                    <ContentCopyIcon className="copy" />
                  </Button>
                </div>
              ))}
            </div>
          ))
          : onGetCustomFields && customFields?.length > 0 && filteredCustomFields.length > 0 && (
            <>
              <hr className="divider" />
              <div className="dynamic-content__top">
                <div>
                  <span className="title">Custom Fields</span>
                  <InfoIcon fill="var(--primary-color)" className="custom" />
                  <GeneralTootip
                    anchorSelect=".custom"
                    place="bottom"
                    title="You can add custom fields to your template."
                  />
                </div>
                <Button onClick={handleShowDialog}></Button>
              </div>
              {filteredCustomFields
                ?.filter(({ key }: { key: string }) => !excludedFields?.includes(key))
                ?.map(
                  ({ key, value }: { key: string; value: string }, i: number) => (
                    <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_custom'}>
                      <span
                        className="contact-element"
                        onClick={() =>
                          copyCustomFieldText(key, value)
                        }
                      >
                        {value}
                      </span>
                      <Button
                        style={iconButtonStyles}
                        onClick={() => copyCustomFieldText(key, value)}
                        backdrop={false}
                      >
                        <ContentCopyIcon className="copy" />
                      </Button>
                    </div>
                  )
                )}
            </>
          )
        }
        {filteredDynamicFields.length <= 0 && filteredCustomFieldsV2.length <= 0 && filteredPropertyFields.length <= 0 && filteredSenderFields.length <= 0 && filteredPlatformFields.length <= 0 && filteredCustomFields.length <= 0 &&
          <div className="no-result">No results</div>
        }
      </div >
    );
  }) as unknown as SideSection['Panel'],
};

export default CustomFieldSection;
