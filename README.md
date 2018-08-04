## Introduction

编译原理实验

* 词法分析器和LL(1)文法核心代码均采用C++实现，服务端代码使用Koa2实现，前端可视化代码使用React实现
  js作为胶水层(`node-ffi`)将c++运行的结果转发给前端，数据格式使用json
* LR(1)文法我用的是JavaScript，原因是我做LL(1)文法的时候，要把预测分析表可视化出来，这样去拼接json字符串给nodejs太麻烦了
于是我就用了JavaScript，便于可视化图表等，而且数据结构也比C++好用
#### 使用
```bash
npm install 安装依赖
npm run server 开启服务端
npm run dev 开启react开发
npm start 同时启动server和dev
```
#### 环境：
windows10 + vs2015 + nodejs-v8.9.3

* ffi引用dll库时参考的[文章](https://www.jianshu.com/p/5af3ad2b0856)
* ffi引入函数名错误参考的[文章](http://www.cnblogs.com/TianFang/archive/2013/05/04/3059073.html)
* 编译dll的时候，在**CompilersPrinciplesDll.cpp**文件里面引入**iostream, string**等头文件报错，将头文件引入至**stdafx.h**即可解决
* ffi里面的**string**类型对应c++是**char\*** 类型的，而我需要使用**string**，直接使用**string**无法获取参数和结果，所以写了个函数转换
* **其实可以不用ffi的，但是要安装c++编译器，利用child_process.exec去执行cpp文件，然后利用exec返回的子进程进行管道通信**
```c++
// char* 可直接赋值给string
// string 转 char*,用来返回结果给nodejs
char* to_char_pointer(string str) {
	int length = (int)str.length();
	char *p = new char[length + 1];
	for (int i = 0; i < length; ++i) {
		p[i] = str[i];
	}
	p[length] = '\0'; //加上结束符
	return p;
}
```
#### 效果预览
* 词法分析

词法分析我是利用循环来实现自动机匹配标识符，数字等等
![词法分析效果图](https://github.com/xuan45/Compiler-Principle/raw/master/images/FireShot1.png)

* LL(1)

LL的关键在于求出first集和follow集，求first集的时候要注意消除左递归，然后根据first集和follow集求出预测分析表
![LL(1)效果图](https://github.com/xuan45/Compiler-Principle/raw/master/images/FireShot2.png)

* LR(1)

LR的关键在于goto函数和closure函数，只要把这两个函数写出来，整个实验就完成了大半了，当然，这里面的项目还有超前搜索符，这个需要考虑怎么表示，个人觉得使用脚本语言或者c++都挺好写的，c++有结构体，python有字典，JavaScript有字面量对象，但是Java纯面向对象的语言表示这个感觉有点鸡肋。
![LR(1)效果图](https://github.com/xuan45/Compiler-Principle/raw/master/images/demo.gif)