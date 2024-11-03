import React, { useState } from 'react';
import DictationCard from './components/DictationCard';
import { sampleWords } from './data/words';

// 主应用组件
function App() {
  // 当前单词索引状态
  const [currentIndex, setCurrentIndex] = useState(0);
  // 得分状态：正确数和总数
  const [score, setScore] = useState({ correct: 0, total: 0 });
  // 练习是否完成状态
  const [isComplete, setIsComplete] = useState(false);

  // 处理下一个单词
  const handleNext = () => {
    if (currentIndex < sampleWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  // 处理上一个单词
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 处理练习完成
  const handleComplete = (correct: number, total: number) => {
    setScore({ correct, total });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          单词听写练习
        </h1>
        
        {!isComplete ? (
          <>
            <div className="mb-6 text-center text-gray-600">
              第 {currentIndex + 1} 个单词，共 {sampleWords.length} 个
            </div>
            <DictationCard
              word={sampleWords[currentIndex]}
              onNext={handleNext}
              onPrev={handlePrev}
              onComplete={handleComplete}
            />
          </>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">练习完成！</h2>
            <p className="text-lg text-gray-600">
              你答对了 {score.correct} 个单词，共 {score.total} 个。
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsComplete(false);
                setScore({ correct: 0, total: 0 });
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新开始
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;