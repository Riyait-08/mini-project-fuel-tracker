
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Fuel, Calendar, Car, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FuelLog } from '@/lib/types';

interface FuelLogCardProps {
  log: FuelLog;
  onEdit: (log: FuelLog) => void;
  onDelete: (id: string) => void;
}

const FuelLogCard: React.FC<FuelLogCardProps> = ({ log, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden animate-fade-in glass-card">
      <CardHeader className="bg-gradient-to-r from-fuel-green/50 to-fuel-green-light/50 p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Fuel className="h-5 w-5 text-fuel-green-dark" />
          <span className="font-medium text-fuel-blue-dark">
            {format(parseISO(log.date), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="text-lg font-bold text-fuel-green-dark">
          ${log.totalCost.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-1 text-sm text-fuel-blue/80">
            <Calendar className="h-4 w-4 text-fuel-green" />
            <span>{format(parseISO(log.date), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-fuel-blue/80">
            <Car className="h-4 w-4 text-fuel-green" />
            <span>{log.vehicleType}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div>
            <p className="text-fuel-blue/70">Liters</p>
            <p className="font-semibold">{log.liters.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-fuel-blue/70">Price per Liter</p>
            <p className="font-semibold">${log.pricePerLiter.toFixed(2)}</p>
          </div>
        </div>

        {log.notes && (
          <div className="mt-3 text-sm border-t pt-2 border-dashed border-fuel-neutral-dark/20">
            <p className="text-fuel-blue/70">Notes</p>
            <p className="text-fuel-blue-dark">{log.notes}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onEdit(log)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(log.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelLogCard;
