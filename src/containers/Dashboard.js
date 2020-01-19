import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import { Modal, Button } from 'antd';

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDayCell, setSelectedDayCell] = useState('');
  const [reminderTitle, setReminderTitle] = useState('');
  const [cityName, setCityName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [reminderColor, setReminderColor] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddConfirmation = e => {
    setIsModalVisible(false);
  };
  const handleCancel = e => {
    setIsModalVisible(false);
  };
  const onCalendarDateSelect = value => {
    showModal();
    setSelectedDayCell(value.date());
  };
  const onReminderTitleChange = e => {
    setReminderTitle(e.target.value);
  };
  const onDatePickerChange = (date, dateString) => {
    setDate(dateString);
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
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={showModal}>
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
        />
      </Modal>
    </div>
  );
}
