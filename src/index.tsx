import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.scss';

// font families
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// utils
import { CustomCSSProperties } from './utils/customStyles';
import { setIsSandbox, setPublicApiKey } from './utils/helper';

interface TemplateBuilderProps {
  container: HTMLElement | null;
  secretKey: string;
  publicApiKey: string;
  platformName?: string | null;
  templateGalleryModal?: boolean;
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
  olcTemplate?: Record<string, any>;
  sandbox?: boolean;
  allowSenderFields?: boolean;
  allowPropertyFields?: boolean;
  onReturnAndNavigate?: () => void;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
  styles?: {
    root?: CustomCSSProperties;
  };
}

const TemplateBuilder = ({
  container,
  secretKey,
  publicApiKey,
  platformName,
  templateGalleryModal = true,
  createTemplateRoute,
  templateBuilderRoute,
  olcTemplate,
  sandbox,
  allowSenderFields,
  allowPropertyFields,
  onReturnAndNavigate,
  onGetOneTemplate,
  onGetTemplates,
  onGetCustomFields,
  onSubmit,
  styles,
}: TemplateBuilderProps): void => {
  if (!container) {
    throw new Error('Root element not found');
  }
  if (!secretKey) {
    throw new Error('secretKey not found');
  }
  if (!publicApiKey) {
    throw new Error('publicApiKey not found');
  }
  if (sandbox) {
    setIsSandbox(sandbox);
  }
  setPublicApiKey(publicApiKey);
  const root = ReactDOM.createRoot(container);
  root.render(
    <>
      <Provider store={store}>
        <Router>
          <App
            secretKey={secretKey}
            styles={styles}
            olcTemplate={olcTemplate}
            platformName={platformName}
            templateGalleryModal={templateGalleryModal}
            createTemplateRoute={createTemplateRoute}
            templateBuilderRoute={templateBuilderRoute}
            allowSenderFields={allowSenderFields}
            allowPropertyFields={allowPropertyFields}
            onReturnAndNavigate={onReturnAndNavigate}
            onGetOneTemplate={onGetOneTemplate}
            onGetTemplates={onGetTemplates}
            onGetCustomFields={onGetCustomFields}
            onSubmit={onSubmit}
          />
        </Router>
      </Provider>
    </>
  );

  //@ts-ignore
  return {
    destroy() {
      console.log("React template builder destroyed");
      root.unmount();
    }
  }
};

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
    templateGalleryModal: false,
    // onGetOneTemplate: getOneTemplate,
    // olcTemplate: olcTemplateData,
    // onGetTemplates: getAllTemplatesByTab,
    // onSubmit: createTemplate,
    styles: {}
  });
} else {
  console.error("Root element '#root' not found in the document.");
}

export default TemplateBuilder;
