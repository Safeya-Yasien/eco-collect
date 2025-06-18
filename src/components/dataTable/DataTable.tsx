import { GridColDef, GridToolbar } from "@mui/x-data-grid";
import { lazy, Suspense } from "react";

const DataGrid = lazy(() =>
  import("@mui/x-data-grid").then((mod) => ({ default: mod.DataGrid }))
);

type TDataTableProps = {
  columns: GridColDef[];
  rows: object[];
  showFilter?: boolean;
  showExport?: boolean;
};

const DataTable = ({ columns, rows }: TDataTableProps) => {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Loading table...</div>}
    >
      <DataGrid
        className="!bg-white !border-[2px] !border-[#B0BEC5] !shadow-[4px_4px_4px_0px_#00000040] !rounded-xl relative"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[1, 5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        slots={{ toolbar: GridToolbar }}
      />
    </Suspense>
  );
};

export default DataTable;
