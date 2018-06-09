import React from 'react';
import { Input, Button, Table, Tag } from 'antd';
const { TextArea } = Input;

export default class LL extends React.PureComponent {
  state = {
    str: `i+i*i#`,
    data: {}
  };
  handleStr = e => {
    this.setState({ str: e.target.value });
  };
  hanldePost = () => {
    const { str } = this.state;
    fetch('/ll', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ str })
    })
      .then(res => res.json())
      .then(res => {
        res[2] = res[2].map(arr => {
          let obj = {};
          for (let i = 0; i < arr.length; ++i) {
            obj[res[1][i]] = arr[i];
          }
          return obj;
        });
        res[0] = res[0].map((item, index) => {
          return {
            index,
            ...item
          };
        });
        this.setState({ data: res });
      });
  };

  render() {
    const columns = [
      {
        title: 'step',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'stack',
        dataIndex: 'stack',
        key: 'stack'
      },
      {
        title: 'input',
        dataIndex: 'input',
        key: 'input'
      },
      {
        title: 'prod',
        dataIndex: 'prod',
        key: 'prod'
      },
      {
        title: 'action',
        dataIndex: 'action',
        key: 'action'
      }
    ];
    const column = [
      {
        title: '#',
        dataIndex: '#',
        key: '#'
      },
      {
        title: '(',
        dataIndex: '(',
        key: '('
      },
      {
        title: ')',
        dataIndex: ')',
        key: ')'
      },
      {
        title: '+',
        dataIndex: '+',
        key: '+'
      },
      {
        title: '-',
        dataIndex: '-',
        key: '-'
      },
      {
        title: '*',
        dataIndex: '*',
        key: '*'
      },
      {
        title: '/',
        dataIndex: '/',
        key: '/'
      },
      {
        title: 'i',
        dataIndex: 'i',
        key: 'i'
      }
    ];
    const { str, data } = this.state;
    console.log(data);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-satrt' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '16%', margin: '0 1%' }}>
          <TextArea rows={10} autosize={{ minRows: 10 }} value={str} onChange={this.handleStr} />
          <Button type="primary" onClick={this.hanldePost}>
            分析
          </Button>
        </div>
        <Table
          columns={column}
          dataSource={data[2]}
          rowKey={record => record.index}
          style={{ width: '35%', margin: '0 1%' }}
        />
        <Table
          columns={columns}
          dataSource={data[0]}
          rowKey={record => record.index}
          style={{ width: '35%', margin: '0 1%' }}
        />
      </div>
    );
  }
}
