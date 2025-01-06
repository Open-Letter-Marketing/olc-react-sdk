import { combineReducers } from 'redux';
import { templateReducer } from './templateReducer';
import { customFieldReducer } from './customFieldReducer';
import { snackbarReducers } from './snackbarReducer';
import {hireDesignerReducer} from './hireDesignerReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
  hireDesigner: hireDesignerReducer,
  customFields: customFieldReducer,
  snackbarReducers,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
