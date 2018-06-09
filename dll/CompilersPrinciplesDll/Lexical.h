#ifndef LEXICAL_H
#define LEXICAL_H

class Symbol {
private: 
	map<string, pair<int, int>> table;
	set<string> se;
public: 
	bool find(string id);
	bool find_id(string id);
	void push_id(string id);
	bool push(string id, int row, int col);
};

class Lexical {
private:
	vector<string> instring;
	string Operator[14] = { "+","-","*","/",">","<","=","!","!=","&&","||","%","~","&" };
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
	Symbol sy;
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

