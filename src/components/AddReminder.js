import React, { useState } from 'react';
import { DatePicker, TimePicker, AutoComplete, Input } from 'antd';
import { CirclePicker } from 'react-color';

export default function AddReminder() {
  const [searchText, setSearchText] = useState('');
  const [cityName, setCityName] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [reminderColor, setReminderColor] = useState('');

  const onDatePickerChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onTimeChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const onCitySelect = value => {
    console.log('onSelect', value);
  };
  const onCityChange = value => {
    setCityName(value);
  };
  const onCitySearch = searchText => {
    !searchText
      ? setSearchText([])
      : setCitiesData([searchText, searchText.repeat(2), searchText.repeat(3)]);
  };
  const handleColorChange = color => {
    setReminderColor(color.hex);
  };
  return (
    <div id="add-reminder">
      <Input
        placeholder="Reminder title"
        maxLength={30}
        className="reminder-title reminder-input"
      />
      <DatePicker
        onChange={onDatePickerChange}
        className="reminder-date reminder-input"
      />
      <TimePicker
        use12Hours
        format="h:mm:ss A"
        onChange={onTimeChange}
        className="reminder-time reminder-input"
      />
      <AutoComplete
        value={cityName}
        dataSource={citiesData}
        className="reminder-input"
        onSelect={onCitySelect}
        onSearch={onCitySearch}
        onChange={onCityChange}
        placeholder="Type city name"
      />
      <div className="color-picker-container">
        <span className="color-label">Pick a color:</span>
        <CirclePicker
          onChange={handleColorChange}
          colors={[
            '#D9E3F0',
            '#F47373',
            '#697689',
            '#37D67A',
            '#2CCCE4',
            '#555555',
            '#dce775',
            '#ff8a65',
            '#ba68c8'
          ]}
        />
      </div>
    </div>
  );
}
