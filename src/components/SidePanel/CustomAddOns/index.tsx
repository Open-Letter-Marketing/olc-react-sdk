import React, { CSSProperties, useState } from 'react';

// Plotno Library Imports
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

// Hooks
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

// Actions
import { failure, success } from '../../../redux/actions/snackbarActions';

// Utils
import { MESSAGES } from '../../../utils/message';
import { copyToClipboard, getEnv, getIsSandbox } from '../../../utils/helper';

// Components
import Input from '../../GenericUIBlocks/Input';

// MUI Components
import GeneralTootip from '../../GenericUIBlocks/GeneralTooltip';
import Typography from '../../GenericUIBlocks/Typography';
import Button from '../../../components/GenericUIBlocks/Button';

// Dummy Image for GSV
import {
  DEMO_S3_URL,
  GOOGLE_STREET_VIEW_IMAGE_URL,
  LOCAL_S3_URL,
  PROD_S3_URL,
  SAMPLE_CSV,
  STAGE_S3_URL,
} from '../../../utils/constants';

// Icons
//@ts-ignore
import CustomAddOnIcon from '../../../assets/images/templates/custom-add-on-icon';
import ContentCopyIcon from '../../../assets/images/templates/content-copy-icon';
import InfoIcon from '../../../assets/images/templates/info-icon';
import GsvIcon from '../../../assets/images/templates/gsv-icon';
import EpoIcon from '../../../assets/images/templates/epo-icon';

import './styles.scss';

type SideSection = typeof TemplatesSection;

type CustomAddOnsSectionProps = {
  store: StoreType;
  onClick: () => void;
  allowedAddOns?: any;
};

const iconButtonStyles: CSSProperties = {
  backgroundColor: 'transparent',
  marginLeft: '70%',
  marginTop: '-40%',
  position: 'absolute',
};

// define the new custom section
const CustomAddOns: SideSection = {
  name: 'CustomAddOns',
  Tab: observer(
    (props: { store: StoreType; active: boolean; onClick: () => void }) => (
      <SectionTab name="Add On's" {...props} iconSize={20}>
        <CustomAddOnIcon />
      </SectionTab>
    )
  ) as SideSection['Tab'],

  // we need observer to update component automatically on any store changes
  Panel: observer(({ store, allowedAddOns }: CustomAddOnsSectionProps) => {
    const [customRosValue, setCustomRosValue] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const googleStreetViewSrc: string =
      (getEnv() === 'local' || getEnv() === 'staging'
        ? STAGE_S3_URL
        : getIsSandbox()
          ? DEMO_S3_URL
          : PROD_S3_URL) + GOOGLE_STREET_VIEW_IMAGE_URL;

    const PropertyOfferfieldValue = '{{ROS.PROPERTY_OFFER}}';

    const handleAddElementOnScreen = (
      event: Event,
      value: string,
      type: string
    ) => {
      event.preventDefault();
      const currentPage = store.activePage.toJSON();
      if (type === 'gsv') {
        if (
          currentPage?.children?.length &&
          currentPage.children.find(
            (item: any) => item.id === `gsv-image_${store.activePage.id}`
          )
        ) {
          dispatch(failure(MESSAGES.TEMPLATE.GSV_RESTRICT_ONE_PER_PAGE));
          return;
        }
        store.activePage?.addElement({
          id: `gsv-image_${store.activePage.id}`,
          type: 'image',
          src: googleStreetViewSrc,
          width: 287,
          height: 188,
          contentEditable: false,
          keepRatio: true,
          opacity: 1,
          custom: {
            elementType: value,
          },
        });
      } else if (type === 'rpo') {
        const randomizedId = Math.random().toString(36).substring(2, 7);
        store.activePage.addElement({
          id: `ros_${randomizedId}`,
          type: 'text',
          x: 100,
          y: 100,
          text: value,
          width: 175,
          contentEditable: false,
        });
      } else if (type === 'custom_rpo') {
        if (!customRosValue) {
          dispatch(failure(`Please enter the offer percentage`));
          return
        }
        const randomizedId = Math.random().toString(36).substring(2, 7);
        store.activePage.addElement({
          id: `custom_ros_${randomizedId}`,
          type: 'text',
          x: 100,
          y: 100,
          text: value,
          width: 175,
          contentEditable: false,
          custom: {
            ros_custom_value: customRosValue
          }
        });
      }
    };

    const downloadSampleCSV = () => {
      const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sample.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const copyPropertyOfferField = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      copyToClipboard(PropertyOfferfieldValue);
      dispatch(success(`ROS Property Offer Copied`));
    };

    return (
      <div className="dynamic-content">
        <div className="dynamic-content__top">
          <div>
            <span className="title">{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.TITLE}</span>{' '}
            <InfoIcon fill="var(--primary-color)" className="infoIcon" />
            <GeneralTootip
              anchorSelect=".infoIcon"
              place="bottom"
              title={MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.DESCRIPTION}
            />
          </div>
        </div>
        {(!allowedAddOns || allowedAddOns?.includes('gsv')) && (
          <div
            className="addonBox"
            onClick={(event: any) =>
              handleAddElementOnScreen(event, 'GOOGLE_STREET_VIEW', 'gsv')
            }
          >
            <GsvIcon />
            <Typography>{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.GSV.TITLE}</Typography>
            <Typography>{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.GSV.DESCRIPTION}</Typography>
          </div>
        )}
        {allowedAddOns?.includes('property_offer') && (
          <div>
            <div
              className="addonBox"
              onClick={(event: any) =>
                handleAddElementOnScreen(event, PropertyOfferfieldValue, 'rpo')
              }
            >
              <Button
                style={iconButtonStyles}
                onClick={copyPropertyOfferField}
                backdrop={false}
              >
                <ContentCopyIcon className="copy" />
              </Button>
              <EpoIcon />
              <Typography>{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.TITLE}</Typography>
              <Typography className="no-margin">
                {MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.DESCRIPTION}
              </Typography>
              <Typography>{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.PRICE}</Typography>
            </div>
          </div>
        )}
        {allowedAddOns?.includes('custom_property_offer') && (
          <div
            className="addonBox"
            onClick={(event: any) =>
              handleAddElementOnScreen(
                event,
                PropertyOfferfieldValue,
                'custom_rpo'
              )
            }
          >
            <Button
              style={iconButtonStyles}
              onClick={copyPropertyOfferField}
              backdrop={false}
              className='custom-po'
            >
              <ContentCopyIcon className="copy" />
            </Button>
            <EpoIcon />
            <Typography>{MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.CUSTOM.TITLE}</Typography>
            <Typography variant="h3" className="no-margin s-font">
              {MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.CUSTOM.DESCRIPTION}
            </Typography>
            <div style={{ margin: '12px' }} className='plain-text'>
              <a
                onClick={(e) => {
                  e.stopPropagation(), downloadSampleCSV();
                }}
              >
                {MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.CUSTOM.CLICK}
              </a>{' '}
              {MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.CUSTOM.CSV_IMPORT}
            </div>
            <Typography className="no-margin s-font">
              {MESSAGES.TEMPLATE.CUSTOM_ADD_ONS.PROPERTY_OFFER.CUSTOM.CUSTOM_PRICE}
            </Typography>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: '18rem', marginBottom: '15px' }}
            >
              <Input
                type="number"
                placeholder={'Type in a Number between 1-100'}
                qrField={true}
                value={customRosValue}
                onChange={(e) => {
                  setCustomRosValue(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
      </div>
    );
  }) as unknown as SideSection['Panel'],
};

export default CustomAddOns;
