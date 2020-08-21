import { GenericInput } from '../models/input';
import { Prediction } from '../models/prediction';

const origin = 'http://localhost:3001';

export const predict = (input: GenericInput) => {
  return fetch(new URL('predict', origin).toString(), {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json() as Promise<Prediction>);
};
