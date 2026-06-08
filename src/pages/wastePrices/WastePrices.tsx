import { lazy, useEffect, useState, useCallback, useMemo } from "react";

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
import { ErrorBanner } from "@/components/common";
import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/ui/Toast";

import { actGetWastePrices } from "@/store/waste/act/actGetWastePrices";
import { IWastePrice } from "@/types";
import { actUpdateWastePrices } from "@/store/waste/act/actUpdateWastePrices";

const DataTable = lazy(() => import("@/components/dataTable/DataTable"));

const WastePrices = () => {
  const dispatch = useAppDispatch();
  const { wastePrices, loading, error } = useAppSelector(
    (state) => state.waste,
  );
  const { showToast } = useToast();

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

  const handleOpen = useCallback((id: number) => {
    setSelectedId(id);
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    setSelectedId(null);
    setNewPrice("");
  }, []);

  const handleSavePrice = useCallback(async () => {
    if (selectedId && newPrice) {
      const result = await dispatch(
        actUpdateWastePrices({ id: selectedId, price_per_kg: newPrice }),
      );
      if ((result as any)?.meta?.requestStatus === "fulfilled") {
        showToast("Price updated", "success");
      } else {
        showToast("Failed to update price", "error");
      }
      dispatch(actGetWastePrices());
      handleCloseDialog();
    }
  }, [dispatch, selectedId, newPrice, handleCloseDialog, showToast]);

  const getColumns = (
    handleChangePrice: (id: number) => void,
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

  const columnsMemo = useMemo(() => getColumns(handleOpen), [handleOpen]);

  return (
    <div>
      <CustomHeading title="waste prices" />

      <Box sx={{ minHeight: 500, width: "100%" }}>
        {loading === "pending" ? (
          <div className="p-8">
            <Spinner />
          </div>
        ) : error ? (
          <ErrorBanner
            error={error}
            onRetry={() => dispatch(actGetWastePrices())}
          />
        ) : (wastePrices ?? []).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No waste prices available.
          </div>
        ) : (
          <DataTable columns={columnsMemo} rows={wastePrices ?? []} />
        )}
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
