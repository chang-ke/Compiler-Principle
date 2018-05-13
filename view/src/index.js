import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
const { TextArea } = Input;
class Main extends React.PureComponent {
  state = {
    str: `int main() {
      auto c** = 6;
      //这是注释
      string str = "wodec";
      char c = 'd;
      @
      for (b = 6e+3; b <+ 15; ++b) {
         int a=a+++-_b;
          if(b >cc 10){
              long c = 0.99;
          }else{
              const d = 3e9;
          }
      }
      _#dd
      return 0;
  }`,
    data: []
  };
  handleStr = e => {
    this.setState({ str: e.target.value }, this.hanldePost);
  };
  hanldePost = () => {
    const { str } = this.state;
    fetch('/', {
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
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.index}
          style={{ position: 'fixed', right: '10%', width: '40%' }}
        />
        <TextArea
          rows={20}
          style={{
            position: 'fixed',
            left: '10%',
            width: '40%'
          }}
          value={str}
          onChange={this.handleStr}
        />{' '}
        <br />{' '}
        <Button
          type="primary"
          onClick={this.hanldePost}
          style={{
            marginTop: '420px',
            marginLeft: '40%'
          }}
        >
          分析
        </Button>{' '}
      </div>
    );
  }
}
ReactDOM.render(<Main />, document.getElementById('root'));
