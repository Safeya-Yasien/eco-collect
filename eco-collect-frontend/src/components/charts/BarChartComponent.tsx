import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { ICollectorsPerformance } from "@/types";

interface BarChartComponentProps {
  collectorsPerformanceData: ICollectorsPerformance[];
}

const BarChartComponent = ({
  collectorsPerformanceData,
}: BarChartComponentProps) => {
  const normalizedData = collectorsPerformanceData.map((item) => ({
    ...item,
    total_quantity_collected:
      typeof item.total_quantity_collected === "string"
        ? parseFloat(item.total_quantity_collected)
        : item.total_quantity_collected,
  }));

  return (
    <div className="w-full md:w-[70%]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={normalizedData}
          height={400}
          margin={{ right: 30, left: 20, bottom: 5 }}
          barGap={4}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />

          <XAxis
            dataKey="collector_id"
            tickLine={false}
            tick={{ fill: "#222222", fontSize: 13 }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#444", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#444", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ color: "#000" }}
          />
          <Bar
            dataKey="total_quantity_collected"
            name="Total Quantity Collected"
            fill="#2E7D32"
            barSize={30}
            yAxisId="left"
          />
          <Bar
            dataKey="orders_count"
            name="Orders Count"
            fill="#FFC107"
            barSize={20}
            yAxisId="right"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
