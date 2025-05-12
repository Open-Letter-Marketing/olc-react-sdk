import {
  SET_QR_URL,
  SET_UTM_SOURCE,
  SET_UTM_MEDIUM,
  SET_UTM_CAMPAIGN_NAME,
  SET_CUSTOM_UTMS,
  CLEAR_QR_FIELDS,
  SET_IS_QR,
} from '../actions/action-types';

export const setIsQR = (isQR: boolean) => ({
  type: SET_IS_QR,
  payload: isQR,
});

export const setQrUrl = (url: string) => ({
  type: SET_QR_URL,
  payload: url,
});

export const setUtmSource = (utmSource: string) => ({
  type: SET_UTM_SOURCE,
  payload: utmSource,
});

export const setUtmMedium = (utmMedium: string) => ({
  type: SET_UTM_MEDIUM,
  payload: utmMedium,
});

export const setUtmCampaignName = (utmCampaignName: string) => ({
  type: SET_UTM_CAMPAIGN_NAME,
  payload: utmCampaignName,
});

export const setCustomUtms = (customUtms: Record<string, any>) => ({
  type: SET_CUSTOM_UTMS,
  payload: customUtms,
});

export const clearQrFields = () => ({
  type: CLEAR_QR_FIELDS,
});
