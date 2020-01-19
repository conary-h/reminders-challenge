import { ADD_REMINDER } from '../actions/types';
import { handleActions } from 'redux-actions';

const defaultState = [];

const remindersReducer = handleActions(
  {
    [ADD_REMINDER]: (state, { payload }) => {
      const reminders = payload;
      return [...state, ...reminders];
    }
  },
  defaultState
);

export default remindersReducer;
