import React from 'react'
import { Pie } from '@ant-design/plots';
import PieChartNotAvailable from '../PieChartNotAvailable';

function PieChart({ sortedTransaction, income, expense }) {

  let reducedData;
  if (income) {
    reducedData = sortedTransaction.reduce((result, transaction) => {
      const { tag, amount, type } = transaction;
      if (type === 'income') {
        if (result[tag]) {

          result[tag] += parseInt(amount);
        } else {
          result[tag] = parseInt(amount);
        }
      }
      return result;
    }, {});
  } else if (expense) {
    reducedData = sortedTransaction.reduce((result, transaction) => {
      const { tag, amount, type } = transaction;
      if (type === 'expense') {
        if (result[tag]) {
          result[tag] += parseInt(amount);
        } else {
          result[tag] = parseInt(amount);;
        }
      }
      return result;
    }, {});
  }

  const data = [];
  for (let item in reducedData) {
    data.push({ tag: item, amount: reducedData[item] });
  }

  const config = {
    appendPadding: 10,
    width: 10,
    data,
    angleField: "amount",
    colorField: "tag",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistics: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };

  return (
    <>
      {data.length > 0 ?
        < Pie {...config} />
        :
        <PieChartNotAvailable />
      }
    </>
  )
}

export default PieChart
