import type { Api } from "./mangopay";
import type { WithId } from "./type";

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
