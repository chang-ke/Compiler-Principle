// CompilersPrinciplesDll.cpp : ���� DLL Ӧ�ó���ĵ���������
//
#include "stdafx.h"
#include "Lexical.h"
#include "CompilersPrinciplesDll.h"

char* to_char_p(string str) {
	int length = (int)str.length();
	char *p = new char[length];
	for (int i = 0; i < length; ++i) {
		p[i] = str[i];
	}
	p[length] = '\0';
	return p;
}



// ���ǵ���������һ��ʾ����
COMPILERSPRINCIPLESDLL_API char* parse(char* str) {
	string s = str;
	Lexical *l = new Lexical(s);
	s = l->run();
	return to_char_p(s);
};












// ���ǵ���������һ��ʾ��
COMPILERSPRINCIPLESDLL_API int nCompilersPrinciplesDll = 0;

// �����ѵ�����Ĺ��캯����
// �й��ඨ�����Ϣ������� CompilersPrinciplesDll.h
CCompilersPrinciplesDll::CCompilersPrinciplesDll() {
	return;
};
