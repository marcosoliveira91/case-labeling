import Auth from '../lib/auth';
import styles from '../styles/pages/index.module.scss';
import withSession, { NextRequestWithSession } from '../lib/session';
import { Button, message } from 'antd';
import { GetServerSideProps } from 'next';
import { Layout } from 'antd';
import { MouseEvent, useEffect, useState } from 'react';
import { User } from '../interfaces/user.interface';
import { useRouter } from 'next/router';

const Home: React.FC<{ user: User }> = (props : { user: User }) => {
  const noUser = {
    code: '',
    name: '',
    email: '',
    accessToken: {},
  };
  const router = useRouter();
  const [user, setUser] = useState(props.user ? props.user : noUser);
  const [sessionExists, setSessionExists] = useState(!!user?.email);

  const onLogout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await Auth.logout();
    void message.success(
      <>
        <b>Logout Success</b>
        <p>See you soon!</p>
      </>
    );
    setUser(noUser);
    setSessionExists(false);
  };

  useEffect(() => {
    if (!(user.code)) {
      void router.push('/login', null, { shallow: true });
    }
  }, [user]);

  return (
    <div className='page-container homepage'>
      <Layout.Content className={styles.homeContent}>
        <h1>Doctor Case Review </h1>
        <p>doctorcasereview.gyant.com</p>
        <br/>
        { sessionExists ?
          <>
            <span>
              <b>Logged in as: </b>
              <p>Dr.{user.name}</p>
              {/* <Link href='/api/logout'>
                <a>Logout</a>
              </Link> */}
              <Button type="link" htmlType='submit' onClick={onLogout}>Logout</Button>
            </span>
          </>
          :
          <p>Redirecting to login page</p>
        }

      </Layout.Content>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ user: User }> = withSession(
  async ({ req, _res }: any) => {

    const currentUser = (req as NextRequestWithSession).session.get<User>('user');

    return Promise.resolve({
      props: {
        ...(currentUser && { user : currentUser }),
      },
    });
  }
);


export default Home;
