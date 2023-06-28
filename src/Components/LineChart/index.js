import React from 'react'
import {Line} from '@ant-design/plots'
function LineChart({sortedTransaction}) {
    const data = sortedTransaction.map(item => {
        if(item.type === "income"){
            return{
                date: item.date,
                amount: item.amount,
                key :"income"
            }
        }else if(item.type === "expense"){
            return{
                date: item.date,
                amount: item.amount,
                key:"expense"
            }
        }
    });
    const config = {
        data,
        width:400,
        xField : "date",
        yFiled: "amount",
        callout: false,
        seriesField:"key",
        stepType:"hvh",
    };
  return (
    <div>
      <Line {...config}  />
    </div>
  )
}

export default LineChart
