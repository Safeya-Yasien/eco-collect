import { lazy, useEffect } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { ICustomer } from "@/types";
import { CustomHeading } from "@/components/shared";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetCustomers from "@/store/customers/act/actGetCustomers";
import { ErrorBanner, EmptyState } from "@/components/common";
import { LoadingTable } from "@/components/feedback";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const columns: GridColDef<ICustomer>[] = [
  { field: "user_id", headerName: "customer ID", width: 200 },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "total_points",
    headerName: "Total Points",
    width: 230,
  },
  {
    field: "total_balance",
    headerName: "Total Balance",
    width: 180,
  },
];

const Customers = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector(
    (state) => state.customers,
  );

  useEffect(() => {
    dispatch(actGetCustomers());
  }, [dispatch]);

  return (
    <div>
      <CustomHeading title="customers" />

      {/* data table */}
      <div className="mt-[50px]">
        <Box sx={{ minHeight: 500, width: "100%" }}>
          {loading === "pending" ? (
            <LoadingTable />
          ) : error ? (
            <ErrorBanner
              error={error}
              onRetry={() => dispatch(actGetCustomers())}
            />
          ) : customers.length === 0 ? (
            <EmptyState message="No customers found." />
          ) : (
            <DataTable
              columns={columns}
              rows={customers}
              showExport={false}
              showFilter={false}
            />
          )}
        </Box>
      </div>
    </div>
  );
};
export default Customers;
