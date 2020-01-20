import { combineReducers } from 'redux';
import { default as reminders } from './remindersReducer';
import { default as forecasts } from './forecastReducer';

export default combineReducers({ reminders, forecasts });
