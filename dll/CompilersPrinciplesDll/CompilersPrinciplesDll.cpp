// CompilersPrinciplesDll.cpp : 定义 DLL 应用程序的导出函数。
//
#include "stdafx.h"
#include "Lexical.h"
#include "LL.h"
#include "CompilersPrinciplesDll.h"

char* to_char_pointer(string str) {
	int length = (int)str.length();
	char *p = new char[length + 1];
	for (int i = 0; i < length; ++i) {
		p[i] = str[i];
	}
	p[length] = '\0';
	return p;
}



// 这是导出函数的一个示例。
COMPILERSPRINCIPLESDLL_API char* parse(char* str) {
	string s = str;
	Lexical *l = new Lexical(s);
	s = l->run();
	return to_char_pointer(s);
};

COMPILERSPRINCIPLESDLL_API char* analys(char* str) {
	char *p = NULL;
	LL l;
	l.run();
	return p;
};













// 这是导出变量的一个示例
COMPILERSPRINCIPLESDLL_API int nCompilersPrinciplesDll = 0;

// 这是已导出类的构造函数。
// 有关类定义的信息，请参阅 CompilersPrinciplesDll.h
CCompilersPrinciplesDll::CCompilersPrinciplesDll() {
	return;
};
