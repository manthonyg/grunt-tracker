export const createNewMarine = async(id, data) => {
    
    const settings = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json/', 
        'Content-Type': 'application/json'
      }
  };
      try {
          const fetchRes = await fetch(`http://localhost:8082/api/squads/${id}/teams/add`, settings)
          const fetchData = await fetchRes.json();
          return fetchData
      } catch (err) {
          return err
      }
  }
