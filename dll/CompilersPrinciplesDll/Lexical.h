#ifndef LEXICAL_H
#define LEXICAL_H

class Identifier {
private: 
	vector<pair<string, pair<int, int>>> table;
public: 
	bool find(string id);
	bool push(string id, int row, int col);
};

class Number {
private: 
	vector<pair<string, pair<int, int>>> table;
public:
	bool find(string id);
	bool push(string id, int row, int col);
};

class Operator {
private:
	vector<pair<string, int>> table;
public:
	bool find(string op);
	bool push(string op, int val);
};

class Lexical {
private:
	vector<string> instring;
	string Operator[16] = { "+","-","*","/",">",">=","<","<=","=","==","!","!=","&&","||","%","~" };
	string Delimitor[11] = { ",",";",")","(","[","]","{","}" };
	// ¹Ø¼ü×Ö±í
	string Key[33] = {
		"auto", "double", "int", "struct", "break", "else", "long",
		"switch","case", "enum", "register", "typedef", "char",
		"extern", "return", "union","const", "float", "short",
		"unsigned", "continue", "for", "signed", "void","default",
		"goto", "sizeof", "volatile", "do", "if", "while", "static",
		"string"
	};
	Identifier id;
	int row, col;
public:
	Lexical();
	Lexical(string str);
	string run();
	bool isId(string id);
	bool isOperator(string op);
	bool isOperator(char op);
	bool isKey(string key);
	bool isDelimitor(char ch);
	bool isSpcae(char ch);
	string to_json_str(int type, string val);
};

#endif LEXICAL_H// !LEXICAL_H

