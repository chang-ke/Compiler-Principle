// ���� ifdef ���Ǵ���ʹ�� DLL �������򵥵�
// ��ı�׼�������� DLL �е������ļ��������������϶���� COMPILERSPRINCIPLESDLL_EXPORTS
// ���ű���ġ���ʹ�ô� DLL ��
// �κ�������Ŀ�ϲ�Ӧ����˷��š�������Դ�ļ��а������ļ����κ�������Ŀ���Ὣ
// COMPILERSPRINCIPLESDLL_API ������Ϊ�Ǵ� DLL ����ģ����� DLL ���ô˺궨���
// ������Ϊ�Ǳ������ġ�
#ifdef COMPILERSPRINCIPLESDLL_EXPORTS
#define COMPILERSPRINCIPLESDLL_API __declspec(dllexport)
#else
#define COMPILERSPRINCIPLESDLL_API __declspec(dllimport)
#endif

// �����Ǵ� CompilersPrinciplesDll.dll ������
class COMPILERSPRINCIPLESDLL_API CCompilersPrinciplesDll {
public:
	CCompilersPrinciplesDll(void);
	// TODO:  �ڴ�������ķ�����
};

extern COMPILERSPRINCIPLESDLL_API int nCompilersPrinciplesDll;

COMPILERSPRINCIPLESDLL_API int fnCompilersPrinciplesDll(void);
