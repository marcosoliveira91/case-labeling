import styles from '../styles/pages/login.module.scss';
import { LoginForm } from '../components/LoginForm';
import { Layout } from 'antd';

const { Content } = Layout;

const Login: React.FC = () => (
  <div className='page-container login-page'>
    <Content className={styles.loginContent} style={{ width: '100%' }}>
      <h2>Doctor Case Review</h2>
      <LoginForm />
    </Content>
  </div>
);

export default Login;
