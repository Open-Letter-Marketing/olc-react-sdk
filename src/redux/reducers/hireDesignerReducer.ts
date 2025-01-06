import {
  UPDATE_FORM_FIELD,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
} from '../actions/action-types';

const initialState = {
  title: '',
  email: '',
  files: [],
  url: '',
  comments: '',
  isLoading: false,
  formErrors: {},
};

const hireDesignerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        formErrors: { ...state.formErrors, [action.payload.field]: '' },
      };
    case SUBMIT_FORM_REQUEST:
      return {
        ...state,
        isLoading: true,
        formErrors: { ...state.formErrors, submit: '' },
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...initialState, // Reset form state
        formErrors: { ...state.formErrors, submit: '' },
      };
    case SUBMIT_FORM_FAILURE:
      return {
        ...state,
        isLoading: false,
        formErrors: { ...state.formErrors, submit: action.payload },
      };
    default:
      return state;
  }
};

export { hireDesignerReducer }; 