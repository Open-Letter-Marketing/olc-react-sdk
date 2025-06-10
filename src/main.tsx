
import TemplateBuilder from "./index";

// Example to run the project locally for development. Comment out these lines when building the application
const rootElement = document.getElementById('root');
if (rootElement) {
    console.log("React SDK Loaded");
    TemplateBuilder({
        container: rootElement,
        secretKey: import.meta.env.VITE_APP_PLOTNO_API_KEY,
        publicApiKey: import.meta.env.VITE_APP_PUBLIC_API_KEY,
        sandbox: true,
        allowSenderFields: true,
        allowPropertyFields: true,
        templateGalleryModal: true,
        designerQueryAmount: 175,
        allowedAddOns: ['property_offer', 'gsv', 'custom_property_offer'],
        allowedTemplateSections: ['my_templates'],
        excludedFields: ['{{C.FIRST_NAME}}', '{{C.ADDRESS_1}}', '{{SPF.FIRST_NAME}}'],
        // env: 'staging',
        // onGetCustomFields: getAllCustomFields,
        // restrictedProducts: [9, 11, 13],
        // onGetOneTemplate: getOneTemplate,
        // olcTemplate: olcTemplateData,
        // onGetTemplates: getAllTemplatesByTab,
        // onSubmit: createTemplate,
        styles: {}
    });
} else {
    console.error("Root element '#root' not found in the document.");
}