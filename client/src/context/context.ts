import { createContext } from 'react';
import { GenericInput } from '../models/input';
import { Prediction } from '../models/prediction';

export interface IAppContext {
  prediction: Prediction | null;
  setPrediction: (prediction: Prediction) => void;
  input: GenericInput | null;
  setInput: (input: GenericInput) => void;
}

export const initialAppContext: IAppContext = {
  prediction: null,
  setPrediction: () => {},
  input: null,
  setInput: () => {},
};

export const AppContext = createContext(initialAppContext);
