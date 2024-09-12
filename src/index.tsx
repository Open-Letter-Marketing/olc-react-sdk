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
import { setAuthUserName, setAuthUserPassword, setIsSandbox } from './utils/helper';

interface TemplateBuilderProps {
  container: HTMLElement | null;
  secretKey: string;
  basicAuthUsername: string;
  basicAuthPassword: string;
  platformName?: string | null;
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
  olcTemplate?: Record<string, any>;
  defaultCategory?: string[];
  sandbox?: boolean;
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
  basicAuthUsername,
  basicAuthPassword,
  platformName,
  createTemplateRoute,
  templateBuilderRoute,
  olcTemplate,
  defaultCategory,
  sandbox,
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
  if (!basicAuthUsername) {
    throw new Error('basicAuthUsername not found');
  }
  if (!basicAuthPassword) {
    throw new Error('basicAuthPassword not found');
  }
  if (sandbox) {
    setIsSandbox(sandbox);
  }
  setAuthUserName(basicAuthUsername);
  setAuthUserPassword(basicAuthPassword);
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
            defaultCategory={defaultCategory}
            createTemplateRoute={createTemplateRoute}
            templateBuilderRoute={templateBuilderRoute}
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
      console.log("react destroy");
      root.unmount();
    }
  }
};

// Example to run the project locally for development. Comment out these lines when building the application


const getAllTemplatesByTab = async (payload) => {
  try {
    const response = await fetch('https://api.openletterconnect.com/api/v1/templates/by-tab', {
      method: 'POST', // or 'GET', depending on your API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6InVzbWFuK2FkbWluQG9wZW5sZXR0ZXJjb25uZWN0LmNvbSIsImFwaUtleUlkIjoiNjIiLCJpYXQiOjE3MjEzOTQwMzMsImV4cCI6NDg3NzE1NDAzM30.Vb2vatO1UDtw6F8LfiuztLlNkMWPu1VIaRPNjLvg_Vs'      },
      body: JSON.stringify(payload) // include payload if needed
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON response
    return data.data;
  } catch (error) {
    return error.response;
  }
};

const getOneTemplate = async (id: number) => {
  try {
    const response = await fetch(`https://api.openletterconnect.com/api/v1/templates/${id}`, {
      method: 'GET', // or 'GET', depending on your API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6InVzbWFuK2FkbWluQG9wZW5sZXR0ZXJjb25uZWN0LmNvbSIsImFwaUtleUlkIjoiNjIiLCJpYXQiOjE3MjEzOTQwMzMsImV4cCI6NDg3NzE1NDAzM30.Vb2vatO1UDtw6F8LfiuztLlNkMWPu1VIaRPNjLvg_Vs'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON response
    return data.data;
  } catch (error) {
    return error.response;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log("React SDK Loaded");
  TemplateBuilder({
    container: rootElement,
    secretKey: import.meta.env.VITE_APP_PLOTNO_API_KEY,
    basicAuthUsername: import.meta.env.VITE_APP_BASIC_AUTH_USERNAME,
    basicAuthPassword: import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD,
    sandbox: false,
    // onGetOneTemplate: getOneTemplate,
    // olcTemplate: olcTemplateData,
    onGetTemplates: getAllTemplatesByTab,
    // onSubmit: createTemplate,
    styles: {}
  });
} else {
  console.error("Root element '#root' not found in the document.");
}

export default TemplateBuilder;
