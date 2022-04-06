

  function getData(): Promise<any> {
    return client("59f08692310000b4130e9f71", "GET" )
  }
  
  const authURL = process.env.REACT_APP_ENDPOINT;
  
  async function client(endpoint: string, type: string) {
    const config = {
      method: type,
      headers: { "Content-Type": "application/json" },
    };
  
    return window
      .fetch(`${authURL}/${endpoint}`, config)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      });
  }
  
  export { getData };
  