import { Chart } from "react-google-charts";

interface IPieChart {
  data: (number | string)[][];
  options: any;
}

const PieChart = ({ data, options }: IPieChart) => {
  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};
export default PieChart;
