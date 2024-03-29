import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://backend-svc:5000/data`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://backend-svc:5000/data`, { message: inputValue });
      fetchData(); // Fetch updated data after submitting
      setInputValue('');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  return (
    <div>
      <h1>Data from Backend</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new data"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;