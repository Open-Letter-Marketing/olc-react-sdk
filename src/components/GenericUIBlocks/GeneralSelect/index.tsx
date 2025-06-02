import React from 'react';

// react select
import Select, {StylesConfig, ClearIndicatorProps, components} from 'react-select';

// icons
import Cancel from '../../../assets/images/input/select-cancel';

// components
import Typography from '../Typography';

// styles
import './styles.scss';

interface Option {
  id?: number | string;
  value: string;
  label: string;
}

interface GeneralSelectProps {
  options: Option[];
  placeholder?: string;
  error?: string;
  label?: string;
  selectedValue: Option | null;
  isError: boolean;
  setSelectedValue: (option: Option | null) => void;
  builderSelect: boolean;
  gallerySelect: boolean;
  clearField: boolean;
  qrField?: boolean;
  search?: boolean;
}

const colourStyles: StylesConfig<Option, false> = {
  dropdownIndicator: (styles, {isFocused, selectProps}) => ({
    ...styles,
    color: isFocused && selectProps.menuIsOpen ? 'var(--primary-color)' : 'grey',
    transform:
      !isFocused && !selectProps.menuIsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
  }),
  option: (styles, {isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected && isFocused
          ? 'var(--secondary-color)'
          : isFocused && !isSelected
            ? 'var(--secondary-color)'
            : undefined,
    };
  },
};

const errorStyles = {
  color: 'var(--error-color)',
  fontWeight: '400',
};

const ClearIndicator: React.FC<ClearIndicatorProps<any>> = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <Cancel />
    </components.ClearIndicator>
  );
};

const GeneralSelect: React.FC<GeneralSelectProps> = ({
  options,
  placeholder,
  error,
  label,
  isError,
  selectedValue,
  setSelectedValue,
  builderSelect,
  gallerySelect=false,
  clearField,
  qrField = false,
  search = false
}) => {
  return (
    <div className="select-layout" style={{
      display: gallerySelect ? "block" : 'flex'
    }}>
      <label>{label && label}</label>
      <Select
        value={selectedValue}
        options={options}
        onChange={setSelectedValue}
        styles={colourStyles}
        className={`generic-select-container ${builderSelect && 'template-select'} ${gallerySelect && 'gallery-select'} ${qrField && 'qr-select'}`}
        classNamePrefix="generic-select"
        placeholder={placeholder}
        blurInputOnSelect
        isClearable={clearField}
        components={{ClearIndicator}}
        isSearchable={search}
      />
      {isError && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default GeneralSelect;
