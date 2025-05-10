
import { config } from '../config';

export const formatCurrency = (value: number): string => {
  return `${config.currency}${value.toFixed(2)}`;
};
