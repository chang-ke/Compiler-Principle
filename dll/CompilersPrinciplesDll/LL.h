#ifndef LL_H
#define LL_H
#include "stdafx.h"

class Grammar {
private:
	string gram[8] = { "E->TG","G->+TG|-TG","G->$","T->FS","S->*FS|/FS","S->$","F->(E)","F->i" };
public:
	bool is_end(char c);
	void get_first(map<char, set<char>> &first);
	void get_follow(const map<char, set<char>> &first, map<char, set<char>> &follow);
};

class LL {
private:
	int **table;
	map<char, set<char>> first;
	map<char, set<char>> follow;
public:
	bool run();
	void show();
};


#endif LL_H// !LEXICAL_H