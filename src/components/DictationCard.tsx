import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Word, DictationState } from '../types';
import AudioButton from './AudioButton';
import SuccessAnimation from './SuccessAnimation';

interface Props {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  onComplete: (correct: number, total: number) => void;
}

// 听写卡片组件
export default function DictationCard({ word, onNext, onPrev, onComplete }: Props) {
  // 听写状态
  const [state, setState] = useState<DictationState>({
    input: '',                // 用户输入
    showMeaning: false,      // 是否显示含义
    showWord: false,         // 是否显示单词
    correctLetters: Array(word.word.length).fill(false), // 每个字母是否正确
  });
  // 是否显示成功动画
  const [showSuccess, setShowSuccess] = useState(false);

  // 当单词改变时重置状态
  useEffect(() => {
    setState({
      input: '',
      showMeaning: false,
      showWord: false,
      correctLetters: Array(word.word.length).fill(false),
    });
    setShowSuccess(false);
  }, [word]);

  // 处理用户输入
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setState(prev => ({
      ...prev,
      input,
      // 检查每个字母是否正确
      correctLetters: word.word.split('').map((letter, i) => 
        input[i] ? input[i].toLowerCase() === letter.toLowerCase() : false
      ),
    }));

    // 检查是否完全正确
    if (input.length === word.word.length) {
      const correct = input.toLowerCase() === word.word.toLowerCase();
      if (correct) {
        setShowSuccess(true);
        // 延迟后进入下一个单词
        setTimeout(() => {
          setShowSuccess(false);
          onNext();
        }, 2500);
      }
    }
  };

  return (
    <>
      <SuccessAnimation show={showSuccess} word={word} />
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
        <div className="p-8">
          {/* 音频播放按钮 */}
          <div className="flex justify-between items-center mb-6">
            <AudioButton url={word.audioUK} variant="UK" />
            <AudioButton url={word.audioUS} variant="US" />
          </div>

          <div className="space-y-4">
            {/* 音标显示 */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">{word.phonetic}</p>
            </div>

            {/* 字母格子 */}
            <div className="flex justify-center space-x-2">
              {word.word.split('').map((letter, index) => (
                <div
                  key={index}
                  className={`w-8 h-12 border-b-2 flex items-center justify-center text-xl font-semibold
                    ${state.input[index] ? (
                      state.correctLetters[index] ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
                    ) : 'border-gray-300'}`}
                >
                  {state.showWord ? letter : state.input[index] || ''}
                </div>
              ))}
            </div>

            {/* 输入框 */}
            <div className="mt-4">
              <input
                type="text"
                value={state.input}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入单词..."
                maxLength={word.word.length}
                autoFocus
                disabled={showSuccess}
              />
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setState(prev => ({ ...prev, showMeaning: !prev.showMeaning }))}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                {state.showMeaning ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{state.showMeaning ? '隐藏含义' : '显示含义'}</span>
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, showWord: !prev.showWord }))}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                {state.showWord ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{state.showWord ? '隐藏单词' : '显示单词'}</span>
              </button>
            </div>

            {/* 单词含义 */}
            {state.showMeaning && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{word.meaning}</p>
              </div>
            )}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between px-8 py-4 bg-gray-50">
          <button
            onClick={onPrev}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>上一个</span>
          </button>
          <button
            onClick={onNext}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <span>下一个</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}