import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type TDataTableProps = {
  columns: GridColDef[];
  rows: object[];
};

const DataTable = ({ columns, rows }: TDataTableProps) => {
  return (
    <>
      <DataGrid
        className="!bg-white !border-[2px] !border-[#B0BEC5] !shadow-[4px_4px_4px_0px_#00000040] !rounded-xl relative "
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        slots={{ toolbar: GridToolbar }}
      />
    </>
  );
};
export default DataTable;
