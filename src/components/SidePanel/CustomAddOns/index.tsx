import React, { CSSProperties } from 'react';

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
      }
    };

    const copyPropertyOfferField = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      copyToClipboard(PropertyOfferfieldValue);
      dispatch(success(`${PropertyOfferfieldValue} Copied`));
    };

    return (
      <div className="dynamic-content">
        <div className="dynamic-content__top">
          <div>
            <span className="title">Optional Add-On's</span>{' '}
            <InfoIcon fill="var(--primary-color)" className="infoIcon" />
            <GeneralTootip
              anchorSelect=".infoIcon"
              place="bottom"
              title="Google Street View is a technology featured in Google Maps and Google Earth that provides interactive panoramas from positions along many streets in the world."
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
            <Typography>Street View Property Image</Typography>
            <Typography>+$0.02 per mail piece</Typography>
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
              <Typography>Add an Offer</Typography>
              <Typography className="no-margin">
                (generated using Property Info)
              </Typography>
              <Typography>+$0.03 per mail piece</Typography>
            </div>
            <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
          </div>
        )}
      </div>
    );
  }) as unknown as SideSection['Panel'],
};

export default CustomAddOns;
