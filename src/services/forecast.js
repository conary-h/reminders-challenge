import axios from 'axios';

const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
const testingUrl =
  'https://samples.openweathermap.org/data/2.5/forecast/daily?id=3601782&appid=b1b15e88fa797225412429c1c50c122a1';

//openweathermap did not activate my key on time.
const APIKey = 'd0eaa34e4c1a47991eaf72d75bb4af45';

export const fetchForecast = async cityName => {
  const data = await axios.get(`${forecastUrl}?q=${cityName}&appid=${APIKey}`);

  return data;
  /* console.log(data);
  return data.data; */
};
