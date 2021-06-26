import type { Api, EventType } from '../type';

export type HookStatus = 'DISABLED' | 'ENABLED';
export type HookValidity = 'UNKNOWN' | 'VALID' | 'INVALID';

export interface Hook {
  Id: string;
  Tag?: string;
  Url: string;
  Status: HookStatus;
  Validity: HookValidity;
  EventType: EventType;
}

export interface UpdateHook {
  Status?: HookStatus;
  Url?: string;
}

const baseUrl = 'hooks';
export const hookApi = ({ get, put, post }: Api) => ({
  create(type: EventType, url: string) {
    return post(baseUrl, { EventType: type, Url: url });
  },
  update(id: string, hook: UpdateHook) {
    return put(`${baseUrl}/${id}`, hook);
  },
  get(id: string): Promise<Hook | undefined> {
    return get(`${baseUrl}/${id}`);
  },
  list(): Promise<Hook[]> {
    return get(baseUrl);
  }
});