import { useRequest } from 'ahooks';
import { userApi } from '@/services';

export default function useSystem() {
  const { data: menu = [], run: getMenu } = useRequest<any[]>(
    userApi.queryMenu,
    {
      manual: true,
    },
  );

  const { data: user = {}, run: getUser } = useRequest<any>(
    userApi.queryCurrent,
    {
      manual: true,
    },
  );

  const initSystem = () => {
    getUser();
    getMenu();
  };

  return {
    menu,
    user,
    initSystem,
  };
}
