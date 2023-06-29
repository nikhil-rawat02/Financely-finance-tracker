import React from 'react';
import { Line } from '@ant-design/plots';

function LineChart({ sortedTransaction }) {

    const tempData = sortedTransaction.map(item => {
        return {
            date: item.date,
            amount: item.amount,
            type: item.type,
        }
    })

    tempData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const reducedData = sortedTransaction.reduce((result, tempData) => {
        const { type, amount, date } = tempData;
        const key = date + "*" + type;
        if (result[key]) {
            result[key] = {
                "amount": parseInt(result[key].amount) + parseInt(amount),
                "type": type,
            };
        }
        else {
            result[key] = {
                "amount": parseInt(amount),
                "type": type,
            }
        }
        return result;
    }, {});

    const data = [];
    for (let stats in reducedData) {
        const item = stats.split("*")[0]
        data.push({
            "date": item,
            "amount": reducedData[stats].amount,
            "type": reducedData[stats].type
        })
    }

    const config = {
        data,
        xField: 'date',
        yField: 'amount',
        seriesField: 'type',
        stepType: 'hvh',
        // point on each value
        point: {
            size: 8,
            style: {
                lineWidth: 1,
                fillOpacity: 1
            },
            shape: (item) => {
                if (item.type === "income") {
                    return "circle";
                }
                return "diamond";
            }
        },
        // label on lines
        label: {
            layout: [{
                type: "hide-overlap"
            }],
            style: { textAlign: "right" },
            formatter: (item) => item.type
        },
        // legend top right corner
        legend: {
            position: "top-right",
            itemName: {
                style: { fill: "#000" },
                formatter: (name) => name
            }
        },
    };

    return (
        <Line {...config} />
    )
}

export default LineChart
