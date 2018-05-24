#include "stdafx.h"
#include "LL.h"



bool Grammar::is_end(char c) {
	return !(c >= 'A'&&c <= 'Z') && c != '|'&& c != '>';
}

void Grammar::get_first(map<char, set<char>>&first) {
	set<char> ft;
	for (auto g : gram) {
		char prefix = g[0];
		for (int i = 0; i < (int)g.length(); ++i) {
			char c = g[i];
			if (c == '>' || c == '|') {//防止i+1越界
				char nc = g[i + 1];
				//找到first
				if (is_end(nc)) {
					ft.insert(nc);
				}
				//否则找下一个文法的first
				else {
					vector<char> v(1, nc);
					for (int index = 0; index < v.size(); ++index) {
						char cc = v[index];
						while (true) {
							for (auto g : gram) {
								if (g[0] == cc) {
									for (int i = 1; i < (int)g.length(); ++i) {
										if (g[i] == '>' || g[i] == '|') {
											if (is_end(g[i + 1])) {
												ft.insert(g[i + 1]);
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
					//清空对文法g的推导文法集合
					v.clear();
				}
			}

		}
		pair<char, set<char>> p(prefix, ft);
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
		ft.clear();
	}
}

void Grammar::get_follow(const map<char, set<char>> &first, map<char, set<char>> &follow) {

}
bool LL::run() {
	Grammar g;
	g.get_first(first);
	show();
	char *p = NULL;
	g.is_end('c');
	return true;
}

void LL::show() {
	for (auto f : first) {
		cout << f.first << " : ";
		for (auto c : f.second) {
			cout << c;
		}
		cout << endl;
	}
}