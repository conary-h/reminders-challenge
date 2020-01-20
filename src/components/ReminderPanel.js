import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReminderItem from './ReminderItem';
import { Modal } from 'antd';

export default function ReminderPanel(props) {
  const reminders = useSelector(state => state.reminders);
  const [isEditReminderVisible, setIsEditReminderVisible] = useState(false);

  const getRemindersForSpecificDate = reminders => {
    return reminders.filter(
      reminder => reminder.wholeDateObject.date() == props.selectedDay.date()
    );
  };
  const sortCurrentReminders = filteredReminderList => {
    return filteredReminderList.sort((a, b) => {
      return a.reminderTimeInSeconds - b.reminderTimeInSeconds;
    });
  };

  const generateReminderItems = (reminders = []) => {
    const filteredReminders = getRemindersForSpecificDate(reminders);
    const sortedReminders = sortCurrentReminders(filteredReminders);
    return filteredReminders.map((reminder, index) => (
      <ReminderItem
        key={index}
        reminderData={reminder}
        handleEditModalVisibility={setIsEditReminderVisible}
      />
    ));
  };

  return (
    <div id="reminder-panel">
      {reminders.length > 0 ? (
        <div className="reminder-list">{generateReminderItems(reminders)}</div>
      ) : (
        <strong>No reminders yet.</strong>
      )}
      <Modal
        title="Edit Reminder"
        visible={isEditReminderVisible}
        onCancel={() => setIsEditReminderVisible(false)}
        footer={null}
      ></Modal>
    </div>
  );
}

ReminderPanel.propTypes = {
  selectedDay: PropTypes.object
};

ReminderPanel.defaultProps = {
  selectedDay: {}
};
