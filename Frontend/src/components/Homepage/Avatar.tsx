import { ClothingData } from '@/../../types/clothing';
import { useState } from 'react';

interface AvatarProps {
  currentCloth?: ClothingData;
}

const Avatar = ({ currentCloth }: AvatarProps) => {
  const [failedImages, setFailedImages] = useState<string[]>([]);

  if (!currentCloth) {
    return <h3>No matching cloth for this hour</h3>;
  }

  const allItems = Object.values(currentCloth.items)
    .flatMap(area => Object.values(area))
    .filter(item => item !== 'none') as string[];

  const handleImageError = (item: string) => {
    setFailedImages(prev => [...prev, item]);
  };

  return (
    <div className="absolute left-1/2 top-30 transform -translate-x-1/2 z-10 ">
      <div className="mt-4 flex flex-col place-content-center border h-50 w-40 pixelated">
        <img src="/Avatar/BaseAvatar.png" alt="" className="h-50 w-40" />
        {allItems.map((item, index) =>
          failedImages.includes(item) ? null : (
            <div key={index} className="absolute -left-[1px] border h-50 w-40">
              <img src={`/Avatar/${item}.png`} alt="" className="h-50 w-40" onError={() => handleImageError(item)} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Avatar;
