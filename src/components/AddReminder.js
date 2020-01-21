import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReminder } from '../actions/reminderActions';
import { getCities } from '../services/cities';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  DatePicker,
  TimePicker,
  AutoComplete,
  Form,
  Input,
  Tooltip,
  Icon,
  Button
} from 'antd';
import { CirclePicker } from 'react-color';

function AddReminder(props) {
  const [searchText, setSearchText] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [reminderColor, setReminderColor] = useState('');
  const { getFieldDecorator } = props.form;
  const cities = getCities();
  const dispatch = useDispatch();
  const { Option } = AutoComplete;

  const onCitySearch = searchText => {
    !searchText
      ? setSearchText([])
      : setCitiesData(
          cities.filter(city => city.name.toLowerCase().includes(searchText))
        );
  };

  const onColorChange = color => {
    setReminderColor(color.hex);
  };

  const handleAddConfirmation = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const { reminderTitle, cityName, reminderHour, reminderDate } = values;
      const formatedDate = reminderDate.format('MMM Do YY');
      const reminderTimeInSeconds = reminderHour.unix();
      const reminderId = new Date().getTime();

      console.log(values);

      if (!err) {
        const data = {
          reminderId,
          reminderTitle,
          cityName,
          reminderHour,
          reminderTimeInSeconds,
          reminderDate: formatedDate,
          wholeDateObject: reminderDate,
          reminderColor
        };
        dispatch(addReminder(data));
        props.setIsReminderModalVisible(false);
        clearAllInputs();
      }
    });
  };
  const clearAllInputs = () => {
    props.form.setFieldsValue({
      reminderTitle: '',
      cityName: '',
      reminderDate: moment(),
      reminderHour: moment()
    });
  };
  const options = citiesData.map(city => (
    <Option key={city.id} value={city.name}>
      {city.name}
    </Option>
  ));
  return (
    <div id="add-reminder" className="reminder-form">
      <Form onSubmit={handleAddConfirmation}>
        <Form.Item
          label={
            <span>
              Reminder title&nbsp;
              <Tooltip title="What do you want the reminder to be called?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('reminderTitle', {
            rules: [
              {
                required: true,
                message: 'Please input your reminder name.',
                whitespace: true
              },
              {
                max: 30,
                message: 'Only 30 characters are allowed.',
                whitespace: true
              }
            ]
          })(
            <Input
              placeholder="Reminder title"
              className="reminder-title reminder-input"
            />
          )}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Reminder date&nbsp;
              <Tooltip title="When do you want the reminder to be set?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('reminderDate', {
            rules: [
              {
                required: true,
                message: 'Please input your reminder date.'
              }
            ]
          })(<DatePicker className="reminder-date reminder-input" />)}
        </Form.Item>

        <Form.Item label={<span>Reminder time&nbsp;</span>}>
          {getFieldDecorator('reminderHour', {
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

        <Form.Item label={<span>City&nbsp;</span>}>
          {getFieldDecorator('cityName', {
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

        <div className="color-picker-container">
          <span className="color-label">Pick a color:</span>
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
          Create
        </Button>
      </Form>
    </div>
  );
}
export default Form.create({ name: 'create_reminder' })(AddReminder);

AddReminder.propTypes = {
  setIsReminderModalVisible: PropTypes.func
};

AddReminder.defaultProps = {
  setIsReminderModalVisible: () => {}
};
