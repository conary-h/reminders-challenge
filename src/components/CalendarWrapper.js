import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Calendar, Badge } from 'antd';

export default function CalendarWrapper(props) {
  const reminders = useSelector(state => state.reminders);
  const getListData = value => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' }
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' }
        ];
        break;
      default:
    }
    return listData || [];
  };
  const setCurrentReminders = currentDate => {
    return reminders.filter(
      reminder => reminder.date === currentDate.format('MMM Do YY')
    );
  };
  const dateCellRender = value => {
    const listData = setCurrentReminders(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge color={item.reminderColor} text={item.reminderTitle} />
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
        onSelect={props.onCalendarDateSelect}
      />
    </div>
  );
}
CalendarWrapper.propTypes = {
  showModal: PropTypes.func
};

CalendarWrapper.defaultProps = {
  showModal: () => {}
};
