import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import ReminderPanel from '../components/ReminderPanel';
import { Modal, Button, Icon } from 'antd';

export default function Dashboard() {
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [isSummaryShowing, setIsSummaryShowing] = useState(false);

  const onDaySelection = value => {
    setIsSummaryShowing(true);
    setSelectedDay(value);
    setIsReminderModalVisible(true);
  };
  const onCreateReminderClick = () => {
    setIsSummaryShowing(false);
    setIsReminderModalVisible(true);
  };

  return (
    <div id="dashboard">
      <div className="container">
        <h1 className="main-title">
          <Icon type="calendar" className="calendar-icon" theme="twoTone" />
          Calendar
        </h1>
        <Button
          type="primary"
          className="create-btn"
          onClick={onCreateReminderClick}
        >
          <Icon type="plus" />
          Create Reminder
        </Button>
        <CalendarWrapper onDaySelection={onDaySelection} />
        <Modal
          title={
            isSummaryShowing
              ? `Reminders for: ${selectedDay.format('MMMM Do YYYY')}`
              : 'New Reminder'
          }
          visible={isReminderModalVisible}
          onCancel={() => setIsReminderModalVisible(false)}
          footer={null}
        >
          {isSummaryShowing ? (
            <ReminderPanel selectedDay={selectedDay} />
          ) : (
            <AddReminder
              setIsReminderModalVisible={setIsReminderModalVisible}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
