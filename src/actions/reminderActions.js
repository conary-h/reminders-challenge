import {
  ADD_REMINDER,
  ADD_REMINDER_STARTED,
  ADD_REMINDER_FAILURE,
  DELETE_REMINDER,
  DELETE_REMINDER_STARTED,
  DELETE_REMINDER_FAILURE,
  EDIT_REMINDER,
  EDIT_REMINDER_STARTED,
  EDIT_REMINDER_FAILURE
} from './types';

import { createAction } from 'redux-actions';

export const addReminderAction = createAction(ADD_REMINDER);
export const addReminderStartedAction = createAction(ADD_REMINDER_STARTED);
export const addReminderFailureAction = createAction(ADD_REMINDER_FAILURE);

export const editReminderAction = createAction(EDIT_REMINDER);
export const editReminderStartedAction = createAction(EDIT_REMINDER_STARTED);
export const editReminderFailureAction = createAction(EDIT_REMINDER_FAILURE);

export const deleteReminderAction = createAction(DELETE_REMINDER);
export const deleteReminderStartedAction = createAction(
  DELETE_REMINDER_STARTED
);
export const deleteReminderFailureAction = createAction(
  DELETE_REMINDER_FAILURE
);

export const addReminder = payload => {
  return dispatch => {
    dispatch(addReminderStartedAction());

    try {
      dispatch(addReminderAction(payload));
    } catch (error) {
      console.error(error);
      dispatch(addReminderFailureAction(error));
    }
  };
};
export const editReminder = payload => {
  return dispatch => {
    dispatch(editReminderStartedAction());

    try {
      dispatch(editReminderAction(payload));
    } catch (error) {
      console.error(error);
      dispatch(editReminderFailureAction(error));
    }
  };
};

export const deleteReminder = payload => {
  return dispatch => {
    dispatch(deleteReminderStartedAction());

    try {
      dispatch(deleteReminderAction(payload));
    } catch (error) {
      console.error(error);
      dispatch(deleteReminderFailureAction(error));
    }
  };
};
