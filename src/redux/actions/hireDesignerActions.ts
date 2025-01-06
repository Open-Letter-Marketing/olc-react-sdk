import { Dispatch } from 'redux';
import { post } from '../../utils/api';
import {
  UPDATE_FORM_FIELD,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
} from './action-types';
import { failure, success } from './snackbarActions';
import { EMAIL_REGEX } from '../../utils/constants';
import { MESSAGES } from '../../utils/message';
import { VIDEO_URL_REGEX } from '../../utils/constants';

export const updateFormField = (field: string, value: any) => ({
  type: UPDATE_FORM_FIELD,
  payload: { field, value },
});

// const validateForm = (formData: any, setFormErrors: any) => {
//     const errors: any = {};

//     if (!formData.queryTitle.trim()) {
//       errors.title = MESSAGES.TEMPLATE.HIRE_DESIGNER.TITLE_REQUIRED;
//     }

//     if (formData.queryFile.length > 5) {
//       errors.files = MESSAGES.TEMPLATE.HIRE_DESIGNER.FILE_NUMBER;
//     }

//     if (!formData.queryVideoUrl.trim()) {
//       errors.videoUrl = MESSAGES.TEMPLATE.HIRE_DESIGNER.URL_REQUIRED;
//     } else if (!VIDEO_URL_REGEX.test(formData.queryVideoUrl.trim())) {
//       errors.videoUrl = MESSAGES.TEMPLATE.HIRE_DESIGNER.URL_VAIDATION;
//     }

//     if (!formData.queryComments.trim()) {
//       errors.comments = MESSAGES.TEMPLATE.HIRE_DESIGNER.COMMENT_REQUIRED;
//     }

//     if (!formData.email.trim()) {
//       errors.email = MESSAGES.TEMPLATE.HIRE_DESIGNER.EMAIL_REQUIRED;
//     } else if (!EMAIL_REGEX.test(formData.email.trim())) {
//       errors.email =  MESSAGES.TEMPLATE.HIRE_DESIGNER.EMAIL_VALIDATION;
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const resetForm = () => {
//     setTitle('');
//     setEmail('');
//     setUrl('');
//     setFiles([]);
//     setComments('');
//     setFormErrors({
//       title: '',
//       email: '',
//       files: '',
//       videoUrl: '',
//       comments: '',
//     });
//     removeItem('hireDesignerFormState');
//     removeItem('queryFiles');
//   };

export const submitForm = (formData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: SUBMIT_FORM_REQUEST });

  try {
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'queryFile') {
        formData[key].forEach((file: any) => form.append('files', file));
      } else {
        form.append(key, formData[key]);
      }
    });

    const response: any = await post('/custom-template-queries/create', form);
    if (response && response.status === 200) {
      dispatch({ type: SUBMIT_FORM_SUCCESS, payload: response.data });
      dispatch(success(response.data.message));
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error: any) {
    dispatch({ type: SUBMIT_FORM_FAILURE, payload: error.message });
    dispatch(failure(error.message));
  }
}; 
