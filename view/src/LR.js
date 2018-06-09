import React from 'react';
import { ActionAndGotoTable, analys, digraph } from './lr_run';
import { Input, Button, Table, Tag } from 'antd';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

const { TextArea } = Input;

export default class LL extends React.PureComponent {
  constructor() {
    super()
    let viz = new Viz({ Module, render });
    viz
      .renderSVGElement(digraph)
      .then(function(element) {
        element.style.margin = '0 480px';
        document.querySelector('#graph').appendChild(element);
      })
      .catch(error => {
        // Create a new Viz instance (@see Caveats page for more info)
        viz = new Viz({ workerURL });

        // Possibly display the error
        console.error(error);
      });
  }
  state = {
    str: `i+i*i#`
  };
  handleClick = e => {
    this.setState({ str: document.querySelector('#instr').value || 'i#' });
  };
  render() {
    const { str } = this.state;
    let SymbolTable = ActionAndGotoTable.map((item, index) => {
      return { index, ...item };
    });
    let analysTable = analys(str).map((item, index) => {
      return { index: index + 1, ...item };
    });
    const columns = [
      {
        title: '步骤',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '状态栈',
        dataIndex: 'statusStack',
        key: 'statusStack'
      },
      {
        title: '符号栈',
        dataIndex: 'symbolStack',
        key: 'symbolStack'
      },
      {
        title: '输入串',
        dataIndex: 'inStack',
        key: 'inStack'
      },
      {
        title: '动作',
        dataIndex: 'action',
        key: 'action'
      }
    ];
    const column = [
      {
        title: '',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'i',
        dataIndex: 'i',
        key: 'i'
      },
      {
        title: '+',
        dataIndex: '+',
        key: '+'
      },
      {
        title: '*',
        dataIndex: '*',
        key: '*'
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
        title: '#',
        dataIndex: '#',
        key: '#'
      },
      {
        title: 'E',
        dataIndex: 'E',
        key: 'E'
      },
      {
        title: 'F',
        dataIndex: 'F',
        key: 'F'
      },
      {
        title: 'T',
        dataIndex: 'T',
        key: 'T'
      }
    ];
    return [
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-satrt' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '16%', margin: '0 2%' }}>
          <TextArea rows={10} autosize={{ minRows: 10 }} id="instr" />
          <Button type="primary" onClick={this.handleClick}>
            分析
          </Button>
        </div>
        <Table
          columns={column}
          dataSource={SymbolTable}
          rowKey={record => record.index}
          style={{ width: '35%', margin: '0 1%' }}
        />
        <Table
          columns={columns}
          dataSource={analysTable}
          rowKey={record => record.index}
          style={{ width: '40%', margin: '0 1%' }}
        />
      </div>,
      <div id="graph" />
    ];
  }
}
