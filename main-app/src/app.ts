import qs from 'qs';
import { RequestConfig } from 'umi';
import { userInfo } from './utils/auth';

export const request: RequestConfig = {
  prefix: '/api',
  timeout: 10000 * 5,
  headers: {
    'x-token': userInfo.getToken() || '',
  },
  responseInterceptors: [
    async (response) => {
      const status = response.status;
      if ([402].includes(status) && window.location.pathname !== '/login') {
        setTimeout(() => {
          window.location.href = `/login?${qs.stringify({
            redirect: window.location.href,
          })}`;
        }, 500);
        return response;
      }
      return response;
    },
  ],
  errorConfig: {
    adaptor: (res, ctx) => {
      const status = ctx.res.status;

      if ([402].includes(status)) {
        return {
          ...res,
          success: false,
          errorMessage: res.message,
        };
      }

      return {
        ...res,
      };
    },
  },
};
