import type { MangoPayContext } from "./mangopay";
import type { Money } from "./type";

export function toMoney(ctx: MangoPayContext, money?: Partial<Money> | number): Money {
  if (!money) return {
    Currency: ctx.currency || 'EUR',
    Amount: 0,
  };
  if (typeof money === 'number') return {
    Currency: ctx.currency,
    Amount: money,
  };
  return {
    Currency: money.Currency || ctx.currency || 'EUR',
    Amount: money.Amount
  }
}
