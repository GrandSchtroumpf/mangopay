import type { Api, EventType } from '../type';

export interface Event {
  Id: string;
  ResourceId: string;
  Date: number;
  EventType: EventType;
}

const baseUrl = 'events';
export const eventApi = ({ get }: Api) => ({
  get(id: string): Promise<Event | undefined> {
    return get(`${baseUrl}/${id}`);
  },
  list(type?: EventType): Promise<Event[]> {
    const queryParams = type ? { EventType: type } : {};
    return get(baseUrl, queryParams);
  }
});