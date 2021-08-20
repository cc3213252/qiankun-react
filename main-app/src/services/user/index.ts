import { request } from 'umi';

export function accountLogin<T>(params: { name_en: string; password: string }) {
  return request<T>(`/user/users/login/`, {
    method: 'POST',
    data: params,
  });
}

export async function queryCurrent<T>() {
  return request<T>(`/user/users/current_user/`);
}

export async function queryMenu<T>() {
  return request<T>(`/user/users/menu/`);
}
