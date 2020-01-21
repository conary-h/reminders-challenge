import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Badge } from 'antd';
import { defaultBadgeColor } from '../constants';

export default function CalendarWrapper(props) {
  const reminders = useSelector(state => state.reminders);

  const setCurrentReminders = (reminders, currentDate) => {
    return reminders.filter(
      reminder => reminder.reminderDate === currentDate.format('MMM Do YY')
    );
  };
  const sortCurrentReminders = filteredReminderList => {
    return filteredReminderList.sort((a, b) => {
      return a.reminderTimeInSeconds - b.reminderTimeInSeconds;
    });
  };
  const onReminderClick = e => {
    console.log(e.target);
  };

  const dateCellRender = value => {
    const filteredReminderList = setCurrentReminders(reminders, value);
    const listData = sortCurrentReminders(filteredReminderList);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              color={item.reminderColor || defaultBadgeColor}
              text={item.reminderTitle}
              onClick={onReminderClick}
            />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = value => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={props.onDaySelection}
      />
    </div>
  );
}
