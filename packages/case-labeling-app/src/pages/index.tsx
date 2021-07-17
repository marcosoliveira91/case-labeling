import ApiClient from '../lib/api-client';
import Auth from '../lib/auth-client';
import React, { MouseEvent, useEffect, useState } from 'react';
import styles from '../styles/pages/index.module.scss';
import withSession, { NextRequestWithSession } from '../lib/session';
import { Case } from '../interfaces/case.interface';
import { CasePanel } from '../components/CasePanel';
import { Condition } from '../interfaces/condition.interface';
import { ConditionsPanel } from '../components/ConditionsPanel';
import { DoctorDecision } from '../interfaces/doctor-decision.interface';
import { getCases } from './api/cases';
import { getConditions } from './api/conditions';
import { GetServerSideProps } from 'next';
import { Header } from '../components/Header';
import { User } from '../interfaces/user.interface';
import {
  Button,
  Form,
  message,
  Statistic,
} from 'antd';
import { NoAuthFallbackMessage } from '../components/NoAuthFallbackMessage';
import { NoCasesFallbackMessage } from '../components/NoCasesFallbackMessage';

interface HomeProps {
  user: Pick<User, 'code' | 'name' | 'email'>;
  cases: Case[];
  conditions: Condition[];
}

const Home: React.FC<HomeProps> = (props : HomeProps) => {
  const { user, cases = [], conditions = [] } = props;
  const userInitialState = {
    code: '',
    name: '',
    email: '',
  };
  const caseInitialState = {
    code: '',
    description: '',
    isReviewed: false,
  };

  const [session, setSession] = useState(() => {
    const account = user ? user : userInitialState;

    return {
      user: account,
      exists: !!account?.code,
    };
  });

  const [caseState, setCaseState] = useState(() => {
    const all: Case[] = cases;
    const unlabeledCases: Case[] = all.filter(c => c.isReviewed === false);
    const current: Case = unlabeledCases.length ? unlabeledCases[unlabeledCases.length - 1] : caseInitialState;

    return {
      all,
      unlabeledCases,
      current,
    };
  });

  useEffect(() => {
    // acts as a callback for when 'caseState' changes
    form.setFieldsValue({ caseCode: caseState.current.code });
  }, [caseState]);

  const [conditionValue, setConditionValue] = useState('');
  const [taskStart, setTaskStart] = useState(() => new Date().getTime());
  const [form] = Form.useForm();

  const onLogout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    void await Auth.logout();
    void message.success(
      <>
        <p>See you soon!</p>
      </>
    );
    setSession(() => ({
      user: userInitialState,
      exists: false,
    }));
  };

  const onConditionChange = (value: string) => {
    setConditionValue(value);
  };

  const onFinish = async (values: Record<string, string>): Promise<void> => {
    const { conditionCode, caseCode } = values;
    const duration = new Date().getTime() - taskStart;

    const response: DoctorDecision = await ApiClient.createDecision({
      caseCode,
      conditionCode,
      duration,
    });

    setCaseState((prevState) => {
      const updatedAll: Case[] = prevState.all.map(_case => _case.code === caseCode ?
        {..._case,
          isReviewed: true,
        } : _case);
      const updatedUnlabeledCases: Case[] = updatedAll.filter(c => !c.isReviewed);
      const next: Case = updatedUnlabeledCases.length ? updatedUnlabeledCases[updatedUnlabeledCases.length - 1] : caseInitialState;

      return {
        all: updatedAll,
        unlabeledCases: updatedUnlabeledCases,
        current: next,
      };
    });

    await message.success(`Decision ${response.code} Created`);
    setTaskStart(() => new Date().getTime());
  };

  return (
    <div className='page-container homepage'>
      <Header withActiveSession={session.exists} withAccount={{ name: session.user.name }} onLogout={onLogout}/>
      { !session.exists && ( <NoAuthFallbackMessage /> )}
      <div className={styles.mainPanel}>
        { session.exists && !!caseState.unlabeledCases.length ? (
          <>
            <div className={styles.sessionStats}>
              <Statistic
                title='Cases to Review'
                value={caseState.all.length - caseState.unlabeledCases.length}
                suffix={`/ ${caseState.all.length}`}
              />
            </div>
            <Form
              form={form}
              name='globalForm'
              onFinish={onFinish}
              className={styles.globalForm}
            >
              <Form.Item
                className={styles.formItem}
                rules={[{ required: true }]}
                name='caseCode'
                initialValue={caseState.current.code}
              >
                <CasePanel case={caseState.current} />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                rules={[{ required: true }]}
                name='conditionCode'
              >
                <ConditionsPanel conditions={conditions} onChange={onConditionChange} value={conditionValue}/>
              </Form.Item>
              <Form.Item>
                <Button className={styles.nextCaseButton} type='primary' htmlType='submit' size={'large'}>Next Case</Button>
              </Form.Item>
            </Form>
          </>
        ) : <NoCasesFallbackMessage />
        }
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = withSession(
  async ({ req, _res }: any) => {

    const { code, email, name, accessToken}: User = (req as NextRequestWithSession).session.get<User>('user');

    if(!code) {
      return {
        props: {},
      };
    }

    const { cases } = await getCases({ token: (accessToken).token});
    const { conditions } = await getConditions({ token: accessToken.token });

    return {
      props: {
        user: {
          code,
          email,
          name,
        },
        cases,
        conditions,
      },
    };
  }
);


export default Home;
