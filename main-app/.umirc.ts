import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      name: 'sub-app-1',
      icon: 'smile',
      path: '/sub-app-1',
      microApp: 'sub-app-1',
    },
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'sub-app-1', // 唯一 id
          entry: '//localhost:8001', // html entry
        },
      ],
    },
  },
});
