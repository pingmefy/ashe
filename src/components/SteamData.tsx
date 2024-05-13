import React, { useState, useEffect } from 'react';

interface SteamUserData {
  steamid: string;
  personaname: string;
}

const SteamData = () => {
  const [data, setData] = useState<SteamUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/commonGames', {
      method: 'POST', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
      body: JSON.stringify({steamIds: ["76561198079045661", "76561197989887910", "76561197998388059"] })
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div>
      <h1>Steam User Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default SteamData;
