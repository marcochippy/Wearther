import axios from 'axios';

export const getHourly = async () => {
  try {
    const response = await axios.get('https://api.marcoczirpek.com/hourly');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
