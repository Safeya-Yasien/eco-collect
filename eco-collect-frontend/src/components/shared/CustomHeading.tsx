const CustomHeading = ({ title }: { title: string }) => {
  return (
    <h2 className="text-black text-[20px] sm:text-[32px] font-bold capitalize mb-[40px]">
      {title}
    </h2>
  );
};
export default CustomHeading;
