import React from 'react';
import { Input, Button, Table, Tag } from 'antd';
const { TextArea } = Input;

export default class LL extends React.PureComponent {
  state = {
    str: `i+i*i#`,
    data: []
  };
  handleStr = e => {
    this.setState({ str: e.target.value });
  };
  hanldePost = () => {
    const { str } = this.state;
    fetch('/ll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ str })
    })
      .then(res => res.json())
      .then(res => {
        const data = res.map((item, index) => {
          return {
            index,
            ...item
          };
        });
        this.setState({ data });
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
        key: 'stack',
        render: text => <span style={{ width: '25%' }}> {text} </span>
      },
      {
        title: 'input',
        dataIndex: 'input',
        key: 'input',
        render: text => <span style={{ width: '25%' }}> {text} </span>
      },
      {
        title: 'prod',
        dataIndex: 'prod',
        key: 'prod',
        render: text => <span style={{ width: '25%' }}> {text}</span>
      }
    ];
    const { str, data } = this.state;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-satrt' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '46%', margin: '0 2%' }}>
          <TextArea rows={20} autosize={{ maxRows: 20 }} value={str} onChange={this.handleStr} />
          <Button type="primary" onClick={this.hanldePost}>
            分析
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.index}
          style={{ width: '46%', margin: '0 2%' }}
        />
      </div>
    );
  }
}
