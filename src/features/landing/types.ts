export interface Device {
  id: string;
  name: string;
  description: string;
  inStock: number;
  price: number;
  category: string;
  brand: string;
  isActive: boolean;
}

export interface DeviceFilter {
  filteredData: Device[];
  searchedData: Device[];
}

export interface CartItem extends Device {
  quantity: number;
}
