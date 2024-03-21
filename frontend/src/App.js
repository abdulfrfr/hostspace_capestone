import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const [postData, setPostData] = useState('');

  const backend = process.env.REACT_APP_BACKEND_URL;

  function fetchData() {
    axios.get(backend)
      .then((res) => {
        setData(res.data)
      })
      .catch((err)=> {
        console.log(err);
      })
  }
  
  function sendData() {
    axios.post(backend, {
      ...postData,
      message: message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      setPostData(res.data)
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Frontend Application</h1>
      <h2>Get Data</h2>
      <button onClick={fetchData}>Get Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <h2>Add Data</h2>
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendData}>Add Data</button>
      {postData && <pre>{JSON.stringify(postData, null, 2)}</pre>}
    </div>
  );
}

export default App;
