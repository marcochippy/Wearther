export const CurrentDate = ({ data }: { data: any }) => {
  const dateObj = new Date(data.dateTime);
  const dateStyling = 'text-lg sm:text-xl md:text-2xl -mt-1 font-medium text-center';

  return (
    <div className="mx-auto px-2 sm:px-0">
      <div className="w-fit mx-auto my-auto">
        <p className={dateStyling}>{dateObj.toLocaleDateString([], { weekday: 'long' })}</p>
        <p className={dateStyling}>
          {dateObj.toLocaleDateString([], { day: '2-digit', month: 'short' })}.{' '}
          {dateObj.toLocaleDateString([], { year: 'numeric' })}
        </p>
        <p className={dateStyling}>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
};
