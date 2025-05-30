import React, {useState} from 'react';

// Utils
import {MESSAGES} from '../../../../utils/message';

// // icons
import Dot from '../../../../assets/images/templates/dot';
import ArrowDown from '../../../../assets/images/templates/arrow-down';
import Button from '../../../GenericUIBlocks/Button';
import Typography from '../../../GenericUIBlocks/Typography';

// styles
import './styles.scss';

const TemplatesCard = (props: any) => {
  const {
    templates,
    loading,
    handleLoadTemplateModel,
    platformName,
    currentTemplateType,
    product,
    searchApplied,
    primaryColorRGBA,
  } = props;

  const [isFilpedIds, setIsFlipedIds] = useState<string[]>([]);

  const singleSideProducts = [2, 4, 5, 16];

  // handler for Flip
  const handleFlip = (templateId: string) => {
    const existingTemplateIds = isFilpedIds || [];
    let updatedIds: string[];
    if (existingTemplateIds.includes(templateId)) {
      updatedIds = existingTemplateIds.filter((item) => item !== templateId);
    } else {
      updatedIds = [...existingTemplateIds, templateId];
    }
    setIsFlipedIds(updatedIds);
  };

  // handler for setting color
  const colorSetter = (templateId: any, side: string) => {
    const result =
      !isFilpedIds.includes(templateId) && side === 'Front'
        ? {fill: '#FFFFFF'}
        : isFilpedIds.includes(templateId) && side === 'Back'
          ? {fill: '#FFFFFF'}
          : {fill: '#878585'};
    return result;
  };

  // handler for setting rotation
  const transformSetter = (templateId: any) => {
    const result = isFilpedIds.includes(templateId)
      ? {
          transform: 'rotateY(0deg)',
          boxShadow: `inset 0 0 0 2px ${primaryColorRGBA}`,
        }
      : {
          transform: 'rotateY(360deg)',
          boxShadow: `inset 0 0 0 2px ${primaryColorRGBA}`,
        };
    return result;
  };

  return (
    <>
      {loading ? (
        <div className="noTemplateGallery">
          <Typography>{MESSAGES.TEMPLATE.LOADING_TEMPLATE}</Typography>
        </div>
      ) : templates.length ? (
        templates.map((template: any, index: string) => {
          return (
            <div className="templateCard" key={index}>
              <div className="templateImage">
                <img
                  src={
                    isFilpedIds.includes(template?.id)
                      ? template.backThumbnailUrl
                      : template.thumbnailUrl
                  }
                  alt="template"
                  style={transformSetter(template?.id)}
                  loading="lazy"
                />
                <Button
                  className="tempButton"
                  onClick={() => handleLoadTemplateModel(template)}
                >
                  Edit Template
                </Button>
                {!singleSideProducts.includes(Number(product?.id)) && (
                  <div className="flipWrapper">
                    <Dot
                      onClick={() => handleFlip(template?.id)}
                      style={colorSetter(template?.id, 'Front')}
                    />
                    <Dot
                      onClick={() => handleFlip(template?.id)}
                      style={colorSetter(template?.id, 'Back')}
                    />
                    <ArrowDown
                      onClick={() => handleLoadTemplateModel(template)}
                    />
                  </div>
                )}
              </div>
              <Typography className="templateName">
                {template?.title}
              </Typography>
              <Typography className="templateID">
                Template ID: {template?.id}
              </Typography>
            </div>
          );
        })
      ) : currentTemplateType?.id === '1' || searchApplied ? (
        <div className="noTemplateGallery">
          <Typography>{MESSAGES.TEMPLATE.NO_MY_TEMPLATES}</Typography>
        </div>
      ) : currentTemplateType?.id === '2' ? (
        <div className="noTemplateGallery">
          <Typography>{MESSAGES.TEMPLATE.NO_TEAM_TEMPLATES}</Typography>
        </div>
      ) : currentTemplateType?.id === '3' ? (
        <div
          className={`${+product?.id === 5 ? 'noTemplateGallery more-visible' : 'noTemplateGallery'}`}
        >
          <Typography>
            {platformName
              ? `No ${platformName} Templates to show`
              : MESSAGES.TEMPLATE.NO_OLC_TEMPLATES}
          </Typography>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TemplatesCard;
