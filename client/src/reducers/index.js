import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import listReducer from './listReducer';
import companyReducer from './companyReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  listings: listReducer,
  companies: companyReducer
});
