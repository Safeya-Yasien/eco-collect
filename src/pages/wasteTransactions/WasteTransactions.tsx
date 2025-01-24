import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { DataTable } from "@/components";
import { userRows } from "@/data/userRows";

import "./wasteTransactions.css";

const columns: GridColDef<(typeof userRows)[number]>[] = [
  { field: "transactionID", headerName: "Transaction ID", width: 180 },
  {
    field: "Date",
    headerName: "Date",
    width: 150, 
    editable: true,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 200, 
    editable: true,
  },
  {
    field: "collectorName",
    headerName: "Collector Name",
    width: 200, 
    editable: true,
  },
  {
    field: "wasteAmount",
    headerName: "Waste Amount",
    width: 180,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 130, 
    editable: true,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 200, 
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120, 
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
