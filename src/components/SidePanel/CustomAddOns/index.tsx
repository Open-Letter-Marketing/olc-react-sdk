import React from 'react';

// Plotno Library Imports
import {observer} from 'mobx-react-lite';
import {SectionTab} from 'polotno/side-panel';
import type {StoreType} from 'polotno/model/store';
import type {TemplatesSection} from 'polotno/side-panel';

// Hooks
import { useDispatch } from "react-redux";
import { AppDispatch } from '~/redux/store';

// Actions
import { failure } from "~/redux/actions/snackbarActions";

// Utils
import { MESSAGES } from "~/utils/message";
import { getIsSandbox } from '~/utils/helper';

// MUI Components
import GeneralTootip from '~/components/GenericUIBlocks/GeneralTooltip';
import Typography from '~/components/GenericUIBlocks/Typography';

// Dummy Image for GSV
import {DEMO_S3_URL, GOOGLE_STREET_VIEW_IMAGE_URL, PROD_S3_URL} from '~/utils/constants';

// Icons
//@ts-ignore
import CustomAddOnIcon from '~/assets/images/templates/custom-add-on-icon';
import InfoIcon from '~/assets/images/templates/info-icon';
import GsvIcon from "~/assets/images/templates/gsv-icon";
import EpoIcon from "~/assets/images/templates/epo-icon";


import './styles.scss';

type SideSection = typeof TemplatesSection;

type CustomAddOnsSectionProps = {
  store: StoreType;
  onClick: () => void;
};

// define the new custom section
const CustomAddOns: SideSection = {
  name: 'CustomAddOns',
  Tab: observer(
    (props: {store: StoreType; active: boolean; onClick: () => void}) => (
      <SectionTab name="Add On's" {...props} iconSize={20}>
        <CustomAddOnIcon />
      </SectionTab>
    )
  ) as SideSection['Tab'],

  // we need observer to update component automatically on any store changes
  Panel: observer(({store}: CustomAddOnsSectionProps) => {

    const dispatch: AppDispatch = useDispatch();
    const googleStreetViewSrc: string = (getIsSandbox() ? DEMO_S3_URL : PROD_S3_URL) + GOOGLE_STREET_VIEW_IMAGE_URL;

    const handleAddElementOnScreen = (
      event: Event,
      value: string,
      type: string
    ) => {
      event.preventDefault();
      const currentPage = store.activePage.toJSON();
      if (
        currentPage?.children?.length &&
        currentPage.children.find((item:any) => item.id === `gsv-image_${store.activePage.id}`)
      ) {
        dispatch(failure(MESSAGES.TEMPLATE.GSV_RESTRICT_ONE_PER_PAGE));
        return;
      }
      if (type === 'gsv') {
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
      } else if (type === 'epo') {
        store.activePage.addElement({
          type: 'text',
          x: 100,
          y: 100,
          text: value,
          width: 150,
          contentEditable: false,
        });
      }
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

        <div
          className="hidden-important addonBox"
          onClick={(event: any) =>
            handleAddElementOnScreen(event, '{{EST.PROP.OFFER}}', 'epo')
          }
        >
          <EpoIcon />
          <Typography>Estimated Property Offer</Typography>
          <Typography>+$0.02 per mail piece</Typography>
        </div>
      </div>
    );
  }) as unknown as SideSection['Panel'],
};

export default CustomAddOns;