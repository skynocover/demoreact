import React from 'react';
import axios from 'axios';
import * as antd from 'antd';

import { Notification } from './components/Notification';

interface AppContextProps {
  loginPage: string;
  homePage: string;
  setModal: (modal: any) => void;

  account: string;
  setAccount: (value: string) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;

  fetch: (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    param?: any,
  ) => Promise<any>;

  login: (account: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [loginPage] = React.useState('/#/login');
  const [homePage] = React.useState('/#/contactus');
  const [modal, setModal] = React.useState<any>(null);

  const [account, setAccount] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  /////////////////////////////////////////////////////

  React.useEffect(() => {
    axios.defaults.baseURL = '';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }, []);

  const fetch = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    param?: any,
  ) => {
    let data: any = null;

    try {
      const response = await axios({
        method,
        url,
        data: param,
      });
      console.log('response', response.data);
      if (response.data.errorCode === 999999) {
        window.location.href = loginPage;
        return null;
      }

      if (response.data.errorCode !== 0) {
        throw new Error(response.data.errorMessage);
      }

      data = response.data;
    } catch (error) {
      Notification.add('error', error.message);
    }

    return data;
  };

  const login = async (account: string, password: string): Promise<any> => {
    // const data = await fetch('post', `/api/account/login`, {
    //   account,
    //   password,
    //   code,
    // });

    setAccount(account);

    console.log(account);

    const data = { errorCode: '0' };

    if (data) {
      if (data.errorCode === '0') {
        Notification.add('success', '驗證成功');
        window.location.href = homePage;
      } else {
        window.location.href = loginPage;
      }
    } else {
      window.location.href = loginPage;
    }
  };

  const logout = async () => {
    await fetch('post', '/api/account/logout', {});
    window.location.href = loginPage;
  };

  /////////////////////////////////////////////////////

  return (
    <AppContext.Provider
      value={{
        loginPage,
        homePage,
        setModal: (modal: any) => setModal(modal),

        account,
        setAccount,
        isAdmin,
        setIsAdmin,

        fetch,

        login,
        logout,
      }}
    >
      {modal && (
        <antd.Modal
          visible={modal !== null}
          onOk={() => setModal(null)}
          onCancel={() => setModal(null)}
          footer={null}
          closable={false}
        >
          {modal !== null ? modal : <div />}
        </antd.Modal>
      )}

      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
