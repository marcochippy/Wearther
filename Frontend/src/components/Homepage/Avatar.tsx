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
    <div className=" ">
      <div className="-mt-40 flex flex-wrap place-content-center">
        {allItems.map((item, index) =>
          failedImages.includes(item) ? null : (
            <div key={index} className=" ">
              <img
                src={`/Avatar/${item}.webp`}
                alt=""
                className="w-50 rounded-2xl border m-3"
                onError={() => handleImageError(item)}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Avatar;
