import axios from 'axios';

const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';

const testingUrl =
  'https://samples.openweathermap.org/data/2.5/forecast/daily?id=3601782&appid=b1b15e88fa797225412429c1c50c122a1';

//openweathermap did not activate my key on time.
const borrowedAPIKey = '34144a1d42f51abe5d962ecbccc72a09';

const mockData = {
  cod: 200,
  message: 0,
  city: {
    geoname_id: 524901,
    name: 'Moscow',
    lat: 55.7522,
    lon: 37.6156,
    country: 'RU',
    iso2: 'RU',
    type: 'city',
    population: 0
  },
  cnt: 7,
  list: [
    {
      dt: 1485766800,
      temp: {
        day: 262.65,
        min: 261.41,
        max: 262.65,
        night: 261.41,
        eve: 262.65,
        morn: 262.65
      },
      pressure: 1024.53,
      humidity: 76,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'sky is clear',
          icon: '01d'
        }
      ],
      speed: 4.57,
      deg: 225,
      clouds: 0,
      snow: 0.01
    }
  ]
};

export const fetchForecast = async cityName => {
  const data = await axios.get(
    `${forecastUrl}?q=${cityName}&appid=${borrowedAPIKey}`
  );

  return data;
  /* console.log(data);
  return data.data; */
};
