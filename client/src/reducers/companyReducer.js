import _ from 'lodash';
import {
  FETCH_COMPANY,
  FETCH_COMPANIES,
  CREATE_COMPANY,
  EDIT_COMPANY,
  DELETE_COMPANY
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMPANIES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_COMPANY:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMPANY:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMPANY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMPANY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
