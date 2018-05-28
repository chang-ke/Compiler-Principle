import React from 'react';
import { Input, Button, Table, Tag } from 'antd';
const { TextArea } = Input;


export class Main extends React.PureComponent {
  state = {
    str: `i+i*i#`,
    data: []
  };
  handleStr = e => {
    this.setState({ str: e.target.value }, this.hanldePost);
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
          const keys = Object.keys(item);
          return {
            index: index + 1,
            word: item[keys[0]],
            tuple: item.tuple,
            type: keys[0].toUpperCase(),
            position: item.position
          };
        });
        this.setState({ data });
      });
  };
  renderTags = () => {
    const colors = {
      IDENTIFIER: 'cyan',
      NUMBER: '	#EEC900',
      KEY: '#8E388E',
      COMMENT: '#87d068',
      OPERATOR: '#108ee9',
      ERROR: '#fD2626',
      DELIMITER: '#8E8E38'
    };
    const { data } = this.state;
    return data.map(item => {
      return (
        <Tag color={colors[item.type]} key={item.index}>
          {item.word}
        </Tag>
      );
    });
  };
  render() {
    const columns = [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'word',
        dataIndex: 'word',
        key: 'word',
        render: text => <span style={{ width: '25%' }}> {text} </span>
      },
      {
        title: 'tuple',
        dataIndex: 'tuple',
        key: 'tuple',
        render: text => <span style={{ width: '25%' }}> {text} </span>
      },
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        render: text => <span style={{ width: '25%' }}> {text}</span>
      },
      {
        title: 'position',
        dataIndex: 'position',
        key: 'position',
        render: text => <span style={{ width: '25%' }}> {text} </span>
      }
    ];
    const { str, data } = this.state;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-satrt' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '46%', margin: '0 2%' }}>
          <TextArea rows={20} autosize={{maxRows:20}} value={str} onChange={this.handleStr} />
          <div
            style={{
              border: '1px #ccc solid',
              borderRadius: '5px',
              minHeight: '100px',
              minWidth: '100%',
              boxShadow: '0 0 3px #ccc'
            }}
          >
            记号块：<br />
            {this.renderTags()}
          </div>
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

