// src/components/Loading.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Initializing...');

  useEffect(() => {
    const steps = [
      { time: 3000, progress: 0, text: 'Initializing...' }, 
      { time: 6000, progress: 25, text: 'Finding nearest node...' }, 
      { time: 9000, progress: 50, text: 'Connecting...' },  
      { time: 12000, progress: 100, text: 'Connected Successfully!' },
    ];

    steps.forEach(({ time, progress, text }) => {
      setTimeout(() => {
        setProgress(progress);
        setMessage(text);
      }, time);
    });

    const timer = setTimeout(() => {
      navigate('/upload');
    }, 13000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>{message}</h2>
      <div style={styles.loader}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>
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
  loader: {
    width: '50%',
    maxWidth: '300px',
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '20px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    transition: 'width 1s ease',
  },
};

export default Loading;
