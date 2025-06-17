import React from 'react';

// react-tooltip
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// styles
import './styles.scss';

interface GeneralTooltipProps {
  anchorSelect: string;
  place: 'top' | 'right' | 'bottom' | 'left';
  title: string | React.ReactNode;
  className?: string;
}

const GeneralTooltip: React.FC<GeneralTooltipProps> = ({ anchorSelect, place, title, className }) => {
  return (
    <Tooltip className={`basic-tooltip ${className}`} anchorSelect={anchorSelect} place={place}>
      {title}
    </Tooltip>
  );
};

export default GeneralTooltip;
