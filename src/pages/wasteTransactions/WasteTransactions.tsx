import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
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
  },
];

const rows = [
  {
    id: 1,
    transactionID: "T001",
    Date: "2024-12-01",
    customerName: "Jon Snow",
    collectorName: "Arya Stark",
    wasteAmount: 14,
    price: 200,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: 2,
    transactionID: "T002",
    Date: "2024-12-02",
    customerName: "Cersei Lannister",
    collectorName: "Jaime Lannister",
    wasteAmount: 31,
    price: 500,
    paymentMethod: "Cash",
    status: "Pending",
  },
  {
    id: 3,
    transactionID: "T003",
    Date: "2024-12-03",
    customerName: "Jaime Lannister",
    collectorName: "Tyrion Lannister",
    wasteAmount: 20,
    price: 300,
    paymentMethod: "Online",
    status: "Completed",
  },
  {
    id: 4,
    transactionID: "T004",
    Date: "2024-12-04",
    customerName: "Arya Stark",
    collectorName: "Sansa Stark",
    wasteAmount: 11,
    price: 150,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: 5,
    transactionID: "T005",
    Date: "2024-12-05",
    customerName: "Daenerys Targaryen",
    collectorName: "Jorah Mormont",
    wasteAmount: 25,
    price: 600,
    paymentMethod: "Cash",
    status: "Pending",
  },
  {
    id: 6,
    transactionID: "T006",
    Date: "2024-12-06",
    customerName: "Melisandre",
    collectorName: "Stannis Baratheon",
    wasteAmount: 15,
    price: 400,
    paymentMethod: "Online",
    status: "Completed",
  },
  {
    id: 7,
    transactionID: "T007",
    Date: "2024-12-07",
    customerName: "Ferrara Clifford",
    collectorName: "Arya Stark",
    wasteAmount: 44,
    price: 700,
    paymentMethod: "Credit Card",
    status: "Pending",
  },
  {
    id: 8,
    transactionID: "T008",
    Date: "2024-12-08",
    customerName: "Rossini Frances",
    collectorName: "Jon Snow",
    wasteAmount: 36,
    price: 800,
    paymentMethod: "Cash",
    status: "Completed",
  },
  {
    id: 9,
    transactionID: "T009",
    Date: "2024-12-09",
    customerName: "Harvey Roxie",
    collectorName: "Jaime Lannister",
    wasteAmount: 65,
    price: 1000,
    paymentMethod: "Online",
    status: "Completed",
  },
];

const WasteTransactions = () => {
  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        waste transactions{" "}
      </h2>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
        className="bg-white !border-[2px] border-[#B0BEC5] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] !rounded-xl "
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
export default WasteTransactions;
