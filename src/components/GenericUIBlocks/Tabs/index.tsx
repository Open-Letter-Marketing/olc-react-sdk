import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './styles.scss'; 

const Tabs = ({ value, onChange, tabs, className, tabClassName, indicatorClassName }: any) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  const calculateIndicatorPosition = () => {
    const activeIndex = tabs.findIndex((tab: any) => tab.id === value.id);

    if (tabRefs.current[activeIndex]) {
      const tabWidth = tabRefs.current[activeIndex]?.offsetWidth || 0;
      const tabLeft = tabRefs.current[activeIndex]?.offsetLeft || 0;

      let indicatorLeft;
      if (window.innerWidth < 768) {
        const indicatorWidth = tabWidth * 0.5;
        indicatorLeft = tabLeft + (tabWidth - indicatorWidth) / 2;
        setIndicatorStyle({
          width: `${indicatorWidth}px`,
          left: `${indicatorLeft}px`,
        });
      } else {
        const indicatorWidth = 50; 
        indicatorLeft = tabLeft + tabWidth / 2 - indicatorWidth / 2;
        setIndicatorStyle({
          width: `${indicatorWidth}px`,
          left: `${indicatorLeft}px`,
        });
      }
    }
  };

  useLayoutEffect(() => {
    calculateIndicatorPosition();
    window.addEventListener('resize', calculateIndicatorPosition);

    return () => {
      window.removeEventListener('resize', calculateIndicatorPosition);
    };
  }, [value, tabs.length]);

  useEffect(() => {
    if (tabs.length > 0 && !value.id) {
      onChange(tabs[0]); 
    }
  }, [tabs, value, onChange]);

  return (
    <div className={`tabsWrapper ${className}`}>
      <div className="tabsContainer">
        {tabs.map((tab:any, index:any) => (
          <div
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`tab ${tabClassName} ${value.id === tab.id ? 'activeTab' : ''}`}
            onClick={() => onChange(tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>
        <div
          className={`tabsIndicator ${indicatorClassName}`}
          style={indicatorStyle}
        />
    </div>
  );
};

export default Tabs;
