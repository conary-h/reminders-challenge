import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, AutoComplete, Input } from 'antd';
import { CirclePicker } from 'react-color';

export default function AddReminder(props) {
  const [searchText, setSearchText] = useState('');
  const [citiesData, setCitiesData] = useState([]);

  const onCitySearch = searchText => {
    !searchText
      ? setSearchText([])
      : setCitiesData([searchText, searchText.repeat(2), searchText.repeat(3)]);
  };
  return (
    <div id="add-reminder">
      <Input
        value={props.reminderTitle}
        onChange={props.onReminderTitleChange}
        placeholder="Reminder title"
        maxLength={30}
        className="reminder-title reminder-input"
      />
      <DatePicker
        onChange={props.onDatePickerChange}
        className="reminder-date reminder-input"
      />
      <TimePicker
        use12Hours
        format="h:mm:ss A"
        onChange={props.onTimeChange}
        className="reminder-time reminder-input"
      />
      <AutoComplete
        value={props.cityName}
        dataSource={citiesData}
        className="reminder-input"
        onSearch={onCitySearch}
        onChange={props.onCityChange}
        placeholder="Type city name"
      />
      <div className="color-picker-container">
        <span className="color-label">Pick a color:</span>
        <CirclePicker
          onChange={props.onColorChange}
          colors={[
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

AddReminder.propTypes = {
  onDatePickerChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  onCityChange: PropTypes.func,
  onColorChange: PropTypes.func,
  cityName: PropTypes.string,
  reminderTitle: PropTypes.string
};

AddReminder.defaultProps = {
  onDatePickerChange: () => {},
  onTimeChange: () => {},
  onCityChange: () => {},
  onColorChange: () => {},
  cityName: '',
  reminderTitle: ''
};
