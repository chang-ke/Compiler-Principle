#include "stdafx.h"
#include "LL.h"


bool Grammar::is_end(char c) {
	return !(c >= 'A'&&c <= 'Z') && c != '|'&& c != '>';
}

bool Grammar::is_grammar(char c) {
	return c >= 'A'&&c <= 'Z';
}

void Grammar::insert_follow(char c, set<char> s, map<char, set<char>> &follow) {
	auto it = follow.find(c);
	if (it != follow.end()) {
		s.insert(it->second.begin(), it->second.end());
		follow.erase(c);
	}
	follow.insert(pair < char, set<char>>(c, s));
}

bool Grammar::has(char c, set<char> &s) const {
	auto it = s.find(c);
	if (it != s.end())return true;
	return false;
}

set<char> Grammar::get_set(char c, map<char, set<char>> &first) const {
	auto it = first.find(c);
	return it->second;
}

void Grammar::get_first(map<char, set<char>>&first) {
	set<char> s;
	for (auto g : grammar) {
		char prefix = g[0];
		for (int i = 0; i < (int)g.length(); ++i) {
			char c = g[i];
			if (c == '>' || c == '|') {//防止i+1越界
				char nc = g[i + 1];
				//找到first
				if (is_end(nc)) {
					s.insert(nc);
				}
				//否则找下一个文法的first
				else {
					vector<char> v(1, nc);
					for (int index = 0; index < v.size(); ++index) {
						char cc = v[index];
						while (true) {
							for (auto g : grammar) {
								if (g[0] == cc) {
									for (int i = 1; i < (int)g.length(); ++i) {
										if (g[i] == '>' || g[i] == '|') {
											if (is_end(g[i + 1])) {
												s.insert(g[i + 1]);
											}
											else {
												v.push_back(g[i + 1]);
											}
										}
									}
								}
							}
							break;
						}
					}
					//清空对文法g的推导集合
					v.clear();
				}
			}

		}
		pair<char, set<char>> p(prefix, s);
		//合并已存在的文法
		for (auto f : first) {
			if (f.first == prefix) {
				first.erase(f.first);
				p.second.insert(f.second.begin(), f.second.end());
				//需要及时退出，否则会报迭代器不可increable
				break;
			}
		}
		first.insert(p);
		s.clear();
	}
}

int Grammar::get_follow_size(map<char, set<char>> &follow) {
	int size = 0;
	for (auto f : follow) {
		size += (int)f.second.size();
	}
	return size;
}

void Grammar::get_follow(const map<char, set<char>> &first, map<char, set<char>> &follow) {
	set<char> s;
	char prefix = NULL;
	int size = 0;
	do {
		size = get_follow_size(follow);
		for (auto g : grammar) {
			int len = (int)g.size();
			//每个文法开头都把#加入进去
			s.insert('#');
			insert_follow(g[0], s, follow);
			for (int i = 1; i < (int)g.size(); ++i) {
				char c = g[i];
				char nc = g[i + 1];
				if (is_grammar(c) && is_grammar(nc)) {
					//把first(空除外)加入follow c中
					auto it = first.find(nc);
					s.insert(it->second.begin(), it->second.end());
					s.erase('$');
					insert_follow(c, s, follow);
					//c的推导式也应该把first加进去
					//这里的推导只需一次，所以不需要while循环了
					for (auto gg : grammar) {
						int len = (int)gg.length() - 1;
						if (c == gg[0] && is_grammar(gg[len])) {
							insert_follow(gg[len], s, follow);
						}
					}
				}
				if (c == '>' && !is_grammar(nc) && is_grammar(g[i + 2])) {
					s.clear();
					if (!is_grammar(g[i + 3])) {
						s.insert(g[i + 3]);
					}
					insert_follow(g[i + 2], s, follow);
				}
				int l = len - 1;
				while (is_grammar(g[l])) {
					if (g[l] == g[0]) break;
					//follow g[0]
					s = follow.find(g[0])->second;
					auto it = first.find(g[l])->second;
					//加入follow g[l]
					insert_follow(g[l], s, follow);
					//空集表示可以继续规约
					if (it.find('$') != it.end()) {
						l -= 1;
					}
					else {
						break;
					}
				}

			}
			s.clear();
		}

	} while (get_follow_size(follow) != size);
}


void LL::get_table(map<char, set<char>> first, map<char, set<char>> follow) {
	for (auto f : first) {
		//终结符集
		for (auto s : f.second) {
			if (s != '$') {
				string g = "";
				for (auto l : grammar) {
					if (l[0] == f.first) {
						g = l;
					}
				}
				cout << g<<"  ";
				set_table(f.first, s, g);
			}
			else {
				cout << "error  ";
			}

		}
		cout << endl;
	}
}

LL::LL(string t) {
	text = t;
}

string LL::run() {
	g.get_first(first);
	g.get_follow(first, follow);
	get_table(first, follow);
	show();
	stack<char> st;
	bool flag = false;
	while (flag) {

	}
	return "";
}

void LL::set_table(char row, char col, string s) {
	map<char, string> m;
	m.insert(pair<char, string>(col, s));
	table.insert(pair<char, map<char, string>>(row, m));
}

void LL::show() {
	//for (auto g : grammar) {
	//	cout << g << endl;
	//}
	for (auto f : first) {
		cout << f.first << ": ( ";
		for (auto c : f.second) {
			cout << c << ", ";
		}
		cout << ")" << endl;
	}
	cout << endl;
	for (auto f : follow) {
		cout << f.first << ": ( ";
		for (auto c : f.second) {
			cout << c << ", ";
		}
		cout << ")" << endl;
	}
}