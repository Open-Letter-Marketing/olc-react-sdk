import {
  SET_CUSTOM_FIELDS,
  SET_PLATFORM_FIELDS,
  SET_CUSTOM_FIELDS_V2,
} from '../actions/action-types';

export interface CustomFieldState {
  customFields: any[];
  customFieldsV2: any[];
  platformFields: any[];
  defaultDynamicFields: any[];
}

const initialState: CustomFieldState = {
  customFields: [],
  customFieldsV2: [],
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
      value: "Mailing Address 1",
      key: "{{C.ADDRESS_1}}",
      defaultValue: "123 Main Street",
    },
    {
      value: "Mailing Address 2",
      key: "{{C.ADDRESS_2}}",
      defaultValue: "Suite 2",
    },
    {
      value: "Mailing City",
      key: "{{C.CITY}}",
      defaultValue: "Lawrence",
    },
    {
      value: "Mailing State",
      key: "{{C.STATE}}",
      defaultValue: "MA",
    },
    {
      value: "Mailing Zip Code",
      key: "{{C.ZIP_CODE}}",
      defaultValue: "01843",
    },
    {
      value: "Contact Phone Number",
      key: "{{C.PHONE_NUMBER}}",
      defaultValue: "(555) 278-9389",
    },
    {
      value: "Contact Email",
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
    case SET_CUSTOM_FIELDS_V2:
      return {
        ...state,
        customFieldsV2: action.payload,
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
