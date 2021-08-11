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
  boolean?: (keyof T)[];
  // Context
  currency?: (keyof T)[];
  country?: (keyof T)[];
  lang?: (keyof T)[];
}

export const toMangoPay = <T = any>(converter: Converter<T>) => (origin: any, context?: MangoPayContext) => {
  const transform: Partial<{ [keys in keyof T]: number | Money | boolean }> = {};
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
  if (converter.boolean) {
    for (const key of converter.boolean) {
      if (origin[key]) transform[key] = !!origin[key];
    }
  }
  if (converter.currency) {
    for (const key of converter.currency) {
      if (origin[key]) transform[key] = origin[key] ?? context?.currency;
    }
  }
  if (converter.country) {
    for (const key of converter.country) {
      if (origin[key]) transform[key] = origin[key] ?? context?.country;
    }
  }
  if (converter.lang) {
    for (const key of converter.lang) {
      if (origin[key]) transform[key] = origin[key] ?? context?.lang;
    }
  }
  return {
    ...origin,
    ...transform,
  }
}

export const fromMangoPay = <T = any>(converter: Converter<T>) => (origin: any): T => {
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



export interface PaginationParams {
  Page?: number;
  Per_Page?: number;
  Sort?: 'DESC' | 'ASC';
  Before_Date?: Date;
  After_Date?: Date;
}

export function toPagination<T>(queryParams: PaginationParams, sortBy?: keyof T) {
  const params: Partial<Record<keyof PaginationParams, string | number>> = {};
  if (queryParams.Sort) params.Sort = `${sortBy || 'CreationDate'}:${queryParams.Sort}`;
  if (queryParams.Before_Date) params.Before_Date = toTimestamp(queryParams.Before_Date);
  if (queryParams.After_Date) params.After_Date = toTimestamp(queryParams.After_Date);
  return {
    ...queryParams,
    ...params,
  };
}