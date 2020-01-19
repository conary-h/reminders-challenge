import {
  ADD_REMINDER,
  ADD_REMINDER_STARTED,
  ADD_REMINDER_FAILURE
} from './types';
// import { getCategories } from '../services/categories';
import { createAction } from 'redux-actions';

export const addReminderAction = createAction(ADD_REMINDER);
export const addReminderStartedAction = createAction(ADD_REMINDER_STARTED);
export const addReminderFailureAction = createAction(ADD_REMINDER_FAILURE);

export const addReminder = () => {
  return dispatch => {
    dispatch(addReminderStartedAction());

    try {
      dispatch(addReminderAction());
    } catch (error) {
      dispatch(addReminderFailureAction(error));
    }
  };
};
