
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { FuelLog } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FuelLogChartProps {
  logs: FuelLog[];
  currency: string;
}

const currencySymbols: { [key: string]: string } = {
  usd: '$',
  inr: '₹',
  eur: '€',
  jpy: '¥'
};

const FuelLogChart: React.FC<FuelLogChartProps> = ({ logs, currency }) => {
  const chartData = logs.map(log => ({
    date: format(new Date(log.date), 'MMM d'),
    price: log.pricePerLiter,
    cost: log.totalCost,
    liters: log.liters
  })).reverse();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Fuel Cost Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-sm"
            />
            <YAxis
              className="text-sm"
              tickFormatter={(value) => `${currencySymbols[currency]}${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`${currencySymbols[currency]}${value.toFixed(2)}`, '']}
              labelClassName="text-muted-foreground"
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FuelLogChart;
