import { ClothingData } from '@/../../types/clothing';

export function getAllItems(cloth?: ClothingData): string[] {
  if (!cloth) return [];
  return Object.values(cloth.items)
    .flatMap(area => Object.values(area))
    .filter(item => item !== 'none') as string[];
}
