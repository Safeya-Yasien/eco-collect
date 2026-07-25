export interface IMostContributedLocations {
  location_name: string;
  total_quantity: number;
  percentage: number;
}

export interface ICollectorsPerformance {
  collector_id: number;
  total_quantity_collected: number;
  orders_count: number;
}
