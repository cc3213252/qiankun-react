import { userApi } from '@/services';
import { userInfo } from '@/utils/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import classnames from 'classnames/bind';
import { useHistory, useLocation, useModel } from 'umi';
import style from './index.css';

const cx = classnames.bind(style);

const Page = () => {
  const history = useHistory();
  const location: any = useLocation();

  const { initSystem } = useModel('useSystem', (m) => m);

  const onFinish = async (values: any) => {
    const res: any = await userApi.accountLogin({
      name_en: values.name_en,
      password: values.password,
    });

    console.log("res:", res)
    const token = res?.token;
    if (!token) {
      message.error('登入失败');
      return;
    }

    message.success('登录成功');
    userInfo.setToken(token);

    await initSystem();

    const redirect = location.query.redirect;
    if (redirect) {
      window.location.href = redirect;
      return;
    }
    history.replace('/');
  };

  return (
    <div className={cx('page')}>
      <div className={cx('login')}>
        <div className={cx('section')}>
          <div className={cx('header')}>用户登陆</div>
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="name_en"
              rules={[{ required: true, message: '请输入域账号用户名' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="域账号用户名:（例如: san.zhang）"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={cx('btn-submit')}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
