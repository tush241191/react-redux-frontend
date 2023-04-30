export interface Device {
  id: string;
  name: string;
  description: string;
  quantity: string;
  price: number;
  category: string;
  brand: string;
  isActive: boolean;
}

export interface DeviceFilter {
  devices: Device[];
  filteredData: Device[];
  searchedData: Device[];
}