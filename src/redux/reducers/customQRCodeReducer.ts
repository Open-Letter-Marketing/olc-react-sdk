import { SET_QR_URL, SET_UTM_SOURCE, SET_UTM_MEDIUM, SET_UTM_CAMPAIGN_NAME, SET_CUSTOM_UTMS, CLEAR_QR_FIELDS, SET_IS_QR } from '../actions/action-types';

export interface CustomQRCodeState {
  url: string;
  utmSource: string;
  utmMedium: string;
  utmCampaignName: string;
  customUtms: Record<string, any>;
  isQR: boolean;
}

const initialState: CustomQRCodeState = {
  url: '',
  utmSource: 'direct mail',
  utmMedium: 'QR Code',
  utmCampaignName: '',
  customUtms: {},
  isQR: false,
};


const customQRCodeReducer = (
  state = initialState,
  action: any
): CustomQRCodeState => {
  switch (action.type) {
    case SET_QR_URL:
      return { ...state, url: action.payload };
    case SET_UTM_SOURCE:
      return { ...state, utmSource: action.payload };
    case SET_UTM_MEDIUM:
      return { ...state, utmMedium: action.payload };
    case SET_UTM_CAMPAIGN_NAME:
      return { ...state, utmCampaignName: action.payload };
    case SET_CUSTOM_UTMS:
      return { ...state, customUtms: action.payload };
    case SET_IS_QR:
      return { ...state, isQR: action.payload };
    case CLEAR_QR_FIELDS:
      return { ...initialState };
    default:
      return state;
  }
}

export { customQRCodeReducer };
