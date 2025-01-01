import React, { useState } from 'react';

// Polotno and third party imports
import { SidePanelWrap } from 'polotno';
import type { StoreType } from 'polotno/model/store';
import {
  SidePanel as PolotnoSidePanel,
  DEFAULT_SECTIONS,
} from 'polotno/side-panel';

// Custom Sections / Components
import CustomTemplateSection from './Templates/customTemplateSection';
import CustomFieldSection from './CustomFields/customFieldSection';
import CustomUploadSection from './CustomUploads';
import customAddOns from './CustomAddOns';
import CustomQRCode from './CustomQRCode';

interface Props {
  store: StoreType;
  currentTemplateType: string;
  platformName?: string | null;
  templateGalleryModal?: boolean;
  selectedSection?: string;
  allowSenderFields?: boolean;
  excludedFields?: string[] | null;
  designerQueryAmount?: string | number;
  allowPropertyFields?: boolean;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onCreateCustomTemplateQuery?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
}

const SidePanel: React.FC<Props> = (props) => {
  const [hireDesignerModal, setHireDesignerModal] = useState(false);

  const sections =
    props.currentTemplateType === 'Real Penned Letter'
      ? DEFAULT_SECTIONS.filter((section) => section.name === '')
      : DEFAULT_SECTIONS.filter(
        (section) => !['photos', 'size', 'templates'].includes(section.name)
      );

  return (
    <SidePanelWrap>
      <PolotnoSidePanel
        store={props.store}
        sections={[
          ...(props.currentTemplateType !== 'Real Penned Letter'
            ? [
              {
                ...CustomTemplateSection,
                ...CustomUploadSection,
                Panel: (panelProps: any) => (
                  <CustomTemplateSection.Panel
                    {...panelProps}
                    platformName={props.platformName}
                    templateGalleryModal={props.templateGalleryModal}
                    designerQueryAmount={props.designerQueryAmount}
                    selectedSection={props.selectedSection}
                    hireDesignerModal={hireDesignerModal}
                    setHireDesignerModal={setHireDesignerModal}
                    onCreateCustomTemplateQuery={props.onCreateCustomTemplateQuery}
                    onGetTemplates={props.onGetTemplates}
                    onGetOneTemplate={props.onGetOneTemplate}
                  />
                ),
              },
            ]
            : []),
          ...sections,
          {
            ...CustomFieldSection,
            ...CustomUploadSection,
            Panel: (panelProps: any) => (
              <CustomFieldSection.Panel
                {...panelProps}
                onGetCustomFields={props.onGetCustomFields}
                allowSenderFields={props.allowSenderFields}
                excludedFields={props.excludedFields}
                allowPropertyFields={props.allowPropertyFields}
              />
            ),
          },
          ...(props.currentTemplateType !== 'Real Penned Letter'
            ? [
              {
                ...CustomQRCode,
                Panel: (panelProps: any) => (
                  <CustomQRCode.Panel {...panelProps} />
                ),
              },
              {
                ...customAddOns,
                Panel: (panelProps: any) => (
                  <customAddOns.Panel {...panelProps} />
                ),
              },
            ]
            : []),
        ]}
        defaultSection="text"
      />
    </SidePanelWrap>
  );
};

export default SidePanel;
