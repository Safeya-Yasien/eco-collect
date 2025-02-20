import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

type TBarChartData = {
  name: string;
  Deals: number;
  Expenses: number;
}[];

const BarChartComponent = ({ data }: { data: TBarChartData }) => {
  return (
    <div className="w-full md:w-[70%]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          height={400}
          margin={{ right: 30, left: 20, bottom: 5 }}
          barGap={1}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fill: "#222222", fontSize: 13 }}
          />
          <YAxis
            domain={[0, "dataMax"]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#444444", fontSize: 14 }}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ color: "#000" }}
          />

          {/* Reference Lines */}
          <ReferenceLine y={10} stroke="#EBEBEB" />
          <ReferenceLine y={30} stroke="#EBEBEB" />
          <ReferenceLine y={50} stroke="#EBEBEB" />
          <ReferenceLine y={70} stroke="#EBEBEB" />
          <ReferenceLine y={90} stroke="#EBEBEB" />
          <ReferenceLine y={110} stroke="#EBEBEB" />

          <Bar dataKey="Deals" fill="#2E7D32" barSize={40} />
          <Bar dataKey="Expenses" fill="#FFEB3B" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
