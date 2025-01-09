import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { DataTable } from "@/components";
import { userRows } from "@/data/userRows";

import "./wasteTransactions.css";

const columns: GridColDef<(typeof userRows)[number]>[] = [
  { field: "transactionID", headerName: "Transaction ID", width: 90 },
  {
    field: "Date",
    headerName: "date",
    width: 150,
    editable: true,
  },
  {
    field: "customerName",
    headerName: "customer name",
    width: 150,
    editable: true,
  },
  {
    field: "collectorName",
    headerName: "collector name",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "wasteAmount",
    headerName: "waste amount",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "paymentMethod",
    headerName: "payment method",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "status",
    headerName: "status",
    type: "number",
    width: 110,
    editable: true,
    renderCell: (params) => {
      let statusStyle = {};
      const statusValue = params.value.toLowerCase();

      if (statusValue === "pending") {
        statusStyle = { color: "black", opacity: 0.5 };
      } else if (statusValue === "completed") {
        statusStyle = { color: "#2E7D32" };
      } else if (statusValue === "cancelled") {
        statusStyle = { color: "#C61E1E" };
      }
      return <span style={statusStyle}>{params.value}</span>;
    },
  },
];

const WasteTransactions = () => {
  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        waste transactions{" "}
      </h2>

      <Box sx={{ minHeight: 500, width: "100%" }}>
        <DataTable columns={columns} rows={userRows} />
      </Box>
    </div>
  );
};
export default WasteTransactions;
