
import React, { useState } from 'react';
import { Settings, FileText, IndianRupee, DollarSign, Euro, JapaneseYen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const currencies = [
  { id: "usd", label: "USD ($)", icon: DollarSign },
  { id: "inr", label: "INR (₹)", icon: IndianRupee },
  { id: "eur", label: "EUR (€)", icon: Euro },
  { id: "jpy", label: "JPY (¥)", icon: JapaneseYen },
];

interface SettingsDialogProps {
  onExportCSV: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  onExportCSV,
  currency,
  onCurrencyChange,
}) => {
  const { toast } = useToast();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Currency Preference</h3>
            <RadioGroup
              value={currency}
              onValueChange={onCurrencyChange}
              className="grid grid-cols-2 gap-4"
            >
              {currencies.map(({ id, label, icon: Icon }) => (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem value={id} id={id} />
                  <Label htmlFor={id} className="flex items-center gap-1">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Export Data</h3>
            <Button
              onClick={() => {
                onExportCSV();
                toast({
                  title: "Export Successful",
                  description: "Your fuel logs have been exported to CSV.",
                });
              }}
              className="w-full flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Export to CSV</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
