import React, { memo } from "react";

const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5">
      {children}
    </div>
  );
};
export default memo(CardGrid);
