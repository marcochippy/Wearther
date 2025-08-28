import Context from '@/utils/Context';
import { useContext, useMemo } from 'react';

const RainNotification = () => {
  const { clothData, loading } = useContext(Context);

  const allItems = useMemo(() => {
    if (!clothData || clothData.length === 0) return [];
    return clothData
      .flatMap(cd => Object.values(cd.items))
      .flatMap(area => Object.values(area))
      .filter(item => item !== 'none') as string[];
  }, [clothData]);

  const hasUmbrella = allItems.includes('umbrella');

  if (loading) {
    return <div>Checking clothes...</div>;
  }

  if (!hasUmbrella) return null;

  return (
    <div>
      <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 mt-2 md:text-center text-left flex place-content-center-safe gap-5">
        <img src={`/Avatar/umbrella.webp`} alt="umbrella" className="w-20 rounded-2xl border m-3" />
        <p className="text-blue-800 my-auto font-semibold">
          It's supposed to rain for the next few hours. <br />
          Don't forget your umbrella!
        </p>
      </div>
    </div>
  );
};

export default RainNotification;
