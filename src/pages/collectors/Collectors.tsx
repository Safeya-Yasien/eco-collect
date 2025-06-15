import { useEffect } from "react";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/components";

import { CustomHeading } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetCollectors from "@/store/collectors/act/actGetCollectors";
import { ICollector } from "@/types";

const columns: GridColDef<ICollector[]>[] = [
  { field: "collectorID", headerName: "Collector ID", width: 180 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 200, editable: true },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 180,
    editable: true,
  },
];

const Collectors = () => {
  const dispatch = useAppDispatch();
  const { collectors } = useAppSelector((state) => state.collectors);

  useEffect(() => {
    dispatch(actGetCollectors());
  }, [dispatch]);

  return (
    <div>
      <CustomHeading title="Waste Collectors" />

      <Box sx={{ height: "100%", width: "100%" }}>
        <DataTable
          columns={columns}
          rows={collectors}
          showExport={false}
          showFilter={false}
        />
      </Box>
    </div>
  );
};

export default Collectors;
