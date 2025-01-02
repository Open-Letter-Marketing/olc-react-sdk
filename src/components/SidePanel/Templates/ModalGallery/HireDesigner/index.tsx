import React, {useEffect, useState} from 'react';

// Hooks
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../../redux/store';

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

  const loadState = () => {
    const savedState = getItem('hireDesignerFormState');
    return savedState ? JSON.parse(savedState) : {};
  };

  const [queryTitle, setQueryTitle] = useState(loadState().queryTitle || '');
  const [queryEmail, setQueryEmail] = useState(loadState().queryEmail || '');
  const [queryFile, setQueryFile] = useState([]);
  const [queryVideoUrl, setQueryVideoUrl] = useState(loadState().queryVideoUrl || '');
  const [queryComments, setQueryComments] = useState(loadState().queryComments || '');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: '',
    email: '',
    files: '',
    videoUrl: '',
    comments: '',
  });

  const dispatch: AppDispatch = useDispatch();

  // Update localStorage whenever a form state changes
  const updateLocalStorage = (newState: any) => {
    setItem('hireDesignerFormState', JSON.stringify(newState));
  };

  const handleTitleChange = (event: any) => {
    const newTitle = event.target.value;
    setQueryTitle(newTitle);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      title: newTitle.trim() && '',
    }));
    updateLocalStorage({ ...loadState(), queryTitle: newTitle });
  };

  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setQueryEmail(newEmail);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      email: newEmail.trim() && '',
    }));
    updateLocalStorage({ ...loadState(), queryEmail: newEmail });
  };

  const handleVideoUrlChange = (event: any) => {
    const newVideoUrl = event.target.value;
    setQueryVideoUrl(newVideoUrl);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      videoUrl: newVideoUrl.trim() && '',
    }));
    updateLocalStorage({ ...loadState(), queryVideoUrl: newVideoUrl });
  };

  const saveFilesToLocalStorage = (files: File[]) => {
    const fileData = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      content: "",
    }));

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        fileData[index].content = reader.result as string;
        if (index === files.length - 1) {
          localStorage.setItem("queryFiles", JSON.stringify(fileData));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Retrieve files from localStorage
  const getFilesFromLocalStorage = (): File[] => {
    const savedFiles = localStorage.getItem("queryFiles");
    if (!savedFiles) return [];
    const fileData = JSON.parse(savedFiles);

    return fileData.map((file: any) => {
      const blob = dataURLtoBlob(file.content, file.type);
      return new File([blob], file.name, { type: file.type });
    });
  };

  const handleFileChange = (event: any) => {
    const newFilesArray = Array.from(event.target.files);
    const acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
    const validFiles = newFilesArray.filter((file: any) => acceptableTypes.includes(file.type));
    const invalidFiles = newFilesArray.filter((file: any) => !acceptableTypes.includes(file.type));
  
    if (invalidFiles.length > 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        files: MESSAGES.TEMPLATE.HIRE_DESIGNER.FILE_VALLIDATION,
      }));
      setTimeout(() => {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          files: '',
        }));
      }, 6000);
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        files: '',
      }));
    }
  
    if (validFiles.length > 0) {
      setQueryFile((prevFiles: any) => [...prevFiles, ...validFiles] as never[]);
      saveFilesToLocalStorage([...queryFile, ...validFiles] as never[]);
    }
    event.target.value = null;
  };

  const handleFileRemove = (file: any) => {
    const updatedFiles = queryFile.filter((f: any) => f.name !== file.name);
    setQueryFile(updatedFiles);
    updateLocalStorage({ ...loadState(), queryFile: updatedFiles });
  };

  const handleCommentsChange = (event: any) => {
    const newComments = event.target.value;
    setQueryComments(newComments);
    setFormErrors((prevErrors: any) => ({
      ...prevErrors,
      comments: newComments.trim() && '',
    }));
    updateLocalStorage({ ...loadState(), queryComments: newComments });
  };

  const validateForm = (formData: any, setFormErrors: any) => {
    const errors: any = {};

    if (!formData.queryTitle.trim()) {
      errors.title = MESSAGES.TEMPLATE.HIRE_DESIGNER.TITLE_REQUIRED;
    }

    if (formData.queryFile.length > 5) {
      errors.files = MESSAGES.TEMPLATE.HIRE_DESIGNER.FILE_NUMBER;
    }

    if (!formData.queryVideoUrl.trim()) {
      errors.videoUrl = MESSAGES.TEMPLATE.HIRE_DESIGNER.URL_REQUIRED;
    } else if (!VIDEO_URL_REGEX.test(formData.queryVideoUrl.trim())) {
      errors.videoUrl = MESSAGES.TEMPLATE.HIRE_DESIGNER.URL_VAIDATION;
    }

    if (!formData.queryComments.trim()) {
      errors.comments = MESSAGES.TEMPLATE.HIRE_DESIGNER.COMMENT_REQUIRED;
    }

    if (!formData.queryEmail.trim()) {
      errors.email = MESSAGES.TEMPLATE.HIRE_DESIGNER.EMAIL_REQUIRED;
    } else if (!EMAIL_REGEX.test(formData.queryEmail.trim())) {
      errors.email =  MESSAGES.TEMPLATE.HIRE_DESIGNER.EMAIL_VALIDATION;
    }

    setFormErrors(errors);

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
    removeItem('hireDesignerFormState');
    removeItem('queryFiles');
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

  useEffect(()=>{
    const savedFiles: any = getFilesFromLocalStorage();
    setQueryFile(savedFiles);
  },[])
  
 

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
            value={queryTitle}
            onChange={handleTitleChange}
            error={formErrors.title}
          />
          <div className={`input-layout`}>
            <label className="basic-label">{MESSAGES.TEMPLATE.HIRE_DESIGNER.UPLOAD_HEADING}</label>
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
              <h3>{MESSAGES.TEMPLATE.HIRE_DESIGNER.UPLOADED_TEXT}</h3>
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
