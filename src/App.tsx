import React, {useState, useEffect} from 'react';

// Libraries/Packages
import {Routes, Route} from 'react-router-dom';
import {createStore, StoreType} from 'polotno/model/store';

// components
import CreateTemplate from './components/CreateTemplate';
import TemplateBuilder from './components/TemplateBuilder';
import {createGlobalStyle} from 'styled-components';
import GenericSnackbar from './components/GenericUIBlocks/GenericSnackbar/Toast';

// Initialize Plotno Store
const initializeStore = (secretKey: string) => {
  return createStore({
    key: secretKey,
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: false,
  });
};

interface AppProps {
  secretKey: string;
  platformName?: string | null;
  templateGalleryModal?: boolean;
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
  olcTemplate?: Record<string, any>;
  allowSenderFields?: boolean;
  excludedFields?: string[] | null;
  allowPropertyFields?: boolean;
  styles?: any;
  onReturnAndNavigate?: () => void;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
}

const App: React.FC<AppProps> = ({
  secretKey,
  platformName,
  templateGalleryModal,
  createTemplateRoute,
  templateBuilderRoute,
  olcTemplate,
  allowSenderFields,
  excludedFields,
  allowPropertyFields,
  styles,
  onReturnAndNavigate,
  onGetOneTemplate,
  onGetCustomFields,
  onGetTemplates,
  onSubmit,
}) => {
  const [store, setStore] = useState<StoreType>(initializeStore(secretKey));

  const currentPath = window?.location?.pathname;

  useEffect(() => {
    if (
      currentPath === createTemplateRoute ||
      currentPath === '/create-template'
    ) {
      const newStore = initializeStore(secretKey);
      setStore(newStore);
    }
  }, [currentPath]);

  const GlobalStyle =
    styles && Object.keys(styles).length
      ? createGlobalStyle`
        :root {
        ${
          styles
            ? Object.entries(styles.root)
                .map(([key, value]) => `${key}: ${value};`)
                .join(' ')
            : ''
        }
          }
        `
      : createGlobalStyle`<></>`;

  return (
    <div className="builder-wrapper">
      <GenericSnackbar/>
      <GlobalStyle />
      <Routes>
        <Route
          path={createTemplateRoute || '/create-template'}
          element={
            <CreateTemplate
              createTemplateRoute={createTemplateRoute}
              templateBuilderRoute={templateBuilderRoute}
              onReturnAndNavigate={onReturnAndNavigate}
            />
          }
        />
        <Route
          path={templateBuilderRoute || '/template-builder/:id?'}
          element={
            <TemplateBuilder
              store={store}
              olcTemplate={olcTemplate}
              platformName={platformName}
              templateGalleryModal={templateGalleryModal}
              allowSenderFields={allowSenderFields}
              excludedFields={excludedFields}
              allowPropertyFields={allowPropertyFields}
              createTemplateRoute={createTemplateRoute}
              onReturnAndNavigate={onReturnAndNavigate}
              onGetOneTemplate={onGetOneTemplate}
              onGetTemplates={onGetTemplates}
              onGetCustomFields={onGetCustomFields}
              onSubmit={onSubmit}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
