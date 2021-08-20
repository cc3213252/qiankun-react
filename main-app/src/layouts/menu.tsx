import { userInfo } from '@/utils/auth';
import { CloudServerOutlined, UserOutlined } from '@ant-design/icons';
import ProLayout, {
  DefaultFooter,
  ProBreadcrumb,
} from '@ant-design/pro-layout';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import classNames from 'classnames/bind';
import { useHistory, useModel } from 'umi';
import style from './menu.css';

import { useMount } from 'ahooks';

const IconMap = {
  UserOutlined: <UserOutlined />,
  CloudServerOutlined: <CloudServerOutlined />,
};

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

const cx = classNames.bind(style);

export default function LayoutComponent({ children }: { children: any }) {
  const history = useHistory();

  const { menu, user, initSystem } = useModel('useSystem', (m) => m);
  console.log("menu:", menu)

  const handleMenuClick = (param: any) => {
    if (param.key === 'logout') {
      userInfo.setToken('-');
      history.replace('/login');
    }
  };

  useMount(() => {
    if (window.location.pathname !== '/login') {
      initSystem();
    }

    if (window.location.pathname != '/index'){
      window.location.replace('/index');
    }
    // window.location.replace('/index');
    // if (window.location.pathname === '/') {
    //   window.location.replace('/login');
    // }
  });

  return window.location.pathname === '/' ? null : (
    <ProLayout
      fixSiderbar
      title="管理系统"
      rightContentRender={() => (
        <Space>
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClick}>
                <Menu.Item key="logout">退出系统</Menu.Item>
              </Menu>
            }
          >
            <Avatar src={user?.avatar} />
          </Dropdown>
        </Space>
      )}
      headerContentRender={() => <ProBreadcrumb />}
      menuDataRender={() => loopMenuItem(menu)}
      menu={{}}
      menuItemRender={(item, dom) => {
        return <div onClick={() => history.push(item.path!)}>{dom}</div>;
      }}
    >
      <div className={cx('layout')}>{children}</div>
      <DefaultFooter
        links={[
          {
            title: 'Powered by cyd.',
            key: 'Powered',
            href: '/user/user/list',
          },
        ]}
        copyright="物业管理部"
      ></DefaultFooter>
    </ProLayout>
  );
}
