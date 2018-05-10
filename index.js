const ffi = require('ffi');
const Dll = ffi.Library('./CompilersPrinciplesDll/x64/Debug/CompilersPrinciplesDll.dll', {
    'parse': ['string', ['string']
    ]
})

let codeStr = `
int main() {
        auto c** = 6;
        //这是注释
        #
        $
        @
        ~
        /
        for (b = 6; b <+ 15; ++b) {
           int a=a+b;
            if(b >cc 10){
                long c = 99;
            }else{
                const d = 3;
            }
        }
        _#dd
        return 0;
    }
`
let s = Dll.parse(codeStr)
//console.log(s);
let arr = JSON.parse(s);
arr.forEach((item, index) => {
    console.log(`${index}: `, item)
})
// class Lexical {     constructor(str) {         super();         this.col = 0;
//         this.row = 0;         this. in = str;     }     parse() {         let
// len = in.length;         let s = in;         let result = "";         let ch
// = null;         for (let i = 0; i < len; ++i) {             ch = s[i];
//      //分析字母             if (ch != '\n') {                 col += 1;
//   } else {                 row += 1;                 col = 1;             }
//           //字母开头后接字母或者数字或者下划线             if (isalpha(ch)) {
// let key = "";                 while (isalpha(ch) || ch == '_' || isalnum(ch))
// {                     key += ch;                     i = i + 1;
//       ch = s[i];                 }                 result += key + " ";
//           cout << key << "\n";             } else if (isNum(ch)) {
//      let number = "";                 while (isNum(ch)) {
// number += ch;                     i = i + 1;                     ch = s[i];
//               }                 result += number + " ";                 cout
// << number << "\n";             } else if (ch == '/' && s[i + 1] == '/') {
//             let comment = "";                 while (ch != '\n') {
//          comment += ch;                     i = i + 1;                     ch
// = s[i];                 }                 result += comment + " ";
//      cout << comment << "\n";             } else if (isOperator(ch)) {
//          let op = "";                 while (isOperator(ch)) {
//      op += ch;                     i = i + 1;                     ch = s[i];
//                }                 result += op + " ";                 cout <<
// op << "\n";             }             // else { 	let op = ""; 	while (ch !=
// 32) { 		op += ch; 		i = i + 1; 		ch =             // s[i]; 	} } cout << ch <<
// '\t' << row << " " << col << "\n";         }     } } function isalpha(ch) {
//   return (ch > 'a' && ch < 'z') || (ch > 'A' && ch < 'Z'); } function isNum()
// {     return ch > '0' && ch < '9'; } function isOperator() {     let op = [
//       "+",         "-",         "*",         "/",         ">",         "<",
//       "=",         ")",         "(",         "[",         "]",         "{",
//       "}"     ];     for (const s in op) {         if (s[0] == ch)
//  return true;         }     return false; }