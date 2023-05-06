export interface Tower {
  tower_id: number;
  operator: string;
  address: string;
  height: number;
  tower_type: string;
  latitude: number;
  longitude: number;
  technology: string;
}

export interface TechCounts {
  [key: string]: number;
}
