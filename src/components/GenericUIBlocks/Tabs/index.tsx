import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './styles.scss'; // Create a CSS file for your custom styles

const Tabs = ({ value, onChange, tabs, className, tabClassName, indicatorClassName }: any) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex((tab: any) => tab.id === value.id);

    if (tabRefs.current[activeIndex]) {
      const tabWidth = tabRefs.current[activeIndex]?.offsetWidth || 0;
      const tabLeft = tabRefs.current[activeIndex]?.offsetLeft || 0;

      const indicatorLeft = tabLeft + tabWidth / 2 - 25;
      setIndicatorStyle({
        width: '50px',
        left: `${indicatorLeft}px`,
      });
    }
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
