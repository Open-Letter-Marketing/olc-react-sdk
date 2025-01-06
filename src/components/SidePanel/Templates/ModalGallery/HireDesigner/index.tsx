import React from 'react';

// Hooks
import { AppDispatch, RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, submitForm } from '../../../../../redux/actions/hireDesignerActions';

// Actions
import {success} from '../../../../../redux/actions/snackbarActions';

// Utils
import {post} from '../../../../../utils/api';
import { getItem, removeItem, setItem } from '../../../../../utils/local-storage';
import { dataURLtoBlob } from '../../../../../utils/helper';
import {EMAIL_REGEX, VIDEO_URL_REGEX} from '../../../../../utils/constants';
import { MESSAGES } from '../../../../../utils/message';

// Components
import Dialog from '../../../../GenericUIBlocks/Dialog';
import Input from '../../../../GenericUIBlocks/Input';
import Typography from '../../../../GenericUIBlocks/Typography';
import Button from '../../../../GenericUIBlocks/Button';

// Icons
import PDF from '../../../../../assets/images/modal-icons/pdf';
import PNG from '../../../../../assets/images/modal-icons/png';
import DOC from '../../../../../assets/images/modal-icons/doc';
import DOCX from '../../../../../assets/images/modal-icons/docx';
import JPG from '../../../../../assets/images/modal-icons/jpg';
import JPEG from '../../../../../assets/images/modal-icons/jpeg';
import CancelFile from '../../../../../assets/images/modal-icons/cancel-file';
import Add from '../../../../../assets/images/modal-icons/add';

// Styles
import './styles.scss';


const hireModalStyles = {
  maxWidth: '725px',
  minHeight: '760px',
};

const hireModalButtonStyles = {
  fontWeight: '600',
  fontSize: '18px',
  maxWidth: '643px',
  minHeight: '55px',
};

const errorStyles = {
  color: 'var(--error-color)',
  fontWeight: '400',
  fontSize: '14px',
  margin: '0',
};

const HireDesigner = (props: any) => {
  const { open, onClose, onCreateCustomTemplateQuery, productId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const {
    title,
    email,
    files,
    url,
    comments,
    isLoading,
    formErrors,
  } = useSelector((state: RootState) => state.hireDesigner);

  const handleChange = (field: string) => (event: any) => {
    dispatch(updateFormField(field, event.target.value));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = { title, email, files, url, comments, productId };
    dispatch(submitForm(formData));
    onClose();
    onCreateCustomTemplateQuery(formData);
  };

  return (
    <Dialog
      open={open}
      customStyles={hireModalStyles}
      handleClose={onClose}
      isGallery={true}
      submitText="Next"
    >
      <div className="designerFormWrapper">
        <Typography variant="h2">{MESSAGES.TEMPLATE.HIRE_DESIGNER.TITLE}</Typography>
        <form className="designerForm">
          <Input
            type="text"
            placeholder="Template Name"
            label="Template Name*"
            value={title}
            onChange={handleChange('title')}
            error={formErrors.title}
          />
          <div className={`input-layout`}>
            <label className="basic-label">{MESSAGES.TEMPLATE.HIRE_DESIGNER.UPLOAD_HEADING}</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                onChange={handleChange('files')}
                multiple
                accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                className="file-input"
              />
              <div className="upload-area">
                <div className="upload-icon">
                  <Add />
                </div>
                <label htmlFor="fileInput" className="upload-text">
                  Upload a File
                </label>{' '}
                or drag and drop
                <div className="upload-info">
                  Supported formats: .png, .jpg, .jpeg, .pdf, .doc, .docx
                </div>
              </div>
            </div>
            {formErrors.files && (
              <Typography variant="p" style={errorStyles}>
                {formErrors.files}
              </Typography>
            )}
          {/* {files.length > 0 && (
            <div className="uploaded-files">
              <h3>{MESSAGES.TEMPLATE.HIRE_DESIGNER.UPLOADED_TEXT}</h3>
              {files.map((file: File, index: number) => (
                <div className="file-item" key={index}>
                  <div className="file-icon">
                    {file.type === 'application/pdf' ? (
                      <PDF />
                    ) : file.type === 'image/jpeg' ? (
                      <JPEG />
                    ) : file.type === 'image/png' ? (
                      <PNG />
                    ) : file.type === 'image/jpg' ? (
                      <JPG />
                    ) : file.type === 'application/msword' ? (
                      <DOC />
                    ) : file.type ===
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                      <DOCX />
                    ) : null}
                  </div>
                  <div className="file-details">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div
                    className="file-remove"
                    onClick={() => handleChange('files')(file)}
                  >
                    <CancelFile />
                  </div>
                </div>
              ))}
            </div>
          )} */}
          </div>
          <Input
            type="text"
            placeholder="https://www.example.com"
            label="Video URL*"
            videoTooltip={true}
            value={url}
            onChange={handleChange('url')}
            error={formErrors.url}
          />
          <Input
            type="email"
            placeholder="Email"
            label="Email*"
            value={email}
            onChange={handleChange('email')}
            error={formErrors.email}
          />
          <Input
            type="textarea"
            placeholder="Comments"
            label="Comments*"
            value={comments}
            onChange={handleChange('comments')}
            error={formErrors.comments}
          />
        </form>
        <div className="button-container">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            style={hireModalButtonStyles}
          >
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-icon" />
              </div>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default HireDesigner;
