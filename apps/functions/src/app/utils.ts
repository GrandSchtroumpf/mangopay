import type { Api, MangoPayContext } from "./mangopay";
import type { Money, WithId } from "./type";

export function entityApi<T extends { Id: string }>(baseUrl: string, { post, put, get }: Api) {
  return {
    create(data: T) {
      return post<T, T>(baseUrl, data);
    },
    update(data: WithId<T>) {
      return put<WithId<T>, T>(`${baseUrl}/${data.Id}`, data);
    },
    get(id: string) {
      return get<T | undefined>(`${baseUrl}/${id}`);
    },
    list(userId: string) {
      return get<T[]>(`${userId}/${baseUrl}`);
    }
  }
}

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