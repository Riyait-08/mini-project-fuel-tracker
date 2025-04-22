
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FuelLog {
  id: string;
  userId: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  vehicleType: string;
  notes?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface FuelLogFormData {
  date: string;
  liters: number;
  pricePerLiter: number;
  vehicleType: string;
  notes?: string;
}

export interface StatsData {
  averageCostPerLiter: number;
  monthlySpend: number;
  totalLiters: number;
  totalCost: number;
}
