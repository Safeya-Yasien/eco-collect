import { lazy, useEffect } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { CustomHeading } from "@/components/shared";
import { ErrorBanner } from "@/components/common";
import Spinner from "@/components/common/Spinner";

import actGetOrders from "@/store/orders/act/actGetOrders";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { IRawOrder } from "@/types";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const columns: GridColDef<IRawOrder[]>[] = [
  { field: "transaction_id", headerName: "Transaction ID", width: 180 },
  {
    field: "arrival_time",
    headerName: "Date",
    width: 150,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    width: 200,
  },
  {
    field: "collector_name",
    headerName: "Collector Name",
    width: 200,
  },
  {
    field: "waste_amount",
    headerName: "Waste Amount",
    width: 180,
  },
  {
    field: "price",
    headerName: "Price",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,

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
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(actGetOrders());
  }, [dispatch]);

  return (
    <div>
      <CustomHeading title="waste transactions" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        {loading === "pending" ? (
          <div className="p-8">
            <Spinner />
          </div>
        ) : error ? (
          <ErrorBanner error={error} onRetry={() => dispatch(actGetOrders())} />
        ) : (orders ?? []).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No transactions available.
          </div>
        ) : (
          <DataTable columns={columns} rows={orders ?? []} />
        )}
      </Box>
    </div>
  );
};
export default WasteTransactions;
