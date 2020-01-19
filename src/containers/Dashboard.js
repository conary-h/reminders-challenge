import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import AddReminder from '../components/AddReminder';
import { Modal, Button } from 'antd';

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleAddConfirmation = e => {
    setIsModalVisible(false);
  };

  const handleCancel = e => {
    setIsModalVisible(false);
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      <Button type="primary" onClick={showModal}>
        Create Reminder
      </Button>
      <CalendarWrapper showModal={showModal} />
      <Modal
        title="New Reminder"
        visible={isModalVisible}
        onOk={handleAddConfirmation}
        onCancel={handleCancel}
      >
        <AddReminder />
      </Modal>
    </div>
  );
}
