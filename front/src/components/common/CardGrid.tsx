type CardGridProps = {
  children: React.ReactNode;
};

const CardGrid = ({ children }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {children}
    </div>
  );
};
export default CardGrid;
