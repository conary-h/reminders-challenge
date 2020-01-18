import React, { useState } from 'react';
import CalendarWrapper from '../components/CalendarWrapper';
import { Modal, Button } from 'antd';

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = e => {
    setIsModalVisible(false);
  };

  const handleCancel = e => {
    setIsModalVisible(false);
  };
  return (
    <div className="container">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <CalendarWrapper />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
