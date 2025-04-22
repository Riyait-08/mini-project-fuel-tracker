
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsData } from "@/lib/types";
import { ChartLine, DollarSign, IndianRupee, Euro, JapaneseYen } from "lucide-react";

interface StatsPanelProps {
  stats: StatsData;
  currency: string;
}

const currencyIcons = {
  usd: DollarSign,
  inr: IndianRupee,
  eur: Euro,
  jpy: JapaneseYen,
};

const currencySymbols: { [key: string]: string } = {
  usd: '$',
  inr: '₹',
  eur: '€',
  jpy: '¥'
};

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, currency }) => {
  // Use a default icon (DollarSign) if the currency doesn't match any in our map
  const CurrencyIcon = currencyIcons[currency as keyof typeof currencyIcons] || DollarSign;
  const symbol = currencySymbols[currency] || '$';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Cost/Liter
          </CardTitle>
          <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{symbol}{stats.averageCostPerLiter.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
          <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{symbol}{stats.monthlySpend.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Liters</CardTitle>
          <ChartLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalLiters.toFixed(1)}L</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{symbol}{stats.totalCost.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
