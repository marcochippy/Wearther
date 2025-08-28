export const DateInfo = ({ date }: { date: string }) => {
  const dateObj = new Date(date);
  const dateStyling = 'text-3xl font-medium text-left';

  return (
    <div className="w-fit my-auto">
      <p className={dateStyling}>{dateObj.toLocaleDateString([], { weekday: 'long' })}</p>
      <p className={dateStyling}>
        {dateObj.toLocaleDateString([], { day: '2-digit', month: 'short' })}.{' '}
        {dateObj.toLocaleDateString([], { year: 'numeric' })}
      </p>
      <p className={dateStyling}>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  );
};
