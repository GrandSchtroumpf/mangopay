import type { Api } from '../type';

export type InvitationStatus = 'ACCEPTED' | 'SENT' | 'EXPIRED';

export interface SSO {
  Id: string;
  Tag: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PermissionGroupId: string;
  Active: '0' | '1',
  InvitationStatus: InvitationStatus;
  LastLoginDate: number;
  ClientId: string;
}

export interface CreateSSO {
  Tag?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PermissionGroupId: string;
}

export interface UpdateSSO {
  FirstName?: string;
  LastName?: string;
  PermissionGroupId?: string;
  Active?: boolean;
}

const baseUrl = 'clients/ssos';
export const ssoApi = ({ get, put, post }: Api) => ({
  create(sso: CreateSSO): Promise<SSO> {
    return post(baseUrl, sso);
  },
  update(id: string, sso: UpdateSSO): Promise<SSO> {
    return put(`${baseUrl}/${id}`, sso);
  },
  get(id: string): Promise<SSO | undefined> {
    return get(`${baseUrl}/${id}`);
  },
  list(): Promise<SSO[]> {
    return get(baseUrl);
  },
  listByPermissionGroup(groupId: string): Promise<SSO[]> {
    return get(`clients/PermissionGroups/${groupId}/SSOs`);
  },
  extendInvitation(id: string): Promise<SSO> {
    return put(`${baseUrl}/${id}/extendinvitation`, {});
  },
});