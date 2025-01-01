import React, {useEffect, useRef} from 'react';

// Icons
import ToolArrow from '../../../assets/images/tooltip/tool-arrow';

// Styles
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
      case 'bottom':
        return {inset: 'auto 0px -17px 9.3%'};
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
      case 'bottom':
        return {
          inset: '-10px auto auto 15px',
          transform: 'rotate(180deg)',
        };
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