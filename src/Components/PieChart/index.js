import React from 'react'
import { Pie } from '@ant-design/plots';
function PieChart({sortedTransaction, income, expense}) {
    // add loading if no data in reduced Data and show default image for pie chart
    let reducedData;
    if(income){
     reducedData =  sortedTransaction.reduce((result, transaction) => {
        const { tag, amount,type } = transaction;
        if (type === 'income') {
        if (result[tag]) {
    
          result[tag] += amount;
        } else {
          result[tag] = amount;
        }
        }
        return result;
      }, {});
    }else if(expense){
        reducedData =  sortedTransaction.reduce((result, transaction) => {
            const { tag, amount,type } = transaction;
            if (type === 'expense') {
            if (result[tag]) {
        
              result[tag] += amount;
            } else {
              result[tag] = amount;
            }
            }
            return result;
          }, {});
    }
      
      const data = [];
      for(let item in reducedData){
        data.push({tag:item, amount:reducedData[item]});
      }
      console.log("data ", data);
      
    const config = {
        appendPadding : 10,
        width:10,
        data,
        angleField:"amount",
        colorField :"tag",
        radius :1 ,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset:'-50%',
            content: '{value}',
            style :{
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
    console.log("final Data ", config);
  return (
    <>
    < Pie {...config}/>
    </>
  )
}

export default PieChart
