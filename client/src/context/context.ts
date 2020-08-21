import { createContext } from 'react';
import { Prediction } from '../models/prediction';

export interface IAppContext {
  prediction: Prediction | null;
  setPrediction: (prediction: Prediction) => void;
}

export const initialAppContext: IAppContext = {
  prediction: null,
  setPrediction: () => {},
};

export const AppContext = createContext(initialAppContext);
