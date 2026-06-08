import { lazy, useEffect } from "react";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { CustomHeading } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetCollectors from "@/store/collectors/act/actGetCollectors";
import { ICollector } from "@/types";
import { ErrorBanner, EmptyState } from "@/components/common";
import { LoadingTable } from "@/components/feedback";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const columns: GridColDef<ICollector[]>[] = [
  { field: "id", headerName: "Collector ID", width: 180 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 180,
  },
];

const Collectors = () => {
  const dispatch = useAppDispatch();
  const { collectors, loading, error } = useAppSelector(
    (state) => state.collectors,
  );

  useEffect(() => {
    dispatch(actGetCollectors());
  }, [dispatch]);

  return (
    <div>
      <CustomHeading title="Waste Collectors" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        {loading === "pending" ? (
          <LoadingTable />
        ) : error ? (
          <ErrorBanner
            error={error}
            onRetry={() => dispatch(actGetCollectors())}
          />
        ) : collectors.length === 0 ? (
          <EmptyState message="No collectors found." />
        ) : (
          <DataTable
            columns={columns}
            rows={collectors}
            showExport={false}
            showFilter={false}
          />
        )}
      </Box>
    </div>
  );
};

export default Collectors;
