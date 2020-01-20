import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import ReminderPanel from '../components/ReminderPanel';
import { Modal, Button } from 'antd';

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
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={onCreateReminderClick}>
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
          <AddReminder setIsReminderModalVisible={setIsReminderModalVisible} />
        )}
      </Modal>
    </div>
  );
}
