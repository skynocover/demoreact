import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';
import * as cookie from 'js-cookie';
import { gql } from '@apollo/client';

import { AppContext } from '../AppContext';

const ContactPage = () => {
  const appCtx = React.useContext(AppContext);
  const [dataSource, setDataSource] = React.useState<Contact[]>([]); //coulmns data

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(0);
  const pageSize = 10;

  const initialize = async (page: number = currentPage) => {
    // let result = await appCtx.apolloClient.query({
    //   query: gql`
    //     query evaluations {
    //       evaluations {
    //         id
    //       }
    //     }
    //   `,
    // });
    setDataSource([
      {
        key: '1',
        name: 'Mike',
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        address: '10 Downing Street',
      },
    ]);
    setTotal(20);
    setCurrentPage(page);
  };

  React.useEffect(() => {
    let user = JSON.parse(cookie.get('user') || '{}');
    initialize();
  }, []);

  interface Contact {
    key: string;
    name: string;
    address: string;
  }

  const columns: ColumnsType<Contact> = [
    {
      title: 'Repository',
      align: 'center',
      dataIndex: 'repository',
    },
    {
      title: 'Tag',
      align: 'center',
      render: (item) => <></>,
    },
  ];

  return (
    <>
      <antd.Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page) => initialize(page),
        }}
      />
    </>
  );
};

export { ContactPage };
