import React, { useState } from "react";

// Utils
import { MESSAGES } from "../../../../utils/message";

// // icons
import Dot from "../../../../assets/images/templates/dot";
import ArrowDown from "../../../../assets/images/templates/arrow-down";
import Button from '../../../../components/GenericUIBlocks/Button';
import Typography from '../../../../components/GenericUIBlocks/Typography';

// styles
import './styles.scss'

const TemplatesCard = (props: any) => {

  const { templates, loading, handleLoadTemplateModel, platformName } = props;

  const [isFilpedIds, setIsFlipedIds] = useState<string[]>([]);

  // handler for Flip
  const handleFlip = (templateId: string) => {
    const existingTemplateIds = isFilpedIds || [];
    let updatedIds: string[];
    if (existingTemplateIds.includes(templateId)) {
      updatedIds = existingTemplateIds.filter(item => item !== templateId);
    } else {
      updatedIds = [...existingTemplateIds, templateId];
    }
    setIsFlipedIds(updatedIds);
  };
  
  // handler for setting color
  const colorSetter = (templateId: any) => {
    const result = !isFilpedIds.includes(templateId)
      ? { fill: "#FFFFFF" } : { fill: "#878585" };
    return result;
  };

  // handler for setting rotation
  const transformSetter = (templateId: any) => {
    const result = isFilpedIds.includes(templateId)
      ? { transform: "rotateY(0deg)" }
      : { transform: "rotateY(360deg)" };
    return result;
  };

  const tempHeight = "407";

  return (
    <>
      {loading ? (
        <div className="noTemplateText">
          <Typography>{MESSAGES.TEMPLATE.LOADING_TEMPLATE}</Typography>
        </div>
      ) : templates.length ? templates.map((template: any, index: string) => {
        return (
          <div className="templateCard" key={index} >
            <div className="templateImage">
              <img
                src={
                  isFilpedIds.includes(template?.id)
                    ? template.backThumbnailUrl
                    : template.thumbnailUrl
                }
                height={tempHeight + "px"}
                alt="template"
                style={transformSetter(template?.id)}
                loading="lazy"
              />
              <Button className="tempButton" onClick={() => handleLoadTemplateModel(template)}>Edit Template</Button>
              <div className="flipWrapper">
                <Dot
                  onClick={() => handleFlip(template?.id)}
                  style={colorSetter(template?.id)}
                />
                <Dot
                  onClick={() => handleFlip(template?.id)}
                  style={colorSetter(template?.id)}
                />
                <ArrowDown onClick={() => handleLoadTemplateModel(template)} />
              </div>
            </div>
            <Typography className="templateName">{template?.title}</Typography>
            <Typography className="templateID">
              Template ID: {template?.id}
            </Typography>
          </div>
        );
      }) : <div className="noTemplateText">
        <Typography>
          {platformName
            ? `No ${platformName} Templates to show`
            : MESSAGES.TEMPLATE.NO_OLC_TEMPLATES}
        </Typography>
      </div>}
    </>
  );
};

export default TemplatesCard;
