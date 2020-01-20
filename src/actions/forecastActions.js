import { fetchForecast } from '../services/forecast';
import { createAction } from 'redux-actions';
import {
  GET_FORECAST,
  GET_FORECAST_STARTED,
  GET_FORECAST_FAILURE
} from './types';

export const getForecastAction = createAction(GET_FORECAST);
export const getForecastStartedAction = createAction(GET_FORECAST_STARTED);
export const getForecastFailureAction = createAction(GET_FORECAST_FAILURE);

export const getForecast = payload => {
  return async dispatch => {
    dispatch(getForecastStartedAction());

    try {
      const forecast = await fetchForecast();
      dispatch(getForecastAction(forecast));
    } catch (error) {
      console.log(error);
      dispatch(getForecastFailureAction(error));
    }
  };
};
