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
  return (
    <div className="w-full md:w-[70%]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={collectorsPerformanceData}
          height={400}
          margin={{ right: 30, left: 20, bottom: 5 }}
          barGap={4}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="collector_id"
            tickLine={false}
            tick={{ fill: "#222222", fontSize: 13 }}
          />

          {/* Single Left Y Axis */}
          <YAxis
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

          {/* Both Bars use the left Y Axis */}
          <Bar
            dataKey="total_quantity_collected"
            name="Total Quantity Collected"
            fill="#2E7D32"
            barSize={40}
          />
          <Bar
            dataKey="orders_count"
            name="Orders Count"
            fill="#FFEB3B"
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
