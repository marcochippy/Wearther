// import { ClothingData } from '@/../../types/clothing';
// import { useState } from 'react';

// interface AvatarProps {
//   currentCloth?: ClothingData;
// }

// const Avatar = ({ currentCloth }: AvatarProps) => {
//   const [failedImages, setFailedImages] = useState<string[]>([]);

//   if (!currentCloth) {
//     return <h3>No matching cloth for this hour</h3>;
//   }

//   const allItems = Object.values(currentCloth.items)
//     .flatMap(area => Object.values(area))
//     .filter(item => item !== 'none') as string[];

//   const handleImageError = (item: string) => {
//     setFailedImages(prev => [...prev, item]);
//   };

//   return (
//     <div className=" ">
//       <div className="-mt-40 flex flex-wrap place-content-center">
//         {allItems.map((item, index) =>
//           failedImages.includes(item) ? null : (
//             <div key={index} className=" ">
//               <img
//                 src={`/Avatar/${item}.webp`}
//                 alt=""
//                 className="w-50 rounded-2xl border m-3"
//                 onError={() => handleImageError(item)}
//               />
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Avatar;

import { ClothingData } from '@/../../types/clothing';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Context from '@/utils/Context';

interface AvatarProps {
  currentCloth?: ClothingData;
}

const Avatar = ({ currentCloth }: AvatarProps) => {
  const { getClothing, setClothData } = useContext(Context);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const hydrateGuard = useRef(false);
  const API_URL = (import.meta as any).env?.VITE_API_URL as string | undefined;

  const allItems = useMemo(() => {
    if (!currentCloth) return [];
    return Object.values(currentCloth.items)
      .flatMap(area => Object.values(area))
      .filter(item => item !== 'none') as string[];
  }, [currentCloth]);

  useEffect(() => {
    if (!currentCloth) return;
    if (allItems.length === 0 && !hydrateGuard.current && API_URL) {
      hydrateGuard.current = true;
      (async () => {
        try {
          const res = await fetch(`${API_URL}/ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          if (res.ok) {
            const clothing = await getClothing();
            setClothData(clothing);
          }
        } catch {}
      })();
    }
  }, [currentCloth, allItems.length, API_URL, getClothing, setClothData]);

  const handleImageError = (item: string) => {
    setFailedImages(prev => [...prev, item]);
  };

  if (!currentCloth) {
    return <h3>No matching cloth for this hour</h3>;
  }

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
