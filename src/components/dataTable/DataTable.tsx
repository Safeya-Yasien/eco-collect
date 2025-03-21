// import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type TDataTableProps = {
  columns: GridColDef[];
  rows: object[];
  showFilter?: boolean;
  showExport?: boolean;
};

// const CustomToolbar = ({
//   showFilter,
//   showExport,
// }: {
//   showFilter: boolean;
//   showExport: boolean;
// }) => {
//   return (
//     <div className="MuiDataGrid-toolbarContainer flex pt-4 pr-4">
//       {showFilter && <Button className="">Filter</Button>}
//       {showExport && <Button className="">Export</Button>}
//     </div>
//   );
// };
const DataTable = ({
  columns,
  rows,
}: // showFilter = true,
// showExport = true,
TDataTableProps) => {
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
        // slots={{
        //   toolbar: () => (
        //     <CustomToolbar showFilter={showFilter} showExport={showExport} />
        //   ),
        // }}
      />
    </>
  );
};
export default DataTable;
