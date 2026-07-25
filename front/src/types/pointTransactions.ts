export interface IPointTransaction {
  id: number;
  date: string;
  status: string;
  points: number;
  balance_by_points: number;
  user: {
    id: number;
    name: string;
  };
}
