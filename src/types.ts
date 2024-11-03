// 单词接口定义
export interface Word {
  id: number;       // 单词ID
  word: string;     // 单词
  meaning: string;  // 含义
  phonetic: string; // 音标
  audioUS: string;  // 美式发音音频URL
  audioUK: string;  // 英式发音音频URL
}

// 听写状态接口定义
export interface DictationState {
  input: string;            // 用户输入
  showMeaning: boolean;     // 是否显示含义
  showWord: boolean;        // 是否显示单词
  correctLetters: boolean[]; // 每个字母是否正确的数组
}