import {marineURI} from './uris'

export const getMarinesBySearchInput = async (searchInput) => {
    try {
      const response = await fetch(`${marineURI}/search/${searchInput}`);
      const responseMarine = await response.json();
      return responseMarine;
    } catch (err) {
      console.log(err);
    }
  };


  export const getAllMarines = async () => {
    try {
      const response = await fetch(`${marineURI}`);
      const responseMarines = await response.json();
      return responseMarines;
    } catch (err) {
      console.log(err);
    }
  };

