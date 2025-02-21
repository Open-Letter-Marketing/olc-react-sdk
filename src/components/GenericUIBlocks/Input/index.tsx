import React, {ChangeEvent, FC, useState} from 'react';

// components
import Typography from '../Typography';
import CustomTooltip from '../CustomTooltip';
import Button from '../Button';

// icon
import Search from '../../../assets/images/input/search';
import Cancel from '../../../assets/images/input/cancel';
import VideoInfo from '../../../assets/images/modal-icons/info';
import ToolCancel from '../../../assets/images/modal-icons/tool-cancel';

// styles
import './styles.scss';

const errorStyles = {
  color: 'var(--error-color)',
  fontWeight: '400',
  fontSize: '14px',
  margin: "0"
};

interface InputProps {
  variant?: keyof JSX.IntrinsicElements;
  type: any;
  value: string,
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  inputIcon?: boolean;
  searchApplied?: boolean;
  onClick?: () => void;
  removeSearchInput?: () => void;
  onKeyDown?: () => void;
  builderInput?: boolean;
  gellerySearch?: boolean;
  videoTooltip?: boolean;
  handleFileRemove?: () => void;
  qrField?: boolean;
}

const Input: FC<InputProps> = ({
  variant = 'input',
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  inputIcon = false,
  onClick,
  searchApplied,
  removeSearchInput,
  onKeyDown,
  builderInput,
  gellerySearch = false,
  videoTooltip = false,
  handleFileRemove,
  qrField = false
}) => {
  const InputVariant = variant || 'input';

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const loomButtonStyles = {
    backgroundColor: 'var(--primary-color)',
    fontSize: '12px',
    padding: '10px 20px',
    borderRadius: '4px',
    maxHeight: '25px',
  };

  const URLTooltip = (
    <div className="videoUrlTooltip">
      <p>
        You can use Loom to create this video. Create your free Loom account
        now.
      </p>
      <Button
        style={loomButtonStyles}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://www.loom.com/','_blank');
        }}
      >
        Open Loom
      </Button>
      <ToolCancel onClick={()=>setShowTooltip(false)}/>
    </div>
  );

  const handleClose = () => {
    setShowTooltip(false);
  };

  return (
    <div className={`input-layout ${gellerySearch && 'gallery-input-layout'} ${qrField && 'qr-input-layout'}`}>
      <label className="basic-label">
        {label ? label : ''}
        {videoTooltip && (
          <>
            <span className="urlTooltip" 
            onMouseOver={()=>setShowTooltip(true)}
            >
              <VideoInfo />
            </span>
            <CustomTooltip
              children={URLTooltip}
              open={showTooltip}
              handleClose={handleClose}
              place="top"
              />
          </>
        )}
      </label>
      <div
        className={`input-with-icon ${searchApplied && 'focused'} ${error ? 'errorBorder' : ''} ${gellerySearch && 'galleryInput'} ${qrField && 'qrInputDiv'}`}
      >
        {type === 'file' ? (
          <input
            type="file"
            onChange={(e) => onChange(e)}
            accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
            multiple
            className={`basic-input ${builderInput && 'builder-input'}`}
          />
        ) : (
          <InputVariant
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`basic-input ${builderInput && 'builder-input'}`}
            onKeyDown={onKeyDown}
          />
        )}
        {inputIcon && (
          <>
            {searchApplied && value?.length > 0 ? (
              <div className="cancel-input-button" onClick={removeSearchInput}>
                <Cancel fill="var(--border-color)" />
              </div>
            ) : null}
            <div
              className="search-input-button"
              onClick={value?.length > 0 ? onClick : () => {}}
            >
              <Search fill="var(--primary-color)" />
            </div>
          </>
        )}
      </div>
      {error && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;
