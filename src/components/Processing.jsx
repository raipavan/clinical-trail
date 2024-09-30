// src/components/Processing.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Creating block...'); // Initial message
  const [tableData, setTableData] = useState([]); // State to hold table data

  useEffect(() => {
    // Define maximum count for actions
    const maxCount = 100; // Set maximum count to 100

    // Initialize counters for actions
    let createBlockCount = 0;

    // Append rows for each action every 500ms until 100
    const interval = setInterval(() => {
      if (createBlockCount <= maxCount) {
        // Append rows for each action
        setTableData(prevData => [
          ...prevData,
          { step: createBlockCount, action: `Creating Block ${createBlockCount}`, value: 1 },
          { step: createBlockCount, action: `Broadcasting ${createBlockCount}`, value: 1 },
          { step: createBlockCount, action: `Verifying Block ${createBlockCount}`, value: 1 },
          { step: createBlockCount, action: `Block Connected ${createBlockCount}`, value: 1 }
        ]);

        // Update progress based on the number of rows added
        const totalRowsAdded = createBlockCount * 4; // 4 rows for each count
        setProgress((totalRowsAdded / (maxCount * 4)) * 100); // Update progress percentage

        // Increment the count
        createBlockCount++;
      } else {
        clearInterval(interval);
        setProgress(100); // Set progress to 100% when done
      }
    }, 500); // Adjusted interval to 500ms for slower appending

    // Set a message indicating the progress
    setMessage('Processing...');

    // Navigate to the chart page after processing is done
    const timer = setTimeout(() => {
      navigate('/chart'); // Navigate to the chart page
    }, (maxCount * 500) + 1000); // Navigate after processing is done

    // Cleanup function to clear interval and timeouts
    return () => {
      clearInterval(interval); // Clear the interval
      clearTimeout(timer); // Clear the navigation timer
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>{message}</h2>
      <div style={styles.loader}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div> {/* Dynamic progress bar */}
      </div>
      <p>{progress.toFixed(0)}%</p> {/* Display current progress percentage */}

      {/* Table to display processing steps */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Step Number</th>
              <th>Action</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.step}</td>
                <td>{row.action}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles for the progress bar and table
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  loader: {
    width: '50%', // Width of the progress bar
    maxWidth: '400px', // Max width for large screens
    height: '10px', // Height of the progress bar
    backgroundColor: '#e0e0e0', // Light grey background for the bar
    borderRadius: '5px', // Rounded corners for the bar
    overflow: 'hidden',
    marginTop: '20px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#27ae60', // Green color for the progress
    transition: 'width 0.5s ease', // Smooth transition for progress bar width changes
  },
  tableContainer: {
    width: '80%', // Width of the table container
    maxHeight: '300px', // Set a max height for the table
    overflowY: 'auto', // Enable vertical scrolling
    marginTop: '20px',
    border: '1px solid #ddd', // Border for the table container
    borderRadius: '5px', // Rounded corners
    backgroundColor: '#fff', // Background color for the table
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%', // Table width
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default Processing;
