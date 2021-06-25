import type { Api } from '../mangopay';
import type { EventType } from '../type';

type HookStatus = 'DISABLED' | 'ENABLED';
type HookValidity = 'UNKNOWN' | 'VALID' | 'INVALID';

interface Hook {
  Id: string;
  Tag?: string;
  Url: string;
  Status: HookStatus;
  Validity: HookValidity;
  EventType: EventType;
}

interface UpdateHook {
  Status?: HookStatus;
  Url?: string;
}

const baseUrl = 'hooks';
export const hookApi = ({ get, put, post }: Api) => ({
  create(type: EventType, url: string) {
    post(baseUrl, { EventType: type, Url: url });
  },
  update(id: string, hook: UpdateHook) {
    put(`${baseUrl}/${id}`, hook);
  },
  get(id: string): Promise<Hook | undefined> {
    return get(`${baseUrl}/${id}`);
  },
  list(): Promise<Hook[]> {
    return get(baseUrl);
  }
});