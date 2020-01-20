import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ReminderItem from './ReminderItem';
import EditReminder from './EditReminder';
import { Modal } from 'antd';

export default function ReminderPanel(props) {
  const dispatch = useDispatch();
  const reminders = useSelector(state => state.reminders);
  const [isEditReminderVisible, setIsEditReminderVisible] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState({});
  const currentReminderIdList = [];
  let filteredReminders = [];
  let sortedReminders = [];

  const getRemindersForSpecificDate = (reminders = []) => {
    return reminders.filter(reminder => {
      currentReminderIdList.push(reminder.reminderId);
      return reminder.wholeDateObject.date() == props.selectedDay.date();
    });
  };
  const sortCurrentReminders = filteredReminderList => {
    return filteredReminderList.sort((a, b) => {
      return a.reminderTimeInSeconds - b.reminderTimeInSeconds;
    });
  };

  if (reminders.length > 0) {
    filteredReminders = getRemindersForSpecificDate(reminders);
    sortedReminders = sortCurrentReminders(filteredReminders);
  }
  const generateReminderItems = (reminders = []) => {
    return sortedReminders.map((reminder, index) => (
      <ReminderItem
        key={index}
        reminderData={reminder}
        handleEditModalVisibility={setIsEditReminderVisible}
        getReminderToEdit={getReminderToEdit}
      />
    ));
  };
  const getReminderToEdit = reminderData => {
    setReminderToEdit(reminderData);
  };

  return (
    <div id="reminder-panel">
      {filteredReminders.length > 0 ? (
        <div className="reminder-list">
          {generateReminderItems(sortedReminders)}
        </div>
      ) : (
        <strong>No reminders yet.</strong>
      )}
      <Modal
        title="Edit Reminder"
        visible={isEditReminderVisible}
        onCancel={() => setIsEditReminderVisible(false)}
        footer={null}
      >
        <EditReminder
          reminderToEdit={reminderToEdit}
          setIsEditReminderVisible={setIsEditReminderVisible}
        />
      </Modal>
    </div>
  );
}

ReminderPanel.propTypes = {
  selectedDay: PropTypes.object
};

ReminderPanel.defaultProps = {
  selectedDay: {}
};
