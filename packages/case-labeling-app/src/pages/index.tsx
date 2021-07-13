import styles from '../styles/pages/index.module.scss';
import { Layout } from 'antd';

const Home: React.FC = () => {
  return (
    <div className='page-container homepage'>
      <Layout.Content className={styles.homeContent}>
        <h1>Welcome, 👋 !</h1>
      </Layout.Content>
    </div>
  );
};

export default Home;
