import React, { useEffect } from 'react';
import { deleteReminder } from '../actions/reminderActions';
import { getForecast } from '../actions/forecastActions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tooltip, Icon, Tag, Popover, Button } from 'antd';

export default function ReminderItem(props) {
  const dispatch = useDispatch();
  const {
    reminderId,
    reminderTitle,
    cityName,
    reminderHour,
    reminderDate,
    reminderColor,
    wholeDateObject
  } = props.reminderData;
  let currentWeather = [];
  let weatherInfo = '';
  const pureCityName = cityName.split(',')[0];
  const currentForecast = useSelector(state => state.forecasts[pureCityName]);

  const unixDate = wholeDateObject
    .hour(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .unix();

  useEffect(() => {
    dispatch(getForecast(cityName));
  }, [dispatch, cityName]);

  const onDeleteClick = reminderId => {
    return () => {
      dispatch(deleteReminder(reminderId));
      props.handleEditModalVisibility(false);
    };
  };
  const onEditClick = () => {
    props.handleEditModalVisibility(true);
    props.getReminderToEdit(props.reminderData);
  };

  const getCurrentForeCastWeather = currentForecast => {
    return currentForecast.list.filter(forecast => forecast.dt === unixDate);
  };
  if (currentForecast) {
    currentWeather = getCurrentForeCastWeather(currentForecast);
    weatherInfo = currentWeather.length > 0 ? currentWeather[0].weather[0] : [];
  }
  const popOvercontent =
    currentWeather.length > 0 ? (
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`}
          alt={`${weatherInfo.description} icon`}
        />
        <p>{weatherInfo.description}</p>
      </div>
    ) : (
      <p>There is no weather info available for this date.</p>
    );

  return (
    <div className="reminder-item">
      <strong className="reminder-title item-element">{reminderTitle}</strong>
      <Tooltip title="City">
        <span className="reminder-city item-element">{cityName}</span>
      </Tooltip>

      <Tooltip title="Hour">
        <span className="reminder-hour item-element">
          {reminderHour.format('hh:mm a')}
        </span>
      </Tooltip>

      <Tooltip title="Date">
        <span className="reminder-date item-element">{reminderDate}</span>
      </Tooltip>

      <Tag color={reminderColor} className="item-element">
        Current Color
      </Tag>
      <Popover content={popOvercontent} title="Weather" trigger="hover">
        <Button type="dashed" className="item-element">
          Weather
        </Button>
      </Popover>
      <div className="actions-wrapper">
        <Tooltip title="Edit">
          <Icon type="edit" className="action-item" onClick={onEditClick} />
        </Tooltip>

        <Tooltip title="Delete">
          <Icon
            type="delete"
            className="action-item"
            onClick={onDeleteClick(reminderId)}
          />
        </Tooltip>
      </div>
    </div>
  );
}

ReminderItem.propTypes = {
  reminderData: PropTypes.object,
  handleEditModalVisibility: PropTypes.func,
  getReminderToEdit: PropTypes.func
};

ReminderItem.defaultProps = {
  reminderData: {},
  handleEditModalVisibility: () => {},
  getReminderToEdit: () => {}
};
