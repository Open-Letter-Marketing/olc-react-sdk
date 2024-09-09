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
  container: document.querySelector('div#element-id'),
  secretKey: 'your-secret-key',
  basicAuthUsername: 'your-username',
  basicAuthPassword: 'your-password',
  platformName: 'Your Platform Name',
  createTemplateRoute: '/create-template',
  templateBuilderRoute: '/edit-template',
  olcTemplate: yourTemplateObject,
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
| `container`            | _HTMLDivElement_ | An HTML DOM element to render the template builder component.                                                  | &#10003; | `document.querySelector('div#template-builder-container')` |
| `secretKey`            | _string_         | That key is used to communicate _Polotno_ Editor (Builder) with API requests.                                  | &#10003; | `'your-secret-key'`                                        |
| `basicAuthUsername`    | _string_         | _Username_ for basic authentication.                                                                           | &#10003; | `'your-username'`                                          |
| `basicAuthPassword`    | _string_         | _Password_ for basic authentication.                                                                           | &#10003; | `'your-password'`                                          |
| `platformName`         | _string_         | The name of your platform.                                                                                     | &#10539; | `'My App'`                                                 |
| `createTemplateRoute`  | _string_         | The route/path for creating new templates. _(begins with slash `/`)_                                           | &#10539; | `'/create-template'`                                       |
| `templateBuilderRoute` | _string_         | The route/path for editing existing templates. _(begins with slash `/`)_                                       | &#10539; | `'/edit-template'`                                         |
| `olcTemplate`          | _object_         | The template object to be edited or used as a base.                                                            | &#10539; | `{ ... }`                                                  |
| `onReturnAndNavigate`  | _function_       | An event which triggers when a user navigates away.                                                            | &#10539; | `onReturnAndNavigate () { ... }`                           |
| `onGetOneTemplate`     | _function_       | An event which triggers when fetching a specific template.                                                     | &#10539; | `onGetOneTemplate ( payload ) { ... }`                     |
| `onGetTemplates`       | _function_       | An event which triggers when fetching all templates.                                                           | &#10539; | `onGetTemplates ( payload ) { ... }`                       |
| `onGetCustomFields`    | _function_       | An event which triggers when fetching custom fields for templates.                                             | &#10539; | `onGetCustomFields () { ... }`                             |
| `onSubmit`             | _function_       | An event which triggers upon template submission.                                                              | &#10539; | `onSubmit () { ... }`                                      |
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
      container: document.querySelector('div#template-builder-container'),
      secretKey: 'your-secret-key',
      basicAuthUsername: 'your-username',
      basicAuthPassword: 'your-password',
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
