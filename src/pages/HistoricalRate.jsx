import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

import NavbarHistoricalRate from '../components/NavbarHistoricalRate';

const HistoricalRate = ()=> {  
  const [ date, setDate ] = useState('');
  const chartRef = React.createRef();

  const params = new URLSearchParams(location.search);
  const base = params.get('base');
  const quote = params.get('quote');

  useEffect(()=> {
    getHistoricalRates(base, quote);

    fetch('https://api.frankfurter.app/latest')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      setDate(data.date);
    }).catch(error => console.log('Error!: ', error))
  }, []);

  const getHistoricalRates= (base, quote)=> {
    const endDate= new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      const chartLabels = Object.keys(data.rates).map(date => date.slice(5).replace(/^0+/, ''));
      const chartData = Object.values(data.rates).map(rate => rate[quote]);
      const chartLabel = `${base}/${quote}`;

      buildChart(chartLabels, chartData, chartLabel);
    }).catch(error => console.log('Error!: ', error))
  };

  const buildChart = (labels, data, label) => {
    chartRef.current.getContext("2d");

    if (typeof window.chart !== "undefined") {
      window.chart.destroy();
    }

    window.chart = new Chart(chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  };

  return (
    <>
      <NavbarHistoricalRate />
      <div className='container'>
        <h6 className='text-center my-2'>
          Latest Update: { date }
        </h6>
        <canvas id='canvas' ref={ chartRef }></canvas>
      </div>
    </>   
  );
};

export default HistoricalRate;