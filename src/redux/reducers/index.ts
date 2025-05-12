import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { customFieldReducer } from './customFieldReducer';
import { snackbarReducers } from './snackbarReducer';
import { customQRCodeReducer } from './customQRCodeReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
  customFields: customFieldReducer,
  snackbarReducers,
  customQRCode: customQRCodeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
