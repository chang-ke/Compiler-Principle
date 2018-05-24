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
			if (c == '>' || c == '|') {//��ֹi+1Խ��
				char nc = g[i + 1];
				//�ҵ�first
				if (is_end(nc)) {
					ft.insert(nc);
				}
				//��������һ���ķ���first
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
					//��ն��ķ�g���Ƶ��ķ�����
					v.clear();
				}
			}

		}
		pair<char, set<char>> p(prefix, ft);
		//�ϲ��Ѵ��ڵ��ķ�
		for (auto f : first) {
			if (f.first == prefix) {
				first.erase(f.first);
				p.second.insert(f.second.begin(), f.second.end());
				//��Ҫ��ʱ�˳�������ᱨ����������increable
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