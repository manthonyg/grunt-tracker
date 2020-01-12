import { marineURI } from "./uris";

export const getMarinesBySearchInput = async searchInput => {
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

export const updateMarineById = async (id, data) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(`${marineURI}/${id}/update`, settings);
    const responseMarines = await response.json();
    return responseMarines;
  } catch (err) {
    console.log(err);
  }
};
