import moment from 'moment';
import { pipe } from 'ramda';
import { GenericInput, IRecord } from '../models/input';

export const mapDate = (
  data: Array<{ index: string | number }>,
): GenericInput['data'] => {
  return data.map((record) => {
    if (typeof record.index === 'string') {
      const date = moment(record.index, 'DD-MM-YYYY');
      const milliseconds = date.valueOf();
      return { ...record, index: milliseconds };
    } else {
      return record as GenericInput['data'][number];
    }
  });
};

export const extractProperties = (data: GenericInput['data']) => {
  return data.map((record) =>
    Object.entries(record).reduce((newRecord, [key, value]) => {
      if (typeof value === 'object') {
        return { ...newRecord, ...value };
      } else {
        return { ...newRecord, [key]: value };
      }
    }, {} as typeof record),
  );
};

export const filterByIndex = (data: GenericInput['data']) => {
  return Object.values(
    data.reduce(
      (dataMap, record) => ({ ...dataMap, [record.index]: record }),
      {} as Record<number, IRecord>,
    ),
  );
};

const filterCommonProperties = (data: GenericInput['data']) => {
  const commonProperties = Object.keys(data[0]);

  const filtered = data.map(
    (record) =>
      Object.fromEntries(
        Object.entries(record).filter(([key]) =>
          commonProperties.includes(key),
        ),
      ) as IRecord,
  );

  return filtered;
};

export const transformData = pipe(
  mapDate,
  extractProperties,
  filterByIndex,
  filterCommonProperties,
);
