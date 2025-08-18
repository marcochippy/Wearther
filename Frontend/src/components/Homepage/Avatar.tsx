import { ClothingData } from '@/../../types/clothing';

interface AvatarProps {
  currentCloth?: ClothingData;
}

const Avatar = ({ currentCloth }: AvatarProps) => {
  if (!currentCloth) {
    return <h3>No matching cloth for this hour</h3>;
  }

  const allItems = Object.values(currentCloth.items)
    .flatMap(area => Object.values(area))
    .filter(item => item !== 'none') as string[];

  return (
    <div className="absolute left-1/2 top-30 transform -translate-x-1/2 z-10 ">
      <div className="mt-4 flex flex-col place-content-center">
        {allItems.map((item, index) => (
          <h3 key={index} className="text-sm">
            {item}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Avatar;
