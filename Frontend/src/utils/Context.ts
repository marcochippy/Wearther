import { createContext, Dispatch, SetStateAction } from 'react';
import { ClothingData } from '../../../types/clothing';
import { ApiData } from '../../../types/hourly';

export type SlideContextValue = {
  oldSlide: number;
  setOldSlide: Dispatch<SetStateAction<number>>;

  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;

  activeSlide2: number;
  setActiveSlide2: Dispatch<SetStateAction<number>>;

  weatherData: ApiData[] | null;
  clothData: ClothingData[] | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const setterNumber: Dispatch<SetStateAction<number>> = () => {};
const setterBoolean: Dispatch<SetStateAction<boolean>> = () => {};

const Context = createContext<SlideContextValue>({
  oldSlide: 0,
  setOldSlide: setterNumber,
  activeSlide: 0,
  setActiveSlide: setterNumber,
  activeSlide2: 0,
  setActiveSlide2: setterNumber,
  weatherData: null,
  clothData: null,
  setLoading: setterBoolean
});

export default Context;
