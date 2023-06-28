import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const Root = props => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
  );
  const Label = props => (
    <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
  );

export default function Charts({ sortedTransaction }) {

    console.log("sorted data => ", sortedTransaction);
    const data = sortedTransaction.map(item => {
        return {
            "expense": item.type === "expense" ? item.amount : 0,
            "income": item.type === "income" ? item.amount : 0,
            "date": item.date
        }
    })

   const chartData = data.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
console.log("chart data ", chartData);
    return (
        <Paper>
            {/* <Chart
                data={chartData}
            >
                <ArgumentAxis />
                <ValueAxis /> */}

                {/* <BarSeries
                    name="Income"
                    valueField="income"
                    argumentField="date"
                    color="#ffd700"
                /> */}
                {/* <BarSeries
                    name="Expense"
                    valueField="expense"
                    argumentField="date"
                    color="#c0c0c0"
                /> */}

                {/* <Animation />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text="Income vs Expenses" />
                <Stack />
            </Chart> */}
        </Paper>
    );
}

