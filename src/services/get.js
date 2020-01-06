

export const getAllSquads = async () => {
  try {
    const response = await fetch(`http://localhost:8082/api/squads/`);
    const responseSquads = await response.json();
    return responseSquads;
  } catch (err) {
    console.log(err);
  }
};

export const getSquadById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/squads/${id}`);
    const responseSquad = await response.json();
    return responseSquad;
  } catch (err) {
    console.log(err);
  }
};

export const getTeamsById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/squads/${id}/teams`);
    const responseTeams = await response.json();
    return responseTeams;
  } catch (err) {
    console.log(err);
  }
};

export const getAllMarines = async () => {
  try {
    const response = await fetch(`http://localhost:8082/api/marines/`);
    const responseMarines = await response.json();
    return responseMarines;
  } catch (err) {
    console.log(err);
  }
};


export const getAllMarinesInSquad = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/squads/${id}/marines`);
    const responseMarines = await response.json();
    return responseMarines;
  } catch (err) {
    console.log(err);
  }
};


export const getMarineById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/squads/showMarine/${id}`);
    const responseMarine = await response.json();
    return responseMarine;
  } catch (err) {
    console.log(err);
  }
};
