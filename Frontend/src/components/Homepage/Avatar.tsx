import { ClothingData } from '@/../../types/clothing';

interface AvatarProps {
  currentCloth?: ClothingData;
}

const Avatar = ({ currentCloth }: AvatarProps) => {
  if (!currentCloth) {
    return <h3>No matching cloth for this hour</h3>;
  }

  return (
    <div className="mt-4 flex place-content-center">
      <h3 className="text-base">Hour: {currentCloth.hour}</h3>
      <h3 className="text-base">{currentCloth.items.upper_body.base_layer}</h3>
      <h3 className="text-base">{currentCloth.items.face_area.eye_protection}</h3>
    </div>
  );
};

export default Avatar;
