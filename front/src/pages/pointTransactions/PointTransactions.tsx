import { lazy, useEffect, useMemo, useCallback } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { CustomHeading } from "@/components/shared";

import { IPointTransaction } from "@/types";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ErrorBanner } from "@/components/common";
import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/ui/Toast";
import { actGetPointTransactions } from "@/store/pointTransactions/act/actGetPointTransactions";
import { actUpdatePointTransactionStatus } from "@/store/pointTransactions/act/actUpdatePointTransactionStatus";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const getColumns = (
  handleApprove: (id: number) => void,
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
  const { data, loading, error } = useAppSelector(
    (state) => state.pointTransactions,
  );
  const { showToast } = useToast();

  useEffect(() => {
    dispatch(actGetPointTransactions());
  }, [dispatch]);

  const rows = useMemo(
    () =>
      (data ?? []).map((row) => ({
        ...row,
        user_name: row.user?.name || "—",
      })),
    [data],
  );

  const handleApprove = useCallback(
    async (id: number) => {
      const result = await dispatch(
        actUpdatePointTransactionStatus({ id, status: "done" }),
      );
      if (actUpdatePointTransactionStatus.fulfilled.match(result)) {
        showToast("Transaction approved", "success");
      } else {
        showToast("Failed to approve transaction", "error");
      }
      dispatch(actGetPointTransactions());
    },
    [dispatch, showToast],
  );

  const columnsMemo = useMemo(() => getColumns(handleApprove), [handleApprove]);

  return (
    <div>
      <CustomHeading title="Point Transactions" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        {loading === "pending" ? (
          <div className="p-8">
            <Spinner />
          </div>
        ) : error ? (
          <ErrorBanner
            error={error}
            onRetry={() => dispatch(actGetPointTransactions())}
          />
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No point transactions found.
          </div>
        ) : (
          <DataTable columns={columnsMemo} rows={rows} />
        )}
      </Box>
    </div>
  );
};
export default PointTransactions;
