import React, {useEffect, useState, useRef} from 'react';

// icons
import ToolArrow from '../../../assets/images/tooltip/tool-arrow';

// styles
import './styles.scss';

interface TooltipProps {
  place: 'top' | 'right' | 'bottom' | 'left' | 'top-start';
  children?: React.ReactNode;
  open?: boolean;
  handleClose?: () => void;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  place,
  children,
  open,
  handleClose,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const handleClickAway = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      handleClose?.();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickAway);
    } else {
      document.removeEventListener('mousedown', handleClickAway);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [open]);

  //  positions
  const positions = (place: string) => {
    switch (place) {
      case 'top':
        return {inset: '-98px 0px auto 10%'};
      // case "right":
      //   return {
      //     top: '50%', left: '100%',
      //     // inset: 'auto 0px -17px 9.3%'
      //   };
      case 'bottom':
        return {inset: 'auto 0px -17px 9.3%'};
      // case "left":
      //   return {top: '50%', left: '0', transform: 'translateY(-50%)'};
      // case "top-start":
      //   return {top: '-84px', left: '0'};
      default:
        return {top: '0', left: '0'};
    }
  };

  const arrowPosition = (place: string) => {
    switch (place) {
      case 'top':
        return {
          inset: 'auto auto -8px 15px',
        };
      // case "right":
      //   return {
      //     top: '50%', left: '100%',
      //     // inset: 'auto auto -8px 15px',
      //   };
      case 'bottom':
        return {
          // top: 'calc(100% - 10px)', left: '50%'
          inset: '-10px auto auto 15px',
          transform: 'rotate(180deg)',
        };
      // case "left":
      //   return {top: '50%', left: '-10px', transform: 'translateX(100%)'};
      // case "top-start":
      //   return {top: '-10px', left: '0'};
      default:
        return {top: '0', left: '0'};
    }
  };

  return (
    <>
      {open && (
        <div
          className="custom-tooltip"
          ref={tooltipRef}
          style={positions(place)}
        >
          {children}
          <ToolArrow className="arrow" style={arrowPosition(place)} />
        </div>
      )}
    </>
  );
};

export default CustomTooltip;