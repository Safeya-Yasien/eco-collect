import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Ellipsis } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, FreeMode } from "swiper/modules";
import { customerRows } from "@/data/customerRows";

const columns: GridColDef<(typeof customerRows)[number]>[] = [
  { field: "customerID", headerName: "customer ID", width: 200 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "total waste given",
    headerName: "Total Waste Given",
    width: 230,
    editable: true,
  },
  {
    field: "transactionID",
    headerName: "Transaction ID",
    width: 180,
    editable: true,
  },
];

interface ICustomerProps {
  customerID: string;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  imgUrl: string;
}

const Customers = () => {
  return (
    <div>
      <h2 className="text-black text-[32px] font-bold capitalize mb-[40px]">
        customers
      </h2>

      {/* customer carousel */}
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        freeMode={true}
        modules={[Pagination, FreeMode]}
        pagination={{ clickable: true }}
        className="mySwiper h-[260px]"
      >
        {customerRows.map((customer) => (
          <SwiperSlide key={customer.customerID} className="">
            <CustomerCard customer={customer} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* data table */}
      <div className="mt-[50px]">
        <h2 className="text-black text-[20px] md:text-[24px] font-normal capitalize mb-[40px] ">
          current customers
        </h2>
        <Box sx={{ height: 350, width: "100%" }}>
          <DataTable
            columns={columns}
            rows={customerRows}
            showExport={false}
            showFilter={false}
          />
        </Box>
      </div>
    </div>
  );
};
export default Customers;

const CustomerCard = ({ customer }: { customer: ICustomerProps }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="mt-8 p-6 rounded-[12px] shadow-[4px_4px_4px_0px_#00000040] bg-white border-[2px] border-[#B0BEC5]  
                flex justify-between gap-4 relative"
    >
      <div className="flex gap-6 md:gap-[16px] flex-1 flex-col md:flex-row">
        <div className="w-[78px] h-[78px]">
          <img
            src={customer.imgUrl}
            alt={customer.name}
            className="mt-4 mb-4 rounded-full  h-full w-full  object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <p className="flex items-center justify-between text-xs md:text-[16px] ">
            <span>Collector ID</span> {customer.customerID}
          </p>
          <p className="flex items-center justify-between text-xs md:text-[16px] ">
            <span>Collector Name</span> {customer.name}
          </p>
          <p className="flex items-center justify-between text-xs md:text-[16px] ">
            <span>Location</span> {customer.location}
          </p>
          <p className="flex items-center justify-between text-xs md:text-[16px] ">
            <span>Phone Number</span> {customer.phoneNumber}
          </p>
          <p className="flex items-center justify-between text-xs md:text-[16px] ">
            <span>Email</span> {customer.email}
          </p>
        </div>
      </div>

      {/* Three dots menu icon */}
      <div>
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
      </div>
    </div>
  );
};
