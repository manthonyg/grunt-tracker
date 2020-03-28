import { squadURI } from "./uris";

//------------------
// Helper function
//------------------
const handleErr = err => {
  console.log(err);
  return err;
};

//-------------------
//
//-------------------

export const createSquad = async data => {
  const settings = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${squadURI}/`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    handleErr(err);
  }
};

export const addMarineToSquad = async (id, data) => {
  const settings = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${squadURI}/${id}/teams/add`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    handleErr(err);
  }
};

export const addExistingMarine = async (id, data) => {
  const settings = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(
      `${squadURI}/${id}/addExistingMarine`,
      settings
    );
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    handleErr(err);
  }
};

export const getAllMarinesInSquad = async id => {
  try {
    const response = await fetch(`${squadURI}/${id}/marines`);
    const responseMarines = await response.json();
    return responseMarines;
  } catch (err) {
    handleErr(err);
  }
};

export const updateSquadById = async (id, data) => {
  const settings = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json/",
      "Content-Type": "application/json"
    }
  };
  try {
    const fetchRes = await fetch(`${squadURI}/${id}/teams/`, settings);
    const fetchData = await fetchRes.json();
    return fetchData;
  } catch (err) {
    handleErr(err);
  }
};

export const getAllSquads = async () => {
  try {
    const response = await fetch(`${squadURI}/`);
    const responseSquads = await response.json();
    return responseSquads;
  } catch (err) {
    handleErr(err);
  }
};

export const getSquadById = async id => {
  try {
    const response = await fetch(`${squadURI}/${id}`);
    const responseSquad = await response.json();
    return responseSquad;
  } catch (err) {
    handleErr(err);
  }
};

export const getSquadsTeamsById = async id => {
  try {
    const response = await fetch(`${squadURI}/${id}/teams`);
    const responseTeams = await response.json();
    return responseTeams;
  } catch (err) {
    handleErr(err);
  }
};

export const getMarineById = async id => {
  try {
    const response = await fetch(`${squadURI}/showMarine/${id}`);
    const responseMarine = await response.json();
    return responseMarine;
  } catch (err) {
    handleErr(err);
  }
};

export const deleteSquadById = async id => {
  const settings = {
    method: "DELETE"
  };

  try {
    const response = await fetch(`${squadURI}/${id}`, settings);
    const responseSquad = await response.json();
    return responseSquad;
  } catch (err) {
    handleErr(err);
  }
};
