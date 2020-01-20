import React, { useEffect } from 'react';
import { deleteReminder } from '../actions/reminderActions';
import { getForecast } from '../actions/forecastActions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tooltip, Icon, Tag } from 'antd';

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
  const currentForecast = useSelector(state => state.forecasts[cityName]);

  console.log(currentForecast);

  useEffect(() => {
    console.log(wholeDateObject.unix());
    dispatch(getForecast());
  }, []);

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
  return (
    <div className="reminder-item">
      <h1>
        {currentForecast ? currentForecast.list[0].weather[0].description : ''}
      </h1>
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
