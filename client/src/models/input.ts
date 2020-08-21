export interface IRecord {
  /**
   * The value of index can either be an increasing integer or a timestamp and both
   */
  index: number;
}

/**
 * Can contain any number of fields. Those fields must be consistent between all the objects, but can be null
 */
export type Data<A extends IRecord> = A[];

export interface Input<A extends IRecord, K extends Exclude<keyof A, 'index'>> {
  data: Data<A>;
  target: K;
}

interface Example {
  index: number;
  price: number;
  interestRate: number;
  borrowRate: number;
  marketCap: number;
}

// * Example Input
const input: Input<Example, 'price'> = {
  data: [
    {
      index: 0,
      price: 123,
      interestRate: 0.3,
      borrowRate: 0.5,
      marketCap: 1e14,
    },
    {
      index: 1,
      price: 456,
      interestRate: 0.32,
      borrowRate: 0.4,
      marketCap: 1e13,
    },
  ],
  target: 'price',
};

export interface GenericInput {
  data: Data<IRecord>;
  target: string;
}
