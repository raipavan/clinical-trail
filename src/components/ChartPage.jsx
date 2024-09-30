// src/components/ChartPage.jsx
import React from 'react';
import LineChart from './LineChart';

const ChartPage = () => {
  // Sample data for each chart
  const createBlockData = [
    { date: 'Step 1', value: 3 },
    { date: 'Step 2', value: 20 },
    { date: 'Step 3', value: 45 },
    { date: 'Step 4', value: 56 },
  ];

  const broadcastData = [
    { date: 'Step 1', value: 15 },
    { date: 'Step 2', value: 25 },
    { date: 'Step 3', value: 35 },
    { date: 'Step 4', value: 50 },
  ];

  const blockVerifyData = [
    { date: 'Step 1', value: 5 },
    { date: 'Step 2', value: 30 },
    { date: 'Step 3', value: 55 },
    { date: 'Step 4', value: 80 },
  ];

  const blockConnectedData = [
    { date: 'Step 1', value: 0 },
    { date: 'Step 2', value: 10 },
    { date: 'Step 3', value: 40 },
    { date: 'Step 4', value: 90 },
  ];

  // New fifth chart data
  const blockConfirmedData = [
    { date: 'Step 1', value: 20 },
    { date: 'Step 2', value: 40 },
    { date: 'Step 3', value: 60 },
    { date: 'Step 4', value: 80 },
  ];

  const chartData = [
    { name: 'Create Block', values: createBlockData },
    { name: 'Broadcast', values: broadcastData },
    { name: 'Block Verify', values: blockVerifyData },
    { name: 'Block Connected', values: blockConnectedData },
    { name: 'Block Confirmed', values: blockConfirmedData }, // Add the new chart data here
  ];

  return (
    <div style={styles.container}>
      
      <div style={styles.chartRow}>
        {chartData.map((data, index) => (
          <div key={index} style={styles.chartWrapper}>
            <h3 style={styles.chartTitle}>{data.name}</h3>
            <LineChart data={[data]} width={400} height={300} />
          </div>
        ))}
      </div>
      
      <LineChart
        data={[{ name: 'Create Block', values: createBlockData }]} // Only showing Create Block data
        width={800}
        height={300}
        isMultiLine={false} // Specify it's a single line chart
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    overflow: 'auto', // Ensure content fits within the screen
  },
  header: {
    marginBottom: '20px', // Margin for the main header
  },
  chartRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  chartWrapper: {
    width: '45%', // Set width for each chart
    margin: '10px 0',
  },
  chartTitle: {
    marginBottom: '10px', // Margin for the title to separate from chart
    fontSize: '1.2rem', // Adjust font size if necessary
  },
};

export default ChartPage;
