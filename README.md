## Introduction

编译原理课设

核心代码采用c++实现，服务端代码使用koa2实现，前端可视化代码使用react实现

js作为胶水层(`node-ffi`)将c++运行的结果转发给前端，数据格式使用json语法

#### 环境：
windows10 + vs2015 + nodejs-v8.9.3

* ffi引用dll库时参考的[文章](https://www.jianshu.com/p/5af3ad2b0856)
* ffi引入函数名错误参考的[文章](http://www.cnblogs.com/TianFang/archive/2013/05/04/3059073.html)
* 编译dll的时候，在**CompilersPrinciplesDll.cpp**文件里面引入**iostream, string**等头文件报错，将头文件引入至**stdafx.h**即可解决
* ffi里面的**string**类型对应**c++** 是**char\*** 类型的，而我需要使用**string**，直接使用**string**无法获取参数和结果，所以写了个函数转换
```c++
//char* 可直接赋值给string
//string 转 char*,用来返回结果给nodejs
char* to_char_p(string str) {
	int length = (int)str.length();
	char *p = new char[length];
	for (int i = 0; i < length; ++i) {
		p[i] = str[i];
	}
	p[length] = '\0'; //加上结束符
	return p;
}
```
效果预览
![](https://github.com/xuan45/Compiler-Principle/tree/master/images/FireShot1.png)