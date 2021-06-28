import type { MangoPayContext, Money } from "./type";

export function toMoney(ctx: MangoPayContext, money?: Money | number): Money {
  if (!money) return {
    Currency: ctx.currency || 'EUR',
    Amount: 0,
  };
  if (typeof money === 'number') {
    if (!ctx.currency) throw new Error('Missing context.currency for money as number');
    return {
      Currency: ctx.currency,
      Amount: money,
    };
  }
  return money;
}

export function toTimestamp(date: Date): number {
  if (date instanceof Date) return date.getTime() / 1000;
  if (typeof date === 'string') return new Date(date).getTime() / 1000;
  return date / 1000;
}

export function fromTimestamp(timestamp: number) {
  return new Date(timestamp * 1000);
}

export interface Converter<T> {
  date?: (keyof T)[];
  money?: (keyof T)[];
}

export function toMangoPay<T = any>(origin: T, converter: Converter<T>) {
  const transform: Partial<{ [keys in keyof T]: number | Money }> = {};
  if (converter.date) {
    for (const key of converter.date) {
      if (origin[key]) transform[key] = toTimestamp(origin[key] as any);
    }
  }
  if (converter.money) {
    for (const key of converter.money) {
      if (origin[key]) transform[key] = toMoney(origin[key]);
    }
  }
  return {
    ...origin,
    ...transform,
  }
}

export function fromMangoPay<T = any>(origin: T, converter: Converter<T>): T {
  const transform: Partial<{ [keys in keyof T]: Date }> = {};
  if (converter.date) {
    for (const key of converter.date) {
      if (origin[key]) transform[key] = fromTimestamp(origin[key] as any);
    }
  }
  return {
    ...origin,
    ...transform,
  }
}