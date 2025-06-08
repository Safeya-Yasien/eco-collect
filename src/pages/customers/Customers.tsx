import { useEffect } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";

import { ICustomer } from "@/types";
import { DataTable } from "@/components";
import { CustomHeading } from "@/components/shared";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetCustomers from "@/store/customers/act/actGetCustomers";

const columns: GridColDef<ICustomer>[] = [
  { field: "user_id", headerName: "customer ID", width: 200 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "total_points",
    headerName: "Total Points",
    width: 230,
    editable: true,
  },
  {
    field: "total_balance",
    headerName: "Total Balance",
    width: 180,
    editable: true,
  },
];

const Customers = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);

  useEffect(() => {
    dispatch(actGetCustomers());
  }, [dispatch]);


  return (
    <div>
      <CustomHeading title="customers" />

      {/* data table */}
      <div className="mt-[50px]">
        <Box sx={{ height: 350, width: "100%" }}>
          <DataTable
            columns={columns}
            rows={customers}
            showExport={false}
            showFilter={false}
          />
        </Box>
      </div>
    </div>
  );
};
export default Customers;
