import listings from '../apis/listings';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_LISTING,
  FETCH_LISTINGS,
  FETCH_LISTING,
  DELETE_LISTING,
  EDIT_LISTING,
  CREATE_COMPANY,
  FETCH_COMPANIES,
  FETCH_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createListing = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await listings.post('/listings', { ...formValues, userId });

  dispatch({ type: CREATE_LISTING, payload: response.data });
  history.push('/');
};

export const fetchListings = () => async dispatch => {
  const response = await listings.get('/listings');

  dispatch({ type: FETCH_LISTINGS, payload: response.data });
};

export const fetchListing = id => async dispatch => {
  const response = await listings.get(`/listings/${id}`);

  dispatch({ type: FETCH_LISTING, payload: response.data });
};

export const editListing = (id, formValues) => async dispatch => {
  const response = await listings.patch(`/listings/${id}`, formValues);

  dispatch({ type: EDIT_LISTING, payload: response.data });
  history.push('/');
};

export const deleteListing = id => async dispatch => {
  await listings.delete(`/listings/${id}`);

  dispatch({ type: DELETE_LISTING, payload: id });
  history.push('/');
};
/////////////////////////////////////////////////////////

export const createCompany = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await listings.post('/companies', { ...formValues, userId });

  dispatch({ type: CREATE_COMPANY, payload: response.data });
  history.push('/');
};

export const fetchCompanies = () => async dispatch => {
  const response = await listings.get('/companies');

  dispatch({ type: FETCH_COMPANIES, payload: response.data });
};

export const fetchCompany = id => async dispatch => {
  const response = await listings.get(`/companies/${id}`);

  dispatch({ type: FETCH_COMPANY, payload: response.data });
};

export const editCompany = (id, formValues) => async dispatch => {
  const response = await listings.patch(`/companies/${id}`, formValues);

  dispatch({ type: EDIT_COMPANY, payload: response.data });
  history.push('/');
};

export const deleteCompany = id => async dispatch => {
  await listings.delete(`/companies/${id}`);

  dispatch({ type: DELETE_COMPANY, payload: id });
  history.push('/');
};


