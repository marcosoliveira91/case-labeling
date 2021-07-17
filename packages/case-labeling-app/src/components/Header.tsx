import styles from '../styles/components/Header.module.scss';
import { Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  withActiveSession: boolean;
  withAccount: { name: string };
  onLogout: (event: MouseEvent<HTMLElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ withActiveSession, onLogout, withAccount }: HeaderProps) => {
  const router = useRouter();

  const onClick = () => {
    void router.push('/login', null, { shallow: true });
  };

  return (
    <header className={styles.headerContent}>
      { withActiveSession ?
        (
          <div className={styles.headerContainer}>
            <p className={styles.headerItem}><UserOutlined className={styles.userLogo} /></p>
            <p className={`${styles.headerItem} ${styles.userName} ${styles.text}`}>
              <span className={`${styles.userPrefix} ${styles.text}`}>Dr.</span>
              {withAccount.name}
            </p>
            <span className={`${styles.headerItem} ${styles.separator}`}>|</span>
            <Button className={`${styles.headerItem} ${styles.logoutButton}`} type='link' htmlType='submit' onClick={onLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className={styles.headerContainer}>
            <p className={styles.headerItem}><LoginOutlined className={styles.loginLogo} /></p>
            <Button
              className={`${styles.headerItem} ${styles.loginButton}`}
              type='link'
              htmlType='submit'
              onClick={onClick}>
                Log In
            </Button>
          </div>
        )
      }
    </header>
  );
};
