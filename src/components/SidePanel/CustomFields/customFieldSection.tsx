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
import { SET_CUSTOM_FIELDS, SET_PLATFORM_FIELDS } from '../../../redux/actions/action-types';

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

    const dispatch = useDispatch<AppDispatch>();

    const customFields = useSelector(
      (state: RootState) => state.customFields.customFields
    ) as Record<string, any>;

    const platformFields = useSelector(
      (state: RootState) => state.customFields.platformFields
    ) as Record<string, any>;

    const defaultDynamicFields = useSelector(
      (state: RootState) => state.customFields.defaultDynamicFields
    );

    const defaultSenderFields = useSelector(
      (state: RootState) => state.templates.defaultSenderFields
    );

    const defaultPropertyFields = useSelector(
      (state: RootState) => state.templates.defaultPropertyFields
    )

    const defeultDynamicFieldsWithPropertyFields = allowPropertyFields
      ? [...defaultDynamicFields, ...defaultPropertyFields]
      : defaultDynamicFields;

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
    };

    useEffect(() => {
      fetchCustomFields();
    }, []);

    const copyCustomFieldText = (value: string) => {
      if (currentTemplateType === 'Real Penned Letter') {
        let modifiedString = value.replace(/{{/g, '((').replace(/}}/g, '))');
        copyToClipboard(modifiedString);
        dispatch(success(`${modifiedString} Copied`));
      } else {
        copyToClipboard(value);
        dispatch(success(`${value} Copied`));
      }
    };

    return (
      <div className="dynamic-content">
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
        {defeultDynamicFieldsWithPropertyFields
          ?.filter(({ key }) => !excludedFields?.includes(key))
          ?.map(
            ({ key, value }: { key: string; value: string }, i: number) => (
              <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_contact'}>
                <span
                  className="contact-element"
                  onClick={() =>
                    copyCustomFieldText(key)
                  }
                >
                  {value}
                </span>
                <Button
                  style={iconButtonStyles}
                  onClick={() => copyCustomFieldText(key)}
                  backdrop={false}
                >
                  <ContentCopyIcon className="copy" />
                </Button>
              </div>
            )
          )}
        {allowSenderFields && <>
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
          {defaultSenderFields
            ?.filter(({ key }) => !excludedFields?.includes(key))
            ?.map(
              ({ key, value }: { key: string; value: string }, i: number) => (
                <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_sender'}>
                  <span
                    className="contact-element"
                    onClick={() =>
                      copyCustomFieldText(key)
                    }
                  >
                    {value}
                  </span>
                  <Button
                    style={iconButtonStyles}
                    onClick={() => copyCustomFieldText(key)}
                    backdrop={false}
                  >
                    <ContentCopyIcon className="copy" />
                  </Button>
                </div>
              )
            )}
        </>}
        <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
        {onGetCustomFields && platformFields?.length > 0 &&(
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
            {platformFields
              ?.filter(({ key }: { key: string }) => !excludedFields?.includes(key))
              ?.map(
                ({ key, value }: { key: string; value: string }, i: number) => (
                  <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_custom'}>
                    <span
                      className="contact-element"
                      onClick={() =>
                        copyCustomFieldText(key)
                      }
                    >
                      {value}
                    </span>
                    <Button
                      style={iconButtonStyles}
                      onClick={() => copyCustomFieldText(key)}
                      backdrop={false}
                    >
                      <ContentCopyIcon className="copy" />
                    </Button>
                  </div>
                )
              )}
          </>
        )}
        {onGetCustomFields && customFields?.length > 0 &&(
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
            {customFields
              ?.filter(({ key }: { key: string }) => !excludedFields?.includes(key))
              ?.map(
                ({ key, value }: { key: string; value: string }, i: number) => (
                  <div style={{ display: 'flex', alignItems: 'center' }} key={i + '_custom'}>
                    <span
                      className="contact-element"
                      onClick={() =>
                        copyCustomFieldText(key)
                      }
                    >
                      {value}
                    </span>
                    <Button
                      style={iconButtonStyles}
                      onClick={() => copyCustomFieldText(key)}
                      backdrop={false}
                    >
                      <ContentCopyIcon className="copy" />
                    </Button>
                  </div>
                )
              )}
          </>
        )}
      </div>
    );
  }) as unknown as SideSection['Panel'],
};

export default CustomFieldSection;
