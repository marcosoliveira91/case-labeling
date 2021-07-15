/* eslint-disable no-console */
import styles from '../styles/pages/login.module.scss';
import { LoginForm } from '../components/LoginForm';
import { Layout } from 'antd';
// import { GetServerSideProps } from 'next';

const Login: React.FC = () => (
  <div className='page-container login-page'>
    <Layout.Content className={styles.loginContent} style={{ width: '100%' }}>
      <h2>Doctor Case Review</h2>
      <LoginForm />
    </Layout.Content>
  </div>
);

// export const getServerSideProps: GetServerSideProps = async (_ctx) => {

//   return await Promise.resolve({
//     props: {},
//   });
// };

export default Login;
