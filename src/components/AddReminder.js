import React from 'react';
import { DatePicker, TimePicker } from 'antd';

export default function AddReminder() {
  const onDatePickerChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onTimeChange = (time, timeString) => {
    console.log(time, timeString);
  };
  return (
    <div>
      <DatePicker onChange={onDatePickerChange} />
      <TimePicker use12Hours format="h:mm:ss A" onChange={onTimeChange} />
    </div>
  );
}
