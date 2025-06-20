import { lazy, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GridColDef } from "@mui/x-data-grid";

import { CustomHeading } from "@/components/shared";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { actGetWastePrices } from "@/store/waste/act/actGetWastePrices";
import { IWastePrice } from "@/types";
import { actUpdateWastePrices } from "@/store/waste/act/actUpdateWastePrices";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const WastePrices = () => {
  const dispatch = useAppDispatch();
  const wastePrices = useAppSelector((state) => state.waste.wastePrices);

  // State for dialog
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");

  useEffect(() => {
    dispatch(actGetWastePrices());
  }, [dispatch]);

  const handleOpenDialog = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedId(null);
    setNewPrice("");
  };

  const handleSavePrice = async () => {
    if (selectedId && newPrice) {
      await dispatch(
        actUpdateWastePrices({ id: selectedId, price_per_kg: newPrice })
      );
      dispatch(actGetWastePrices());
      handleCloseDialog();
    }
  };

  const getColumns = (
    handleChangePrice: (id: number) => void
  ): GridColDef<IWastePrice>[] => [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Waste Name",
      width: 200,
    },
    {
      field: "price_per_kg",
      headerName: "Price per KG",
      width: 200,
    },
    {
      field: "change_price",
      headerName: "Change Price",
      width: 200,
      renderCell: (params) => (
        <button
          onClick={() => handleChangePrice(params.row.id)}
          className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-2.5 py-1 rounded-md shadow-sm text-sm font-medium"
        >
          Change
        </button>
      ),
    },
  ];

  return (
    <div>
      <CustomHeading title="waste prices" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        <DataTable
          columns={getColumns(handleOpenDialog)}
          rows={wastePrices ?? []}
        />
      </Box>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Change Price</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Price per KG"
            type="number"
            fullWidth
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePrice} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default WastePrices;
