import React from 'react';
import image from '../../assets/pie-chart-no-data.png';

function PieChartNotAvailable() {
  return (
    <img id="no-pie-chart" src={image} alt="" />
  )
}

export default PieChartNotAvailable
