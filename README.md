# Integration Guide

## OLC React SDK Integration Guide

### Introduction

The OLC React SDK allows developers to integrate a customizable template builder into their applications. This guide provides step-by-step instructions to help you install, configure, and use the SDK.

### 1. Installation

Start by installing the OLC React SDK via [NPM](https://www.npmjs.com/package/@openlettermarketing/olc-react-sdk).

```Shell
npm install @openlettermarketing/olc-react-sdk
```

### 2. Importing and Initializing the SDK

After installation, import the SDK into your React application and configure the required properties to initialize the `TemplateBuilder` component.

### Complete coverage usage:.
The following example shows the demo of all props minimalist usage, For the real case integration, see [integration example](#6-real-case-of-usage).

```Javascript
import TemplateBuilder from '@openlettermarketing/olc-react-sdk';

const templateBuilderProps = {
  container: document.getElementById('element-id'),
  secretKey: 'your-secret-key',
  publicApiKey: 'your-api-key',
  platformName: 'Your Platform Name',
  createTemplateRoute: '/create-template',
  templateBuilderRoute: '/edit-template',
  olcTemplate: yourTemplateObject,
  sandbox: true,
  onReturnAndNavigate () {
    // TODO: Define what happens when the user returns and navigates.
  },
  async onGetOneTemplate (payload) => {
    // TODO: Fetch a specific template.
  },
  async onGetTemplates (payload) => {
    // TODO: Fetch all templates.
  },
  async onGetCustomFields () => {
    // TODO: Fetch custom fields for the templates.
  },
  async onSubmit (payload) => {
    // TODO: Handle the submission of a template.
  },
  styles: {
    root: {
      // Custom CSS properties for the root element.
    },
  },
};

TemplateBuilder(templateBuilderProps);
```

### 3. Configuration through Props
The SDK uses several properties to manage its behavior. Below is a breakdown of key props:

| Prop name              | Type             | Description                                                                                                    | Required | Example / Usage                                            |
|------------------------|:-----------------|----------------------------------------------------------------------------------------------------------------|----------|:-----------------------------------------------------------|
| `container`            | _HTMLDivElement_ | An HTML DOM element to render the template builder component.                                                  | &#10003; | `document.getElementById('template-builder-container')` |
| `secretKey`            | _string_         | That key is used to communicate _Polotno_ Editor (Builder) with API requests.                                  | &#10003; | `'your-secret-key'`                                        |
| `publicApiKey`         | _string_         | _publicApiKey_ is used for basic authentication between the OLC and the client platform.                       | &#10003; | `'your-api-key'`                                          |
| `platformName`         | _string_         | The name of your platform.                                                                                     | &#10539; | `'My App'`                                                 |
| `createTemplateRoute`  | _string_         | The route/path for creating new templates. _(begins with slash `/`)_                                           | &#10539; | `'/create-template'`                                       |
| `templateBuilderRoute` | _string_         | The route/path for editing existing templates. _(begins with slash `/`)_                                       | &#10539; | `'/edit-template'`                                         |
| `olcTemplate`          | _object_         | The template object to be edited or used as a base.                                                            | &#10539; | `{ ... }`                                                  |
| `sandbox`              | _boolean_        | The sandbox setting can be either true or false. Set to true for demo purposes and false for production.       | &#10539; | `true`     
| `templateGalleryModal`              | _boolean_        | The templateGalleryModal setting can be either true or false. Set to true for modal view and false for sidebar template gallery.       | &#10539; | `true`        
| `designerQueryAmount`              | _number_        | The designerQueryAmount prop is used in the "Hire a Designer" card within the template gallery section to display the specified amount.       | &#10539; | `25`      
| `allowedAddOns`   | _string[ ]_       |  The allowedAddOns prop lets you specify which add-ons appear in the add-ons section by providing their keys as an array of strings. You can add or remove add-ons as needed by updating this array.    | &#10539; | `['property_offer','gsv']` |
| `allowSenderFields`    | _boolean_        | The allowSenderFields prop can be set to either true or false. When set to true, it makes the sender fields visible in the custom fields section.    | &#10539; | `true`               |
| `allowPropertyFields`  | _boolean_        | The allowPropertyFields prop can be set to either true or false. When set to true, it makes the property fields visible in the custom fields section.    | &#10539; | `true`             |
| `allowedTemplateSections`  | _string[ ]_      | The allowedTemplateSections prop lets you control which sections appear in the template gallery by adding or removing them as needed.    | &#10539; | `['my_templates', 'team_templates']`             |
| `restrictedProducts`              | _number[]_        | The restrictedProducts prop filters products on the product selection screen, allowing you to show or hide products as needed. Simply include the product IDs in the array to filter out specific products.   | &#10539; | `[9, 11, 13]` | 
| `excludedFields`  | _string[ ]_      | The excludedFields prop allows you to remove specific fields from the custom fields section by their key    | &#10539; | `['{{C.EMAIL}}','{{SPF.LAST_NAME}}']`             |
| `templateGalleryModal`  | _boolean_       | The templateGalleryModal prop can be set to either true or false. When set to false, it disables the template gallery modal and activates the sidebar gallery in the template builder.   | &#10539; | `true`             |
| `onReturnAndNavigate`  | _function_       | An event which triggers when a user navigates away.                                                            | &#10539; | `onReturnAndNavigate () { ... }`                           |
| `onGetOneTemplate`     | _function_       | An event which triggers when fetching a specific template.                                                     | &#10539; | `onGetOneTemplate ( payload ) { ... }`                     |
| `onGetTemplates`       | _function_       | An event which triggers when fetching all templates.                                                           | &#10539; | `onGetTemplates ( payload ) { ... }`                       |
| `onGetCustomFields`    | _function_       | An event which triggers when fetching custom fields for templates.                                             | &#10539; | `onGetCustomFields () { ... }`                             |
| `onSubmit`             | _function_       | An event which triggers upon template submission.                                                              | &#10539; | `onSubmit () { ... }`                                      |
| `destroy`              | _function_       | An event that destroys the template builder instance and cleans up all associated components and cache. Call this function when unmounting the template builder component to ensure proper cleanup and avoid memory leaks.    | &#10539; | `templateBuilderInstance.destroy()`                                        |
| `styles`               | _object_         | An object of [JSS](https://reactjs.org/docs/faq-styling.html) props for customize styling of template builder. | &#10539; | `{ root: { ... } }`                                        |

### 4. API Integration
To integrate the SDK’s API, ensure that your backend securely communicates with the OLC _Backend_, returning the necessary data to the SDK frontend.

### 5. Customization and Styling
The SDK allows for extensive customization of the template builder’s appearance. Use the `styles` prop to apply custom CSS properties and match the look and feel of your application.

### 6. Real-case of usage
Below is an example of how to use the SDK within a React component:

```Typescript
import { useEffect } from 'react';

// SDKs
import TemplateBuilder from '@openlettermarketing/olc-react-sdk';

// styles
import '@blueprintjs/core/lib/css/blueprint.css';

const App = () => {
  useEffect(() => {
    TemplateBuilder({
      container: document.getElementById('template-builder-container'),
      secretKey: 'your-secret-key',
      publicApiKey: 'your-api-key',
      sandbox: false,
      async onSubmit (payload) {
        console.log('Template submitted:', payload);
        // Implement your submission logic here
      },
    });
  }, []);

  return (
    <>
      {/** ... */}
      <div id="template-builder-container" />
    </>
  );
}

export default App;
```
