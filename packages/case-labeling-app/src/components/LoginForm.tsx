import Auth from '../lib/auth';
import styles from '../styles/components/LoginForm.module.scss';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useRouter } from 'next/router';
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';


const LoginForm: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: Record<string, string>): Promise<void> => {
    const { email, password } = values;

    try {
      const data = await Auth.login({
        email,
        password,
      });

      void message.success(
        <>
          <b>Authentication Success</b>
          <p>{ `Welcome, Dr.${data.name}!` }</p>
        </>
      );

      await router.push('/', null, {
        shallow: true,
      });
    } catch (error) {
      await message.error(
        <>
          <b>Authentication Failure</b>
          <p>Please, try again.</p>
        </>
      );
    }

  };

  return (
    <Form
      name='loginForm'
      className={styles.loginForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[{
          type: 'email',
          required: true,
          message: 'Please input your Email',
        }]}
      >
        <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true,
          message: 'Please input your Password' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className={styles.forgotPassword} href=''>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className={styles.submitButton}>
          Log in
        </Button>
        {/* Or <a href=''>register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
