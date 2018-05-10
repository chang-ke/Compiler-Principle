#ifndef LEXICAL_H
#define LEXICAL_H

class Key {

};

class Lexical {
public:
	Lexical();
	Lexical(string str);
	string slice(int start, int end);
	string run();
	bool isId(string id);
	bool isOperator(string op);
	bool isOperator(char op);
	bool isKey(string key);
	bool isDelimitor(char ch);
	bool isSpcae(char ch);
	string to_json_str(int type, string val);
private:
	vector<string> in;
	vector<pair<string, int>> optrs;
	string Operator[18] = { "+","++","--","-","*","/",">",">=","<","<=","=","==","!","!=","&&","||","%","~" };
	string Delimitor[11] = {",",";",")","(","[","]","{","}"};
	string Key[33] = { // ¹Ø¼ü×Ö±í
		"auto", "double", "int", "struct", "break", "else", "long",
		"switch","case", "enum", "register", "typedef", "char",
		"extern", "return", "union","const", "float", "short",
		"unsigned", "continue", "for", "signed", "void","default",
		"goto", "sizeof", "volatile", "do", "if", "while", "static",
		"string"
	};
	int index;
	int row, col;
};

#endif LEXICAL_H// !LEXICAL_H

