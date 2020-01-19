import { ADD_REMINDER } from '../actions/types';
import { handleActions } from 'redux-actions';

const defaultState = [];

const remindersReducer = handleActions(
  {
    [ADD_REMINDER]: (state, { payload }) => {
      return [...state, payload];
    }
  },
  defaultState
);

export default remindersReducer;
