export const PROD_API_BASE_URL = 'https://qrforward.org/api/v1/sdk';
export const DEMO_API_BASE_URL = 'https://demo.qrforward.org/api/v1/sdk';
export const STAGE_API_BASE_URL = 'https://staging.qrforward.org/api/v1/sdk';
export const LOCAL_API_BASE_URL = 'http://localhost:8089/api/v1/sdk';

export const  LOCAL_S3_URL = 'http://localhost:8089/api/v1/download/s3/sdk-images';
export const  STAGE_S3_URL = `https://staging.qrforward.org/api/v1/download/s3/sdk-images`;
export const  DEMO_S3_URL = `https://demo.qrforward.org/api/v1/download/s3/sdk-images`;
export const  PROD_S3_URL = `https://qrforward.org/api/v1/download/s3/sdk-images`;

export const DEMO_PO_GENERATOR_URL = 'https://demo.offer-generator.com/property-offers';
export const STAGE_PO_GENERATOR_URL = 'https://staging.offer-generator.com/property-offers';
export const PROD_PO_GENERATOR_URL = 'https://offer-generator.com/property-offers';

export const DPI: number = 96;

export const BARCODE_IMAGE_URL: string = `/assets/preview/one-barcode.png`;
export const GOOGLE_STREET_VIEW_IMAGE_URL: string = `/default_images/dummyGSV.png`;

export const PRODUCT_LEARN_URL: string = "https://help.openletterconnect.com/draft-help-doc/product-and-order-guide/creating-a-template";

export const multiPageLetters: string[] = [
  "Postcards",
  "Tri-Fold Self-Mailers",
  "Bi-Fold Self-Mailers",
  "Snap Pack Mailers",
];

//@ts-ignore
export const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2300}-\u{23FF}]|[\u{2B50}\u{2B55}]|[\u{1F004}\u{1F0CF}]/u;

export const allowedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

interface TemplateTypes {
  id: string;
  label: string;
  value: string;
}

export const defaultTemplateTypes: TemplateTypes [] = [
  {
    id: "1",
    label: "My Templates",
    value: "my_templates"
  },
  {
    id: "2",
    label: "Team Templates",
    value: "team_templates"
  }
];

export const sortOrderForTemplates: string[] = [
  "Postcards",
  "Personal Letters",
  "Professional Letters",
  "Snap Pack Mailers",
  "Bi-Fold Self-Mailers",
  "Tri-Fold Self-Mailers",
  "Real Penned Letter",
];

export const EMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9_\-\+])*@[a-z0-9](\.?[a-z0-9-])*\.[a-z]{2,}$/i;
export const VIDEO_URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const DISALLOWED_DOMAINS = [
  'qrforward.org',
  'demo-qrforward.org',
  'staging-qrforward.org',
];

export const MERGE_UTM_PARAMS = [
  {
    key: '{{C.FIRST_NAME}}',
    value: 'firstname'
  },
  {
    key: '{{C.LAST_NAME}}',
    value: 'lastname'
  },
  {
    key: '{{C.EMAIL}}',
    value: 'email'
  },
  {
    key: '{{C.PHONE_NUMBER}}',
    value: 'phone'
  }
];