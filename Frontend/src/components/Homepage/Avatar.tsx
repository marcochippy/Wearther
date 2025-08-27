import { ClothingData } from '@/../../types/clothing';
import { useContext, useMemo } from 'react';
import Context from '@/utils/Context';

interface AvatarProps {
  currentCloth?: ClothingData;
}

const Avatar = ({ currentCloth }: AvatarProps) => {
  const { loading } = useContext(Context);

  const allItems = useMemo(() => {
    if (!currentCloth) return [];
    return Object.values(currentCloth.items)
      .flatMap(area => Object.values(area))
      .filter(item => item !== 'none') as string[];
  }, [currentCloth]);

  if (!currentCloth && loading) {
    return <h3>Getting data...</h3>;
  }

  return (
    <div className=" ">
      <div className="-mt-40 flex flex-wrap place-content-center">
        {allItems.map((item, index) => (
          <div key={index} className=" ">
            <img src={`/Avatar/${item}.webp`} alt="" className="w-50 rounded-2xl border m-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatar;
