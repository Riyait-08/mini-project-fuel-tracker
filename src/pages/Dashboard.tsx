import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PlusCircle, Search, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import FuelLogForm from '@/components/FuelLogForm';
import FuelLogCard from '@/components/FuelLogCard';
import StatsPanel from '@/components/StatsPanel';
import FuelLogChart from '@/components/FuelLogChart';
import SettingsDialog from '@/components/SettingsDialog';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { FuelLog, FuelLogFormData, StatsData } from '@/lib/types';
import { fuelLogService } from '@/services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<FuelLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<FuelLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState<string | null>(null);
  const [editLog, setEditLog] = useState<FuelLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [stats, setStats] = useState<StatsData>({
    averageCostPerLiter: 0,
    monthlySpend: 0,
    totalLiters: 0,
    totalCost: 0,
  });
  const [currency, setCurrency] = useState('usd');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const data = await fuelLogService.getLogs();
        setLogs(data);
        setFilteredLogs(data);
        calculateStats(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch your fuel logs. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [toast]);

  useEffect(() => {
    let filtered = [...logs];
    
    if (searchTerm) {
      filtered = filtered.filter((log) => 
        log.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.date.includes(searchTerm)
      );
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredLogs(filtered);
  }, [logs, searchTerm, sortOrder]);

  const calculateStats = (logData: FuelLog[]) => {
    if (logData.length === 0) {
      setStats({
        averageCostPerLiter: 0,
        monthlySpend: 0,
        totalLiters: 0,
        totalCost: 0,
      });
      return;
    }

    const totalLiters = logData.reduce((sum, log) => sum + log.liters, 0);
    const totalCost = logData.reduce((sum, log) => sum + log.totalCost, 0);
    const averageCostPerLiter = totalCost / totalLiters;

    const currentMonth = format(new Date(), 'yyyy-MM');
    const monthlyLogs = logData.filter((log) => log.date.startsWith(currentMonth));
    const monthlySpend = monthlyLogs.reduce((sum, log) => sum + log.totalCost, 0);

    setStats({
      averageCostPerLiter: isNaN(averageCostPerLiter) ? 0 : averageCostPerLiter,
      monthlySpend,
      totalLiters,
      totalCost,
    });
  };

  const handleCreateLog = async (data: FuelLogFormData) => {
    try {
      const newLog = await fuelLogService.createLog(data);
      setLogs((prev) => [newLog, ...prev]);
      calculateStats([...logs, newLog]);
      setIsDialogOpen(false);
      toast({
        title: 'Fuel Log Added',
        description: `Successfully added fuel log for ${data.date}`,
      });
    } catch (error) {
      console.error('Error creating log:', error);
      toast({
        title: 'Error',
        description: 'Failed to create fuel log. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateLog = async (data: FuelLogFormData) => {
    if (!editLog) return;

    try {
      const updatedLog = await fuelLogService.updateLog(editLog.id, data);
      setLogs((prev) =>
        prev.map((log) => (log.id === editLog.id ? updatedLog : log))
      );
      calculateStats(logs.map((log) => (log.id === editLog.id ? updatedLog : log)));
      setEditLog(null);
      setIsDialogOpen(false);
      toast({
        title: 'Fuel Log Updated',
        description: `Successfully updated fuel log for ${data.date}`,
      });
    } catch (error) {
      console.error('Error updating log:', error);
      toast({
        title: 'Error',
        description: 'Failed to update fuel log. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteLog = async () => {
    if (!deleteLogId) return;

    try {
      await fuelLogService.deleteLog(deleteLogId);
      const updatedLogs = logs.filter((log) => log.id !== deleteLogId);
      setLogs(updatedLogs);
      calculateStats(updatedLogs);
      setIsDeleteDialogOpen(false);
      setDeleteLogId(null);
      toast({
        title: 'Fuel Log Deleted',
        description: 'Successfully deleted fuel log',
      });
    } catch (error) {
      console.error('Error deleting log:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete fuel log. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEditClick = (log: FuelLog) => {
    setEditLog(log);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteLogId(id);
    setIsDeleteDialogOpen(true);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleExportCSV = () => {
    const csvData = logs.map(log => ({
      date: log.date,
      liters: log.liters,
      pricePerLiter: log.pricePerLiter,
      totalCost: log.totalCost,
      vehicleType: log.vehicleType,
      notes: log.notes || ''
    }));

    const headers = ['Date', 'Liters', 'Price Per Liter', 'Total Cost', 'Vehicle Type', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `fuel-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-fuel-blue-dark">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-fuel-blue-dark/70">
              Track and manage your fuel expenses.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SettingsDialog
              currency={currency}
              onCurrencyChange={setCurrency}
              onExportCSV={handleExportCSV}
            />
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-fuel-green-dark to-fuel-green flex items-center gap-1">
              <PlusCircle className="w-4 h-4" />
              <span>Add Fuel Log</span>
            </Button>
          </div>
        </div>

        <StatsPanel stats={stats} currency={currency} />
        
        {logs.length > 0 && (
          <FuelLogChart logs={logs} currency={currency} />
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold text-fuel-blue-dark">Your Fuel Logs</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-fuel-blue/50" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              className="flex-shrink-0"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-3 text-center py-12">
              <div className="animate-pulse flex justify-center">
                <div className="h-8 w-8 bg-fuel-green/20 rounded-full"></div>
              </div>
              <p className="mt-4 text-fuel-blue/50">Loading your fuel logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-fuel-blue/50">No fuel logs found.</p>
              {searchTerm && (
                <p className="mt-2 text-fuel-blue/50">
                  Try adjusting your search or clear the filter.
                </p>
              )}
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Your First Log
              </Button>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <FuelLogCard
                key={log.id}
                log={log}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editLog ? 'Edit Fuel Log' : 'Add New Fuel Log'}</DialogTitle>
          </DialogHeader>
          <FuelLogForm
            onSubmit={editLog ? handleUpdateLog : handleCreateLog}
            initialData={editLog ? {
              date: editLog.date,
              liters: editLog.liters,
              pricePerLiter: editLog.pricePerLiter,
              vehicleType: editLog.vehicleType,
              notes: editLog.notes,
            } : undefined}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditLog(null);
            }}
            isEditing={!!editLog}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fuel Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this fuel log? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteLogId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLog}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Dashboard;
