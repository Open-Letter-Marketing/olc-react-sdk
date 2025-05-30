// Default messages and Typography

export const MESSAGES = {
  TEMPLATE_MESSAGE_ON_SMALL_SCREEN: 'Template Builder is available on tablet and web view only.',
  GENERAL_ERROR: "Internal Server Error",
  DOWNLOAD_ERROR: 'Something went wrong. Please try again.',
  CLONE_ERROR: 'We are currently unable to clone the template. Please try again later.',
  TEMPLATE: {
    SEARCH_PLACE_HOLDER: "Search by template name or template ID",
    NAME_REQUIRED: "Template Name is required",
    TYPE_REQUIRED: "Template Type is required",
    DESIGN_NEW: "Design Your Own",
    NO_MY_TEMPLATES: "No Templates to show",
    LOADING_TEMPLATE: "Loading Templates...",
    NO_TEAM_TEMPLATES: "No Team Templates to show",
    NO_OLC_TEMPLATES: "No OLC Templates to show",
    PRODUCT_TYPE_REQUIRED: "Product Type is required",
    ENVELOPE_TYPE_REQUIRED: "Envelope Type is required",
    POSTCARD_SIZE_REQUIRED: "Postcard Size is required",
    NAME_LESS_50: "Template Name should be less than or equal to 50 characters",
    GSV_RESTRICT_ONE_PER_PAGE: 'Only one GSV image is allowed per page.',
    EMOJI_NOT_ALLOWED: 'Emojis are not allowed in the template. Please remove them before saving.',
    EMPTY_QR_NOT_ALLOWED: 'Please add a URL to your QR code in order to save the template.',
    SIZE_LIMIT_EXCEED: 'Template size should be less than 7MB. Please remove custom fonts or unnecessary assets.',
    CREATE: {
      TITLE: 'Create New Template',
      TEMPLATE_LABEL: 'Template Name*',
      PRODUCT_LABEL: 'Product Type*',
      LEARN_TEXT: 'Learn More',
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "Next",
    },
    LIMIT_MODAL: {
      TITLE: "Limit Reached",
      HEADING: "You've reached your template limit",
      SUB_HEADING: "Please Upgrade your subscription to add more templates",
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "View Plans",
    },
    DELETE: {
      TITLE: "Delete Template",
      HEADING: "Are you sure you want to delete this Template?",
      PARAGRAPH:
        "This template will be deleted from your Templates list but will still be included in associated orders.",
    },
    SAVE: {
      TITLE: "Confirm Save Template",
      HEADING: "Are you sure you want to save this template?",
      PARAGRAPH:
        "The updates provided will be used right away for any orders referencing this template.",
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "Save"
    },
    CANCEL: {
      TITLE: "Confirm Cancel Template",
      HEADING: "Are you sure you want to cancel this Template?",
      PARAGRAPH: "You will lose your changes after canceling.",
      BACK_BUTTON: "Go Back",
      CANCEL_BUTTON: "Cancel Template",
    },
    DESIGN_YOUR_OWN: {
      TITLE: "Confirm",
      HEADING: "Are you sure you want to discard these changes?",
      PARAGRAPH:
        "You will lose your changes. Please save your changes or click ok to proceed.",
    },
    SELECT_TEMPLATE: {
      TITLE: "Confirm",
      HEADING:
        "Are you sure you want to change current template with this one?",
      PARAGRAPH:
        "You will lose your changes. Please save your changes or click ok to proceed.",
      SUBMIT_BUTTON: "OK",
      CANCEL_BUTTON: "Cancel",
    },
    CUSTOM_UPLOAD_SECTION: {
      HEADING: 'Do you want to upload your own images?',
      ACCEPTED_FORMATS: 'Accepted File Formats: JPEG, PNG, SVG',
      MAX_SIZE: 'Max File Size Limits: 5MB',
      UPLOAD_BTN_TEXT: 'Upload Image',
      TYPE_VALIDATION: 'Only image files with extensions jpeg, png, or svg are allowed.',
      SIZE_VALIDATION: 'File size must be under 5MB.',
    },
    QR_SECTION: {
      EMPTY_QR: 'Please add a URL to your QR code.',
      QR_PLACEHOLDER: 'Enter QR URL',
      INVALID_URL: 'Please add a valid URL to your QR code.',
      SUBMIT_BUTTON: "Add new QR code",
      UPDATE_BUTTON: "Update QR code",
    },
    HIRE_DESIGNER: {
      TITLE: 'Custom Design Form',
      UPLOAD_HEADING: 'Upload Design Files',
      UPLOADED_TEXT: 'Uploaded',
      FILE_VALLIDATION: 'One or more files have unsupported formats. Please upload only .png, .jpg, .jpeg, .pdf, .doc, or .docx files.',
      FILE_NUMBER: 'You can only upload up to 5 files.',
      TITLE_REQUIRED: 'Template Name is required',
      URL_REQUIRED: 'Video URL is required',
      URL_VAIDATION: 'Video URL is not valid',
      COMMENT_REQUIRED: 'Comments are required',
      EMAIL_REQUIRED: 'Email is required',
      EMAIL_VALIDATION: 'Email is not valid',
      SUBMIT_BUTTON: "Next",
    },
    DUPLICATE_MODAL: {
      TITLE: 'Clone Template',
      NAME_PLACEHOLDER: 'Enter new template name',
      CANCEL_BUTTON: 'Cancel',
      SUBMIT_BUTTON: "Clone",
      SUB_HEADING: 'Enter a New Name for Your Template',
      DESCRIPTION: 'Create a clone of an existing template. Please provide a new name for the template to proceed.',
    },
    CUSTOM_ADD_ONS: {
      TITLE: `Optional Add-On's`,
      NO_RESULT: 'Add-ons are unavailable because the property address is excluded. Please update your settings to enable these features.',
      DESCRIPTION: `Optional add-ons are additional services that user can choose to include with their template, enhancing their overall experience.`,
      GSV: {
        TITLE: 'Street View Property Image',
        DESCRIPTION: '+$0.02 per mail piece',
      },
      PROPERTY_OFFER : {
        TITLE: 'Add an Offer',
        DESCRIPTION: '(generated using Property Info)',
        PRICE: '+$0.03 per mail piece',
        CUSTOM: {
          TITLE: 'Add an Offer (+$0.03 per mail piece)',
          DESCRIPTION: 'Unsure of your offer %?',
          PRICE: '+$0.03 per mail piece',
          CLICK: 'Click here',
          CSV_IMPORT: 'to import a CSV to determine the best offer % for you!',
          CUSTOM_PRICE: 'Enter Offer Percentage*'
        }
      }
    },
    DOWNLOAD_PROOF_BUTTON: "Download Proof",
    CANCEL_BUTTON: "Cancel",
    SUBMIT_BUTTON: "Save"
  },
  SNACKBAR: {
    HEADING: "Notifications",
  },
} as const;
