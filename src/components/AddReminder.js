import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReminder } from '../actions/reminderActions';
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
  const dispatch = useDispatch();

  const onCitySearch = searchText => {
    !searchText
      ? setSearchText([])
      : setCitiesData([searchText, searchText.repeat(2), searchText.repeat(3)]);
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

      if (!err) {
        const data = {
          // selectedDayCell,
          reminderTitle,
          cityName,
          reminderHour,
          reminderTimeInSeconds,
          reminderDate: formatedDate,
          reminderColor
        };
        console.log('Received values of form: ', values);
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
  return (
    <div id="add-reminder">
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
              dataSource={citiesData}
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
