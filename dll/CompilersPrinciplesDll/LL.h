#ifndef LL_H
#define LL_H
#include "stdafx.h"

class Grammar {
protected:
	string grammar[8] = { "E->TG","G->+TG|-TG","G->$","T->FS","S->*FS|/FS","S->$","F->(E)","F->i" };
	map<char, set<char>> first;
	map<char, set<char>> follow;
public:
	bool is_end(char c);
	bool is_grammar(char c);
	int get_follow_size(map<char, set<char>> &follow);
	bool has(char c, set<char> &s) const;
	set<char> get_set(char c, map<char, set<char>> &first) const;
	void insert_follow(char c, set<char> s, map<char, set<char>> &follow);
	void get_first(map<char, set<char>> &first);
	void get_follow(const map<char, set<char>> &first, map<char, set<char>> &follow);
};

class LL :public Grammar {
private:
	map<char, map<char, string>> table;
	Grammar g;
	string text;
public:
	LL(string t);
	string run();
	void get_table(const map<char, set<char>> &first, map<char, set<char>> &follow);
	void insert_table(char row, char col, string s);
	string table_find(char A, char c);
	void show();
};


#endif LL_H