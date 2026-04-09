import { useState } from 'react';
import { Icons } from '../Common/Icons';

export default function TaskCard({ task, onStart, isCompleted }) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return { bg: 'bg-green-100', text: 'text-green-700', label: '🌱 Начинающий' };
      case 'intermediate':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '📘 Средний' };
      case 'advanced':
        return { bg: 'bg-red-100', text: 'text-red-700', label: '🚀 Продвинутый' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Средний' };
    }
  };

  const difficulty = getDifficultyColor(task.difficulty);

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isCompleted ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`h-1 bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-300 ${isHovered ? 'h-1.5' : 'h-1'}`}
        ></div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
            >
              <span className="text-2xl">💻</span>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.text}`}
            >
              {difficulty.label}
            </div>
          </div>

          <h3
            className={`text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 ${isHovered ? 'text-blue-600' : ''}`}
          >
            {task.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{task.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Clock />
                <span>{task.timeEstimate || 15} мин</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Star />
                <span>{task.points || 100} баллов</span>
              </div>
            </div>
            {!isCompleted ? (
              <button
                onClick={() => onStart(task)}
                className={`flex items-center gap-1 text-blue-600 transition-all duration-300 ${isHovered ? 'gap-2 translate-x-1' : ''}`}
              >
                <span className="text-sm font-medium">Выполнить</span>
                <Icons.ArrowRight />
              </button>
            ) : (
              <div className="flex items-center gap-1 text-green-600">
                <Icons.CheckCircle />
                <span className="text-sm font-medium">Выполнено</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
