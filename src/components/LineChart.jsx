// src/components/LineChart.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width, height, isMultiLine }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    // Set up scales and axes
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const x = d3.scaleBand()
      .domain(data[0].values.map(d => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data.flatMap(d => d.values.map(v => v.value)))]).nice()
      .range([height - margin.bottom, margin.top]);

    // Draw axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Draw lines for multi-line chart
    if (isMultiLine) {
      const line = d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2) // Center the line on the bar
        .y(d => y(d.value));

      data.forEach(series => {
        svg.append('path')
          .datum(series.values)
          .attr('fill', 'none')
          .attr('stroke', d3.schemeCategory10[series.name.charCodeAt(0) % 10]) // Color by name
          .attr('stroke-width', 1.5)
          .attr('d', line);
      });
    } else {
      // Draw a single line for the single chart
      const line = d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2) // Center the line on the bar
        .y(d => y(d.value));

      svg.append('path')
        .datum(data[0].values)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue') // Set the color for the single line
        .attr('stroke-width', 1.5)
        .attr('d', line);
    }

  }, [data, height, width, isMultiLine]);

  return (
    <svg ref={svgRef} width={width} height={height} />
  );
};

export default LineChart;
