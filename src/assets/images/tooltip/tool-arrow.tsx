import React from 'react';

const ToolArrow = (props: any) => {
  const {style, className} = props;
  return (
    <>
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        className={className}
      >
        <path
          d="M10.5699 15.6341C10.0247 16.569 8.67178 16.5631 8.1347 15.6235L0.801114 2.79264C0.264037 1.85297 0.945586 0.684273 2.0279 0.688985L16.8065 0.753326C17.8888 0.758038 18.5602 1.93262 18.0149 2.86758L10.5699 15.6341Z"
          fill="white"
        />
      </svg>
    </>
  );
};

export default ToolArrow;
