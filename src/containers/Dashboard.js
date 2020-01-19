import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import { Modal, Button } from 'antd';

export default function Dashboard() {
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);

  const showCreateReminderModal = () => {
    setIsReminderModalVisible(true);
  };

  const closeNewReminderModal = e => {
    setIsReminderModalVisible(false);
  };

  return (
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={showCreateReminderModal}>
        Create Reminder
      </Button>
      <CalendarWrapper />
      <Modal
        title="New Reminder"
        visible={isReminderModalVisible}
        onCancel={closeNewReminderModal}
        footer={null}
      >
        <AddReminder setIsReminderModalVisible={setIsReminderModalVisible} />
      </Modal>
    </div>
  );
}
