import React, { useLayoutEffect, useRef, useState } from 'react';
import './styles.scss'; // Create a CSS file for your custom styles

const Tabs = ({ value, onChange, tabs, className, tabClassName, indicatorClassName }: any) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (tabRefs.current[value.id]) {
      const tabWidth = tabRefs.current[value.id]?.offsetWidth;
      const tabLeft = tabRefs.current[value.id]?.offsetLeft;

      setIndicatorStyle({
        width: `50px`, // Fixed width
        left: `${tabLeft + tabWidth / 2 - 25}px`, // Centering the 50px indicator under the tab
      });
    }
  }, [value, tabs.length]);

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
