import React, {useState} from 'react';

// redux
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../redux/store';

// actions
import {success} from '../../../../../redux/actions/snackbarActions';

// utils
import {post} from '../../../../../utils/api';

// constants
import {EMAIL_REGEX, VIDEO_URL_REGEX} from '../../../../../utils/constants';

// components
import Dialog from '../../../../GenericUIBlocks/Dialog';
import Input from '../../../../GenericUIBlocks/Input';
import Typography from '../../../../GenericUIBlocks/Typography';
import Button from '../../../../GenericUIBlocks/Button';

// icons
import PDF from '../../../../../assets/images/modal-icons/pdf';
import PNG from '../../../../../assets/images/modal-icons/png';
import DOC from '../../../../../assets/images/modal-icons/doc';
import DOCX from '../../../../../assets/images/modal-icons/docx';
import JPG from '../../../../../assets/images/modal-icons/jpg';
import JPEG from '../../../../../assets/images/modal-icons/jpeg';
import CancelFile from '../../../../../assets/images/modal-icons/cancel-file';
import Add from '../../../../../assets/images/modal-icons/add';

// styles
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
  const {open, onClose, onCreateCustomTemplateQuery, productId} = props;
  const [queryTitle, setQueryTitle] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryFile, setQueryFile] = useState([]);
  const [queryVideoUrl, setQueryVideoUrl] = useState('');
  const [queryComments, setQueryComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: '',
    email: '',
    files: '',
    videoUrl: '',
    comments: '',
  });

  const dispatch: AppDispatch = useDispatch();

  const handleTitleChange = (event: any) => {
    setQueryTitle(event.target.value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      title: event.target.value.trim() && '',
    }));
  };

  const handleEmailChange = (event: any) => {
    setQueryEmail(event.target.value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      email: event.target.value.trim() && '',
    }));
  };

  const handleVideoUrlChange = (event: any) => {
    setQueryVideoUrl(event.target.value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      videoUrl: event.target.value.trim() && '',
    }));
  };

  const handleFileChange = (event: any) => {
    const newFilesArray = Array.from(event.target.files);
    const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
    const validFiles = newFilesArray.filter((file: any) => acceptableTypes.includes(file.type));
    const invalidFiles = newFilesArray.filter((file: any) => !acceptableTypes.includes(file.type));
  
    if (invalidFiles.length > 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        files: 'Some files have unsupported formats. Please upload only .png, .jpg, .jpeg, .pdf, .doc, or .docx files.',
      }));
      setTimeout(() => {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          files: '',
        }));
      }, 4000);
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        files: '',
      }));
    }
  
    if (validFiles.length > 0) {
      setQueryFile((prevFiles) => [...prevFiles, ...validFiles] as never[]);
    }
  };

  const handleFileRemove = (file: any) => {
    const updatedFiles = queryFile.filter((f: any) => f.name !== file.name);
    setQueryFile(updatedFiles);
  };

  const handleCommentsChange = (event: any) => {
    setQueryComments(event.target.value);
    setFormErrors((prevErrors: any) => ({
      ...prevErrors,
      comments: event.target.value.trim() && '',
    }));
  };

  const validateForm = (formData: any, setFormErrors: any) => {
    const errors: any = {};

    if (!formData.queryTitle.trim()) {
      errors.title = 'Template Name is required';
    }

    if (formData.queryFile.length > 5) {
      errors.files = 'You can only upload up to 5 files.';
    }

    if (!formData.queryVideoUrl.trim()) {
      errors.videoUrl = 'Video URL is required';
    } else if (!VIDEO_URL_REGEX.test(formData.queryVideoUrl.trim())) {
      errors.videoUrl = 'Video URL is not valid';
    }

    if (!formData.queryComments.trim()) {
      errors.comments = 'Comments are required';
    }

    if (!formData.queryEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.queryEmail.trim())) {
      errors.email = 'Email is not valid';
    }

    setFormErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setQueryTitle('');
    setQueryEmail('');
    setQueryVideoUrl('');
    setQueryFile([]);
    setQueryComments('');
    setFormErrors({
      title: '',
      email: '',
      files: '',
      videoUrl: '',
      comments: '',
    });
  };

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      const formData = {
        queryTitle,
        queryVideoUrl,
        queryComments,
        queryFile,
        queryEmail,
      };

      const isValid = validateForm(formData, setFormErrors);
      if (!isValid) return;
      setIsLoading(true);

      const form = new FormData();
      form.append('title', queryTitle);
      form.append('comments', queryComments);
      form.append('email', queryEmail);
      form.append('productId', productId);
      form.append('url', queryVideoUrl);

      queryFile.forEach((file: any) => {
        form.append('files', file);
      });

      const response: any = await post('/custom-template-queries/create', form);
      if (response && response.status === 200) {
        setIsLoading(false);
        resetForm();
        onClose();
        dispatch(success(response.data.message));
        onCreateCustomTemplateQuery(response.data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
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
        <Typography variant="h2">Custom Design Form</Typography>
        <form className="designerForm">
          <Input
            type="text"
            placeholder="Template Name"
            label="Template Name*"
            value={queryTitle}
            onChange={handleTitleChange}
            error={formErrors.title}
          />
          <div className={`input-layout`}>
            <label className="basic-label">Upload Design Files</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                onChange={handleFileChange}
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
          {queryFile.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded</h3>
              {queryFile.map((file: File, index: number) => (
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
                    onClick={() => handleFileRemove(file)}
                  >
                    <CancelFile />
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
          <Input
            type="text"
            placeholder="https://www.example.com"
            label="Video URL*"
            videoTooltip={true}
            value={queryVideoUrl}
            onChange={handleVideoUrlChange}
            error={formErrors.videoUrl}
          />
          <Input
            type="email"
            placeholder="Email"
            label="Email*"
            value={queryEmail}
            onChange={handleEmailChange}
            error={formErrors.email}
          />
          <Input
            type="textarea"
            placeholder="Comments"
            label="Comments*"
            value={queryComments}
            onChange={handleCommentsChange}
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
