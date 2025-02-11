import {
  SET_CUSTOM_FIELDS,
  SET_PLATFORM_FIELDS,
} from '../actions/action-types';

export interface CustomFieldState {
  customFields: any[];
  platformFields: any[];
  defaultDynamicFields: any[];
}

const initialState: CustomFieldState = {
  customFields: [],
  platformFields: [],
  defaultDynamicFields: [
    {
      value: "First Name",
      key: "{{C.FIRST_NAME}}",
      defaultValue: "John",
    },
    {
      value: "Last Name",
      key: "{{C.LAST_NAME}}",
      defaultValue: "Doe",
    },
    {
      value: "Full Name",
      key: "{{C.FIRST_NAME}} {{C.LAST_NAME}}",
      defaultValue: "John Doe",
    },
    {
      value: "Company Name",
      key: "{{C.COMPANY_NAME}}",
      defaultValue: "ABC Company, Inc.",
    },
    {
      value: "Address 1",
      key: "{{C.ADDRESS_1}}",
      defaultValue: "123 Main Street",
    },
    {
      value: "Address 2",
      key: "{{C.ADDRESS_2}}",
      defaultValue: "Suite 2",
    },
    {
      value: "City",
      key: "{{C.CITY}}",
      defaultValue: "Lawrence",
    },
    {
      value: "State",
      key: "{{C.STATE}}",
      defaultValue: "MA",
    },
    {
      value: "Zip Code",
      key: "{{C.ZIP_CODE}}",
      defaultValue: "01843",
    },
    {
      value: "Phone Number",
      key: "{{C.PHONE_NUMBER}}",
      defaultValue: "(555) 278-9389",
    },
    {
      value: "Email",
      key: "{{C.EMAIL}}",
      defaultValue: "johndoe@gmail.com",
    },
  ],
};

const customFieldReducer = (state = initialState, action: any): CustomFieldState => {
  switch (action.type) {
    case SET_CUSTOM_FIELDS:
      return {
        ...state,
        customFields: action.payload,
      };
    case SET_PLATFORM_FIELDS:
      return {
        ...state,
        platformFields: action.payload,
      };
    default:
      return state;
  }
};

export { customFieldReducer };
