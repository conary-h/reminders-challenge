import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [dateWholeObject, setDateWholeObject] = useState('');
  const [reminderColor, setReminderColor] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onClickReminderBtn = () => {
    showModal();
  };
  const handleAddConfirmation = e => {
    const data = {
      selectedDayCell,
      reminderTitle,
      cityName,
      time,
      date,
      reminderColor
    };
    console.log(data);
    dispatch(addReminder(data));

    setIsModalVisible(false);
  };
  const handleCancel = e => {
    setIsModalVisible(false);
  };
  const onCalendarDateSelect = value => {
    showModal();
    onDatePickerChange(value);
    setSelectedDayCell(value.date());
  };
  const onReminderTitleChange = e => {
    setReminderTitle(e.target.value);
  };
  const onDatePickerChange = date => {
    const formatedDate = date.format('MMM Do YY');
    setDateWholeObject(date);
    setDate(formatedDate);
  };
  const onTimeChange = (time, timeString) => {
    setTime(timeString);
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
    setDate('');
    setTime('');
    setReminderColor('');
    setDateWholeObject('');
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={onClickReminderBtn}>
        Create Reminder
      </Button>
      <CalendarWrapper
        showModal={showModal}
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
