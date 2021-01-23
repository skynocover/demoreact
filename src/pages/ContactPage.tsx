import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';

const ContactPage = () => {
  const [dataSource, setDataSource] = React.useState<Contact[]>([]); //coulmns data

  const initialize = async () => {
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
  };

  React.useEffect(() => {
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
      dataIndex: 'repository',
      align: 'center',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      align: 'center',
    },
  ];

  return (
    <>
      <antd.Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export { ContactPage };
