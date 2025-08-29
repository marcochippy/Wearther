const RainInfo = ({ rain }: { rain: any }) => {
  return (
    <div className="w-full sm:w-30 h-20 sm:h-30 rounded-2xl p-3 place-content-center bg-white items-center flex">
      <div className="mx-auto">
        <p className="text-lg sm:text-xl font-bold text-center">Rain</p>
        <p className="text-md text-center">{rain}%</p>
      </div>
    </div>
  );
};

export default RainInfo;
