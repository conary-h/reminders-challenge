import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editReminder } from '../actions/reminderActions';
import { getCities } from '../services/cities';
import {
  DatePicker,
  TimePicker,
  AutoComplete,
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Tag
} from 'antd';
import { CirclePicker } from 'react-color';

function EditReminder(props) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [newColor, setNewColor] = useState('');
  const { getFieldDecorator } = props.form;
  const cities = getCities();
  const { Option } = AutoComplete;
  const {
    reminderTitle,
    cityName,
    reminderHour,
    reminderColor,
    wholeDateObject
  } = props.reminderToEdit;

  const onCitySearch = searchText => {
    !searchText
      ? setSearchText([])
      : setCitiesData(
          cities.filter(city => city.name.toLowerCase().includes(searchText))
        );
  };
  const onColorChange = color => {
    setNewColor(color.hex);
  };
  const handleEditConfirmation = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const { reminderTitle, cityName, reminderHour, reminderDate } = values;
      const { reminderId, reminderColor } = props.reminderToEdit;
      const formatedDate = reminderDate.format('MMM Do YY');
      const reminderTimeInSeconds = reminderHour.unix();

      if (!err) {
        const data = {
          reminderId,
          reminderTitle,
          cityName,
          reminderHour,
          reminderTimeInSeconds,
          reminderDate: formatedDate,
          wholeDateObject: reminderDate,
          reminderColor: newColor || reminderColor
        };
        dispatch(editReminder(data));
        setNewColor('');
        props.setIsEditReminderVisible(false);
      }
    });
  };
  const options = citiesData.map(city => (
    <Option key={city.id} value={city.name}>
      {city.name}
    </Option>
  ));
  return (
    <div id="edit-reminder" className="reminder-form">
      <Form onSubmit={handleEditConfirmation}>
        <Form.Item>
          {getFieldDecorator('reminderTitle', {
            initialValue: reminderTitle,
            rules: [
              {
                required: true,
                message: 'Please input your reminder name.',
                whitespace: true
              }
            ]
          })(
            <Input
              placeholder="Reminder title"
              maxLength={30}
              className="reminder-title reminder-input"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('cityName', {
            initialValue: cityName,
            rules: [
              {
                required: true,
                message: 'Please select a city for your reminder.'
              }
            ]
          })(
            <AutoComplete
              dataSource={options}
              className="reminder-input"
              onSearch={onCitySearch}
              placeholder="Type city name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('reminderDate', {
            initialValue: wholeDateObject,
            rules: [
              {
                required: true,
                message: 'Please input your reminder date.'
              }
            ]
          })(<DatePicker className="reminder-date reminder-input" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('reminderHour', {
            initialValue: reminderHour,
            rules: [
              {
                required: true,
                message: 'Please input your reminder time.'
              }
            ]
          })(
            <TimePicker
              use12Hours
              format="h:mm:ss A"
              className="reminder-time reminder-input"
            />
          )}
        </Form.Item>

        <div className="reminder-input">
          <Tag color={reminderColor} className="item-element">
            Current Color
          </Tag>
          <Tag color={newColor} className="item-element">
            New Color
          </Tag>
        </div>

        <div className="color-picker-container">
          <CirclePicker
            onChange={onColorChange}
            colors={[
              '#F47373',
              '#697689',
              '#37D67A',
              '#2CCCE4',
              '#555555',
              '#dce775',
              '#ff8a65',
              '#ba68c8'
            ]}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="add-reminder-button uppercase"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}

export default Form.create({ name: 'edit_reminder' })(EditReminder);

EditReminder.propTypes = {
  reminderToEdit: PropTypes.object,
  setIsEditReminderVisible: PropTypes.func
};

EditReminder.defaultProps = {
  reminderToEdit: {},
  setIsEditReminderVisible: () => {}
};
