import { ADD_REMINDER, DELETE_REMINDER } from '../actions/types';
import { handleActions } from 'redux-actions';

const defaultState = [];

const remindersReducer = handleActions(
  {
    [ADD_REMINDER]: (state, { payload }) => {
      return [...state, payload];
    },
    [DELETE_REMINDER]: (state, { payload }) => {
      console.log(payload);

      return [...state.filter(reminder => reminder.reminderId !== payload)];
    }
  },
  defaultState
);

export default remindersReducer;
