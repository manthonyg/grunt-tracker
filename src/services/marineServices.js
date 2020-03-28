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

export const getMarineById = async id => {
  try {
    const response = await fetch(`${marineURI}/${id}`);
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
    const fetchRes = await fetch(`${marineURI}/${id}/update`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    console.log(err);
  }
};

export const updateBillet = async (id, data) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${marineURI}/${id}/updateBillet/`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    return err;
  }
};

export const deleteMarineById = async (marineId, squadId) => {
  const settings = {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": true
    }
  };

  const response = await fetch(`${marineURI}/${marineId}/${squadId}`, settings);
  const responseSquad = await response.json();
  return responseSquad;
};

export const createAppointment = async (id, data) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${marineURI}/${id}/appointments`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    return err;
  }
};

export const createPFT = async (id, data) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${marineURI}/${id}/body/pft`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    return err;
  }
};

export const createCFT = async (id, data) => {
  const settings = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${marineURI}/${id}/body/cft`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    return err;
  }
};
