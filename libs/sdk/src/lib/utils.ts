import type { MangoPayContext, Money } from "./type";

export const apiVersion = '2.01';

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
