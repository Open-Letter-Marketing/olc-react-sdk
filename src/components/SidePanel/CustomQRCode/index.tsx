import React, { useEffect, useState } from 'react';

// Import Polotno and third-party libraries
import QRCode from 'qrcode';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import * as svg from 'polotno/utils/svg';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { failure } from '../../../redux/actions/snackbarActions';

// Utils
import { MESSAGES } from '../../../utils/message';
import { validURL } from '../../../utils/helper';
import { DISALLOWED_DOMAINS, MERGE_UTM_PARAMS, emojiRegex } from '../../../utils/constants';

//Components
import GeneralSelect from '../../../components/GenericUIBlocks/GeneralSelect';

// UI Components
import Input from '../../../components/GenericUIBlocks/Input';

// Icons
import CustomQRIcon from '../../../assets/images/templates/custom-qr-section-icon'

interface CustomQRProps {
  store: StoreType;
  allowSenderFields: any;
  allowPropertyFields: any;
  excludedFields: any;
}

// define the new custom section
const CustomQRCode = {
  name: 'QR-Section',
  Tab: (props: any) => (
    <SectionTab name="QR" {...props} iconSize={20}>
      <CustomQRIcon />
    </SectionTab>
  ),

  // we need observer to update component automatically on any store changes
  Panel: observer(({ store, allowSenderFields, allowPropertyFields, excludedFields }: CustomQRProps) => {
    const [url, setUrl] = useState('');
    const [utmSource, setUtmSource] = useState('direct mail');
    const [utmMedium, setUtmMedium] = useState('QR Code');
    const [utmCampaignName, setUtmCampaignName] = useState('');
    const [customUtms, setCustomUtms] = useState<Record<string, any>>({});

    const dispatch: AppDispatch = useDispatch();

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

    const excludedLabels = ['utm_c_first_name c_last_name'];

    let flattenedFieldsV2 = [];
    if (customFieldsV2.length > 0) {
      flattenedFieldsV2 = customFieldsV2?.flatMap((section: { fields: any; }) => section.fields);
    }

    const allFields = [
      ...defaultFields,
      ...customFields,
      ...flattenedFieldsV2,
      ...(allowSenderFields ? defaultSenderFields : []),
      ...(allowPropertyFields ? defaultPropertyFields : []),
      ...(allowPropertyFields ? [{ value: "ROS.PROPERTY_OFFER", key: "{{ROS.PROPERTY_OFFER}}", defaultValue: "$123,456.00" }] : []),
    ].filter(({ key }) => !excludedFields?.includes(key));


    const utmFields = allFields.map(({ key }) => ({
      label: `utm_${key.toLowerCase().replaceAll('.', '_').replaceAll(/[{}]/g, '')}`
    })).filter((utmField) => !excludedLabels.includes(utmField.label));

    const utms = [
      'custom_utm_1',
      'custom_utm_2',
      'custom_utm_3',
    ]

    const el = store.selectedElements[0];
    const isQR = el?.name === 'qr';


    const clearQRFields = () => {
      store.selectElements([]);
      setUrl('');
      setUtmSource('direct mail');
      setUtmMedium('QR Code');
      setUtmCampaignName('');
      setCustomUtms({});
    }

    const appendUtmParameters = (utmField: string, defaultValue: string) => {
      let result = '';
      const field = MERGE_UTM_PARAMS.find((field) => field.key === utmField);
      if (field) {
        result = `${field.value}=${defaultValue}`
      }
      return result;
    }

    const validateQRCode = () => {
      const validations = [
        { value: utmSource, label: "UTM Source" },
        { value: utmMedium, label: "UTM Medium" },
        { value: utmCampaignName, label: "UTM Campaign" },
      ];

      for (const { value, label } of validations) {
        if (value.length >= 150) {
          dispatch(failure(`${label} must be less than 150 characters`));
          return false;
        }
        if (emojiRegex.test(value)) {
          dispatch(failure(`Emoji are not allowed in ${label}`));
          return false;
        }
      }

      return true;
    };

    const containsDisallowedDomains = (str: string) => {
      return DISALLOWED_DOMAINS.some(substring =>
        str.includes(substring)
      );
    }

    // create svg image for QR code for input text
    const getQR = (text: string) => {
      return new Promise((resolve) => {
        QRCode.toString(
          text || 'no-data',
          {
            type: 'svg',
            margin: 0,
            color: {
              dark: '#000000',
              light: '#0000',
            },
          },
          (err: any, string: string) => {
            resolve(svg.svgToURL(string));
          }
        );
      });
    }

    const createCustomizeURL = (url: string) => {
      let customURL = url;
      let params = [];
      if (utmSource) {
        params.push(`utm_source=${utmSource.replace(/ /g, "_")}`);
      }
      if (utmMedium) {
        params.push(`utm_medium=${utmMedium.replace(/ /g, "_")}`);
      }
      if (utmCampaignName) {
        params.push(`utm_campaign=${utmCampaignName.replace(/ /g, "_")}`);
      }

      if (customUtms[utms[0]]?.label) {
        const orignalField = `{{${customUtms[utms[0]]?.label.replace('utm_', '').replace('_', '.').toUpperCase()}}}`;
        const defaultValue = allFields.find((field) => field.key === orignalField)?.defaultValue;
        const attachUtmKeys = appendUtmParameters(orignalField, defaultValue);
        const mergeUtmParams =
          attachUtmKeys && orignalField == '{{C.PHONE_NUMBER}}'
            ? encodeURIComponent(
              `${customUtms[utms[0]]?.label}=${defaultValue}&${attachUtmKeys}`
            ).replace(/[\s\(\)]/g, '')
            : attachUtmKeys
              ? `${customUtms[utms[0]]?.label}=${defaultValue}&${attachUtmKeys}`
              : `${customUtms[utms[0]]?.label}=${defaultValue}`;
        params.push(mergeUtmParams);
      }

      if (customUtms[utms[1]]?.label) {
        const orignalField = `{{${customUtms[utms[1]]?.label.replace('utm_', '').replace('_', '.').toUpperCase()}}}`;
        const defaultValue = allFields.find((field) => field.key === orignalField)?.defaultValue;
        const attachUtmKeys = appendUtmParameters(orignalField, defaultValue);
        const mergeUtmParams =
          attachUtmKeys && orignalField == '{{C.PHONE_NUMBER}}'
            ? encodeURIComponent(
              `${customUtms[utms[1]]?.label}=${defaultValue}&${attachUtmKeys}`
            ).replace(/[\s\(\)]/g, '')
            : attachUtmKeys
              ? `${customUtms[utms[1]]?.label}=${defaultValue}&${attachUtmKeys}`
              : `${customUtms[utms[1]]?.label}=${defaultValue}`;
        params.push(mergeUtmParams);
      }

      if (customUtms[utms[2]]?.label) {
        const orignalField = `{{${customUtms[utms[2]]?.label.replace('utm_', '').replace('_', '.').toUpperCase()}}}`;
        const defaultValue = allFields.find((field) => field.key === orignalField)?.defaultValue;
        const attachUtmKeys = appendUtmParameters(orignalField, defaultValue);
        const mergeUtmParams =
          attachUtmKeys && orignalField == '{{C.PHONE_NUMBER}}'
            ? encodeURIComponent(
              `${customUtms[utms[2]]?.label}=${defaultValue}&${attachUtmKeys}`
            ).replace(/[\s\(\)]/g, '')
            : attachUtmKeys
              ? `${customUtms[utms[2]]?.label}=${defaultValue}&${attachUtmKeys}`
              : `${customUtms[utms[2]]?.label}=${defaultValue}`;
        params.push(mergeUtmParams);
      }

      if (params.length > 0) {
        customURL += `/?${params.join("&")}`;
      }
      
      return encodeURI(customURL);
    }

    const addNewQRCode = async () => {
      if (url) {
        if (validURL(url) && !containsDisallowedDomains(url)) {
          const isValidQR = validateQRCode();
          if (!isValidQR) return false;
          const randomizedId = Math.random().toString(36).substring(2, 7);
          const customQRUrl = createCustomizeURL(url);
          const src = await getQR(customQRUrl);
          store.activePage.addElement({
            id: `qr-${randomizedId}`,
            type: 'svg',
            name: 'qr',
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            blurRadius: 0,
            keepRatio: true,
            src,
            custom: {
              url,
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign_name: utmCampaignName,
              custom_utms: customUtms,
            },
          });
          clearQRFields();
        } else {
          dispatch(failure(MESSAGES.TEMPLATE.QR_SECTION.INVALID_URL))
        }
      } else {
        dispatch(failure(MESSAGES.TEMPLATE.QR_SECTION.EMPTY_QR))
      }
    }

    // if selection is changed we need to update input value
    const updateQRCode = async () => {
      if (el?.name === 'qr' && url) {
        if (validURL(url) && !containsDisallowedDomains(url)) {
          const isValidQR = validateQRCode();
          if (!isValidQR) return false;
          const customQRUrl = createCustomizeURL(url);
          const src = await getQR(customQRUrl);
          el.set({
            src,
            custom: {
              url,
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign_name: utmCampaignName,
              custom_utms: customUtms,
            },
          });
          clearQRFields();
        } else {
          dispatch(failure(MESSAGES.TEMPLATE.QR_SECTION.INVALID_URL))
        }
      } else {
        dispatch(failure(MESSAGES.TEMPLATE.QR_SECTION.EMPTY_QR))
      }
    }

    // Handler to update dropdown values
    const handleSelect = (utmKey: string, value: any) => {
      setCustomUtms((prev) => {
        if (value === null) {
          const updatedUtms = { ...prev };
          delete updatedUtms[utmKey];
          return updatedUtms;
        }
        return { ...prev, [utmKey]: value };
      });
    };

    // if selection is changed we need to update input value
    useEffect(() => {
      if (el?.name === 'qr') {
        setUrl(el?.custom?.url || el?.custom?.value || '');
        setUtmSource(el?.custom?.utm_source || 'direct mail');
        setUtmMedium(el?.custom?.utm_medium || 'QR Code');
        setUtmCampaignName(el?.custom?.utm_campaign_name || '');
        Object.values(el?.custom?.custom_utms || {}).length ? setCustomUtms(el?.custom?.custom_utms) : setCustomUtms({});
      } else {
        setUrl('');
        setUtmSource('direct mail');
        setUtmMedium('QR Code');
        setUtmCampaignName('');
        setCustomUtms({});
      }
    }, [isQR, el]);

    return (
      <>
        <button
          className='qr-submit-btn'
          onClick={isQR ? updateQRCode : addNewQRCode}>
          {isQR
            ? MESSAGES.TEMPLATE.QR_SECTION.UPDATE_BUTTON
            : MESSAGES.TEMPLATE.QR_SECTION.SUBMIT_BUTTON}
        </button>
        <div className='qr-input-wrapper'>
          <label>QR URL:</label>
          <Input
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder={MESSAGES.TEMPLATE.QR_SECTION.QR_PLACEHOLDER}
            value={url}
            qrField={true}
          />
        </div>
        <div className='qr-input-wrapper'>
          <label>UTM Source:</label>
          <Input
            type="text"
            onChange={(e) => {
              setUtmSource(e.target.value);
            }}
            placeholder={'Enter UTM Source'}
            value={utmSource}
            qrField={true}
          />
        </div>
        <div className='qr-input-wrapper'>
          <label>UTM Medium:</label>
          <Input
            type="text"
            onChange={(e) => {
              setUtmMedium(e.target.value);
            }}
            placeholder={'Enter UTM Medium'}
            value={utmMedium}
            qrField={true}
          />
        </div>
        <div className='qr-input-wrapper'>
          <label>UTM Campaign Name:</label>
          <Input
            type="text"
            onChange={(e) => {
              setUtmCampaignName(e.target.value);
            }}
            placeholder={'Enter UTM Campaign Name'}
            value={utmCampaignName}
            qrField={true}
          />
        </div>
        {utms?.map((utm, idx) => {
          return (
            <div className='qr-input-wrapper' key={idx}>
              <label>{utm.toUpperCase().replace(/\_/g, ' ')}:</label>
              <GeneralSelect
                placeholder={`Select Custom UTM ${idx + 1}`}
                options={utmFields as any}
                setSelectedValue={(value: any) => handleSelect(utm, value)}
                selectedValue={customUtms[utm] || (null as any)}
                builderSelect={true}
                clearField={true}
                // @ts-ignore
                search={(() => { }) as any}
                updateErrors={() => { }}
                disableClearable={false}
                templateBuilder={true}
                qrField={true}
              />
            </div>
          );
        })}
      </>
    );
  }),
};

export default CustomQRCode;