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
      <CustomHeading title=" Waste Collectors" />

      <Box sx={{ height: 350, width: "100%" }}>
        <DataTable
          columns={columns}
          rows={collectors}
          showExport={false}
          showFilter={false}
        />
      </Box>

      {/* Find Collector Section */}
      <h3 className="text-black font-normal text-sm md:text-[24px] mt-[40px]">
        Find out how each collector is doing
      </h3>

      {/* find collector */}
      {/* <div className="flex items-center mt-[20px] gap-[24px]">
        <div className="flex items-center gap-2 flex-wrap ">
          <p className="capitalize font-normal text-sm md:text-[20px]">
            type collector’s Name
          </p>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <input
              type="text"
              value={collectorName}
              onChange={(e) => setCollectorName(e.target.value)}
              placeholder="Search..."
              className="w-[150px] md:w-auto px-4 py-2 border rounded-[83px] outline-none bg-[#DEDEDE]"
            />
            <button
              onClick={handleSearch}
              className="w-[98px] h-[35px] rounded-[8px] bg-[#2E7D32] text-white font-normal text-[16px]"
            >
              Find
            </button>
          </div>
        </div>
      </div> */}

      {/* If collector is found, display details */}
      {/* <div
        className="mt-8 p-6 rounded-[12px] shadow-[4px_4px_4px_0px_#00000040] bg-white border-[2px] border-[#B0BEC5] w-auto lg:w-[520px] 
                         flex justify-between gap-4 relative"
      > */}
      {/* <div className="flex gap-6 md:gap-[16px] flex-1 flex-col md:flex-row">
          <div className="w-[78px] h-[78px]">
            <img
              src={collector.imgUrl}
              alt={collector.name}
              className="mt-4 mb-4 rounded-full  h-full w-full  object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p className="flex items-center justify-between text-xs md:text-[16px] ">
              <span>Collector ID</span> {collector.collectorID}
            </p>
            <p className="flex items-center justify-between text-xs md:text-[16px] ">
              <span>Collector Name</span> {collector.name}
            </p>
            <p className="flex items-center justify-between text-xs md:text-[16px] ">
              <span>Total Waste Collected</span> {collector.totalWaste} kg
            </p>
            <p className="flex items-center justify-between text-xs md:text-[16px] ">
              <span>Completed Transactions</span>{" "}
              {collector.completedTransactions}
            </p>
            <p className="flex items-center justify-between text-xs md:text-[16px] ">
              <span>Ratings</span> {collector.ratings}/5
            </p>
          </div>
        </div> */}

      {/* Three dots menu icon */}
      {/* <div>
          <IconButton onClick={handleClick} className="!p-0">
            <Ellipsis />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>View Details</MenuItem>
          </Menu>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Collectors;
