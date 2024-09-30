// src/components/Upload.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const data = parseCSV(text); // Parse CSV data to JSON
        setCsvData(data);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');
      headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index] ? currentLine[index].trim() : '';
      });
      result.push(obj);
    }
    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (csvData) {
      navigate('/processing', { state: { csvData } });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} required />
        <button type="submit">Process</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
};

export default Upload;
