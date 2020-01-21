import { GET_FORECAST } from '../actions/types';
import { handleActions } from 'redux-actions';

const defaultState = {};

const forecastReducer = handleActions(
  {
    [GET_FORECAST]: (state, { payload }) => {
      return { ...state, [payload.city.name]: { ...payload } };
    }
  },
  defaultState
);

export default forecastReducer;
