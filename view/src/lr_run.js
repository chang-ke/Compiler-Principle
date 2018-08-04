let Prods = ['S->E', 'E->E+T', 'E->T', 'T->T*F', 'T->F', 'F->(E)', 'F->i']; //['S->E','E->BB','B->aB','B->b']
let EXTEND_PREFIX = 'S';
let Items = getItem();
let tableHeaders = getHeader();
let dotGraph = [];
let C = getC(dotGraph);
let ActionAndGotoTable = [];
let digraph = 'digraph G {\n';

Array.prototype.remove = function(item) {
  let index = this.indexOf(item);
  if (index > -1) {
    this.splice(index, 1);
  }
};

class Stack {
  constructor(..._arr) {
    this.arr = Array.isArray(_arr[0]) ? _arr[0] : _arr;
  }
  push(val) {
    this.arr.push(val);
  }
  pop() {
    return this.arr.pop();
  }
  clear() {
    this.arr = [];
  }
  get str() {
    return this.arr.join('');
  }
  get all() {
    return this.arr;
  }
  get last() {
    return this.arr[this.arr.length - 1];
  }
  get len() {
    return this.arr.length;
  }
}

function isEnd(c) {
  let start = [];
  Prods.forEach(prod => {
    start.push(prod[0]);
  });
  return !start.includes(c) && c !== '-' && c !== '>';
}

function isalpha(c) {
  return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
}

function getHeader() {
  let headers = [];
  Prods.forEach(prod => {
    if (prod[0] !== EXTEND_PREFIX) {
      for (const c of prod) {
        if (!(c >= 'A' && c <= 'Z') && c !== '-' && c !== '>' && !headers.includes(c)) {
          headers.push(c);
        }
      }
    }
  });
  headers.push('#');
  Prods.forEach(prod => {
    if (prod[0] !== EXTEND_PREFIX) {
      for (const c of prod) {
        if (c >= 'A' && c <= 'Z' && !headers.includes(c)) {
          headers.push(c);
        }
      }
    }
  });
  return headers;
}

function getFirst(Prod) {
  let first = [];
  let c = Prod[0] || '#';
  if (!isEnd(c)) {
    for (let i = 0; i < Prods.length; ++i) {
      let prod = Prods[i];
      if (prod[0] === c) {
        if (isEnd(prod[3])) {
          first.push(prod[3]);
        } else if (prod[0] === prod[3]) {
          continue;
        } else {
          c = prod[3];
          i = 0;
        }
      }
    }
  } else {
    first.push(c);
  }
  return first;
}

console.log('first:', getFirst('B'));

function initTable() {
  for (const c of C) {
    let obj = {};
    for (let t of tableHeaders) {
      obj[t] = '';
    }
    ActionAndGotoTable.push(obj);
  }
}

function getItem() {
  let I = [];
  Prods.forEach(prod => {
    let len = prod.length;
    for (let i = 3; i <= len; ++i) {
      let item = prod.slice(0, i) + '.' + prod.slice(i, len);
      if (!isEnd(prod[prod.length - 1])) {
        I.push({ prod: item, search: '#' });
      } else {
        I.push({ prod: item });
      }
    }
  });
  return I;
}

function has(closure, newItem) {
  for (let item of closure) {
    if (item.prod === newItem.prod && item.search === newItem.search) {
      return true;
    }
  }
  return false;
}

function getClosure(Prod) {
  let closure = Array.isArray(Prod) ? Prod : [Prod];
  let size = 0;
  while (size != closure.length) {
    size = closure.length;
    closure.forEach(item => {
      let index = item.prod.indexOf('.');
      if (index + 1 < item.prod.length) {
        let B = item.prod[index + 1];
        if (!isEnd(B)) {
          let first = getFirst(`${item.prod[index + 2] || ''}${item.search || ''}`);
          first.forEach(b => {
            for (let item of Items) {
              if (item.prod[0] === B && item.prod[3] === '.') {
                let newItem = { prod: item.prod, search: b };
                if (!has(closure, newItem)) {
                  closure.push(newItem);
                }
              }
            }
          });
        }
      }
    });
  }
  return closure;
}

function getClosureIndex(C, J) {
  let flag = false;
  for (let j = 0; j < C.length; ++j) {
    let closure = C[j];
    if (closure.length === J.length) {
      flag = true;
      for (let i = 0; i < J.length; ++i) {
        if (J[i].prod !== closure[i].prod || J[i].search !== closure[i].search) {
          flag = false;
        }
      }
      if (flag) return j;
    }
  }
  return -1;
}

function contains(C, J) {
  let flag = false;
  for (let closure of C) {
    if (closure.length === J.length) {
      flag = true;
      for (let i = 0; i < J.length; ++i) {
        if (J[i].prod !== closure[i].prod || J[i].search !== closure[i].search) {
          flag = false;
        }
      }
      if (flag) return flag;
    }
  }
  return flag;
}

function go(I, X) {
  let J = [];
  let reg;
  if (X === '(' || X === ')' || X === '+' || X === '*') {
    reg = new RegExp(`\\.\\${X}`, 'g');
  } else {
    reg = new RegExp(`\\.${X}`, 'g');
  }
  I.forEach(item => {
    let { prod } = item;
    if (reg.test(prod)) {
      if (X === '(' || X === ')' || X === '+' || X === '*') {
        reg = new RegExp(`\\.\\${X}`, 'g');
      } else {
        reg = new RegExp(`\\.${X}`, 'g');
      }
      let newItem = {};
      let dotIndex = prod.indexOf('.');
      prod = prod.replace('.', '');
      newItem.prod = prod.slice(0, dotIndex + 1) + '.' + prod.slice(dotIndex + 1);
      // 同一前缀推导出来的
      if (!has(J, newItem)) {
        newItem.search = item.search;
        J.push(newItem);
      }
    }
  });
  return getClosure(J);
}
// console.log(
//   go(
//     [
//       { prod: 'B->a.B', search: 'a' },
//       { prod: 'B->a.B', search: 'b' },
//       { prod: 'B->.aB', search: 'a' },
//       { prod: 'B->.b', search: 'a' },
//       { prod: 'B->.aB', search: 'b' },
//       { prod: 'B->.b', search: 'b' }
//     ],
//     'B'
//   )
// );

function getC(dotGraph) {
  let startPord = { prod: 'S->.E', search: '#' };
  let C = [getClosure(startPord)];
  let size = 0;
  while (size != C.length) {
    size = C.length;
    for (let closure of C) {
      for (let X of tableHeaders) {
        let J = go(closure, X);
        if (J.length) {
          dotGraph.push({
            source: getClosureIndex(C, closure),
            target: getClosureIndex(C, J) < 0 ? C.length : getClosureIndex(C, J),
            char: X
          });
        }
        if (J.length && !contains(C, J)) {
          C.push(J);
        }
      }
    }
  }
  return C;
}

function buildTable() {
  initTable();
  for (let k = 0; k < C.length; ++k) {
    for (let i = 0; i < C[k].length; ++i) {
      let prod = C[k][i].prod;
      let A = prod[0];
      let index = prod.indexOf('.');
      // 书中构造action,goto方法1
      if (index + 1 < prod.length) {
        let a = prod[index + 1];
        if (isEnd(a)) {
          let Ij = go(C[k], a);
          let j = getClosureIndex(C, Ij);
          ActionAndGotoTable[k][a] = `s${j}`;
        }
      }
      // 3
      if ('S->E.' === C[k][0].prod) {
        ActionAndGotoTable[k]['#'] = 'acc';
      }
      // 2
      else if (index === prod.length - 1) {
        let j = Prods.indexOf(prod.slice(0, -1));
        for (let a of C[k][i].search) {
          ActionAndGotoTable[k][a] = `r${j}`;
        }
      }

      // 4
      if (!isEnd(A)) {
        let Ij = go(C[k], A);
        let j = getClosureIndex(C, Ij);
        if (j > -1) {
          ActionAndGotoTable[k][A] = j;
        }
      }
    }
  }
}

buildTable();

function analys(instr) {
  let analysTable = [];
  let statusStack = new Stack(0);
  let symbolStack = new Stack('#');
  let inStack = new Stack(instr.split('').reverse());
  while (1) {
    let c = inStack.last;
    let action = ActionAndGotoTable[statusStack.last][c];
    analysTable.push({
      statusStack: statusStack.all.join(' '),
      symbolStack: symbolStack.str,
      inStack: inStack.str
        .split('')
        .reverse()
        .join(''),
      action
    });
    if (action[0] === 'r') {
      let j = parseInt(action.slice(1));
      let prefix = Prods[j][0];
      let gram = Prods[j].slice(3);
      for (let g of gram) {
        statusStack.pop();
        symbolStack.pop();
      }
      symbolStack.push(prefix);
      statusStack.push(ActionAndGotoTable[statusStack.last][prefix]);
    } else if (action[0] === 's') {
      let j = parseInt(action.slice(1));
      statusStack.push(j);
      symbolStack.push(c);
      inStack.pop();
    } else if (!isNaN(parseInt(action))) {
      let j = parseInt(action);
      statusStack.push(j);
      symbolStack.push(c);
    } else if (action == 'acc') {
      console.log('success');
      return analysTable;
    } else {
      console.log('error');
      console.log(statusStack.last, inStack.last);
      break;
    }
  }
}
function getDescibe() {
  let closureDescribe = '';
  C.forEach((closure, index) => {
    let _closureDescribe = `I${index}[tooltip="I${index}: `;
    closure.forEach(item => {
      _closureDescribe += `${item.prod}  ${item.search}\n`;
    });
    closureDescribe += _closureDescribe + '"];\n';
  });
  return closureDescribe;
}

dotGraph.forEach(g => {
  let str = `I${g.source}->I${g.target}[label="${g.char}"];\n`;
  digraph += digraph.indexOf(str) === -1 ? str : '';
});
digraph += getDescibe() + '}';

export { ActionAndGotoTable, analys, digraph, tableHeaders };
