import {
  ADD_REMINDER,
  DELETE_REMINDER,
  EDIT_REMINDER,
  DELETE_ALL_REMINDERS
} from '../actions/types';
import { handleActions } from 'redux-actions';

const defaultState = [];

const remindersReducer = handleActions(
  {
    [ADD_REMINDER]: (state, { payload }) => {
      return [...state, payload];
    },
    [DELETE_REMINDER]: (state, { payload }) => {
      return [...state.filter(reminder => reminder.reminderId !== payload)];
    },
    [DELETE_ALL_REMINDERS]: (state, { payload }) => {
      return [...state.filter(reminder => reminder.reminderDate !== payload)];
    },
    [EDIT_REMINDER]: (state, { payload }) => {
      return state.map(reminder => {
        if (reminder.reminderId === payload.reminderId) {
          return {
            ...payload
          };
        }
        return reminder;
      });
    }
  },
  defaultState
);

export default remindersReducer;
