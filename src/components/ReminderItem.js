import React from 'react';
import { deleteReminder } from '../actions/reminderActions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DatePicker,
  TimePicker,
  AutoComplete,
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Tag,
  Modal
} from 'antd';

export default function ReminderItem(props) {
  const dispatch = useDispatch();
  const {
    reminderId,
    reminderTitle,
    cityName,
    reminderHour,
    reminderDate,
    reminderColor
  } = props.reminderData;

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
