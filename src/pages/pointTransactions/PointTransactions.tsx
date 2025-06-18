import { lazy, useEffect } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { CustomHeading } from "@/components/shared";

import { IPointTransaction } from "@/types";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetPointTransactions } from "@/store/pointTransactions/act/actGetPointTransactions";
import { actUpdatePointTransactionStatus } from "@/store/pointTransactions/act/actUpdatePointTransactionStatus";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const getColumns = (
  handleApprove: (id: number) => void
): GridColDef<IPointTransaction>[] => [
  { field: "id", headerName: "Transaction ID", width: 180 },
  { field: "date", headerName: "Date", width: 180 },
  {
    field: "user_name",
    headerName: "Customer Name",
    width: 200,
  },
  {
    field: "points",
    headerName: "Points",
    width: 130,
  },
  {
    field: "balance_by_points",
    headerName: "Balance (EGP)",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      if (params.row.status === "pending") {
        return (
          <button
            onClick={() => handleApprove(params.row.id)}
            className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-2.5 py-1 rounded-md shadow-sm text-sm font-medium"
          >
            Approve
          </button>
        );
      }
      return <span className="text-gray-500">---</span>;
    },
  },
];

const PointTransactions = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.pointTransactions);

  useEffect(() => {
    dispatch(actGetPointTransactions());
  }, [dispatch]);

  const rows = (data ?? []).map((row) => ({
    ...row,
    user_name: row.user?.name || "—",
  }));

  const handleApprove = async (id: number) => {
    await dispatch(actUpdatePointTransactionStatus({ id, status: "done" }));
    dispatch(actGetPointTransactions());
  };

  return (
    <div>
      <CustomHeading title="Point Transactions" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        <DataTable columns={getColumns(handleApprove)} rows={rows} />
      </Box>
    </div>
  );
};
export default PointTransactions;
