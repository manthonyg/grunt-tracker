export const getTeamsById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8082/api/squads/${id}/teams`);
        const responseTeams = await response.json();
        return responseTeams;
      } catch (err) {
        console.log(err);
      }
    };
  

export const getAllSquads = async () => {
    try {
        const response = await fetch(`http://localhost:8082/api/squads/`);
        const responseSquads= await response.json();
        return responseSquads;
      } catch (err) {
        console.log(err);
      }
    };
  
    