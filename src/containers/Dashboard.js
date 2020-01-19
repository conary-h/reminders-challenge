import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import { Modal, Button } from 'antd';
import { addReminder } from '../actions/reminderActions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDayCell, setSelectedDayCell] = useState('');
  const [reminderTitle, setReminderTitle] = useState('');
  const [cityName, setCityName] = useState('');
  const [reminderHour, setReminderHour] = useState('');
  const [reminderdate, setReminderdate] = useState('');
  const [dateWholeObject, setDateWholeObject] = useState('');
  const [reminderColor, setReminderColor] = useState('');
  const [reminderTimeInSeconds, setReminderTimeInSeconds] = useState('');

  useEffect(() => {
    const today = moment();
    onDatePickerChange(today);
    setSelectedDayCell(today.date());
  }, []);

  const showCreateReminderModal = () => {
    setIsModalVisible(true);
  };

  const handleAddConfirmation = e => {
    const data = {
      selectedDayCell,
      reminderTitle,
      cityName,
      reminderHour,
      reminderTimeInSeconds,
      reminderdate,
      reminderColor
    };
    dispatch(addReminder(data));

    setIsModalVisible(false);
  };
  const handleCancel = e => {
    setIsModalVisible(false);
  };
  const onCalendarDateSelect = value => {
    console.log(value);
    // showCreateReminderModal();
    onDatePickerChange(value);
    setSelectedDayCell(value.date());
  };
  const onReminderTitleChange = e => {
    setReminderTitle(e.target.value);
  };
  const onDatePickerChange = date => {
    const formatedDate = date.format('MMM Do YY');
    setDateWholeObject(date);
    setReminderdate(formatedDate);
  };
  const onTimeChange = (time, timeString) => {
    setReminderHour(timeString);
    setReminderTimeInSeconds(time.unix());
  };
  const onCityChange = value => {
    setCityName(value);
  };
  const onColorChange = color => {
    setReminderColor(color.hex);
  };
  const clearAllInputs = () => {
    setReminderTitle('');
    setCityName('');
    setReminderColor('');
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={showCreateReminderModal}>
        Create Reminder
      </Button>
      <CalendarWrapper
        showCreateReminderModal={showCreateReminderModal}
        onCalendarDateSelect={onCalendarDateSelect}
      />
      <Modal
        title="New Reminder"
        visible={isModalVisible}
        onOk={handleAddConfirmation}
        onCancel={handleCancel}
        afterClose={clearAllInputs}
      >
        <AddReminder
          onDatePickerChange={onDatePickerChange}
          onTimeChange={onTimeChange}
          onCityChange={onCityChange}
          onColorChange={onColorChange}
          onReminderTitleChange={onReminderTitleChange}
          cityName={cityName}
          reminderTitle={reminderTitle}
          currentDateSelected={dateWholeObject}
        />
      </Modal>
    </div>
  );
}
