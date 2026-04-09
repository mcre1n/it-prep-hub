import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../Common/Icons';

export default function TestCard({ test }) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      devops: <Icons.DevOps />,
      'system-analyst': <Icons.SystemAnalyst />,
      'project-manager': <Icons.ProjectManager />,
      backend: <Icons.Backend />,
      frontend: <Icons.Frontend />,
      qa: <Icons.QA />,
    };
    return icons[category] || <Icons.Tests />;
  };

  const getDifficultyConfig = (level) => {
    switch (level) {
      case 'beginner':
        return {
          icon: <Icons.Beginner />,
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: 'Начинающий',
          gradient: 'from-emerald-500 to-teal-500',
        };
      case 'intermediate':
        return {
          icon: <Icons.Intermediate />,
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          label: 'Средний',
          gradient: 'from-amber-500 to-orange-500',
        };
      case 'advanced':
        return {
          icon: <Icons.Advanced />,
          bg: 'bg-rose-50',
          text: 'text-rose-700',
          border: 'border-rose-200',
          label: 'Продвинутый',
          gradient: 'from-rose-500 to-red-500',
        };
      default:
        return {
          icon: <Icons.Intermediate />,
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: 'Средний',
          gradient: 'from-gray-500 to-gray-600',
        };
    }
  };

  const difficulty = getDifficultyConfig(test.level);

  return (
    <Link
      to={`/test/${test.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`h-1 bg-gradient-to-r ${difficulty.gradient} transition-all duration-300 ${isHovered ? 'h-1.5' : 'h-1'}`}
        ></div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
            >
              {getCategoryIcon(test.category)}
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.text} border ${difficulty.border}`}
            >
              {difficulty.icon}
              <span>{difficulty.label}</span>
            </div>
          </div>

          <h3
            className={`text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 ${isHovered ? 'text-blue-600' : ''}`}
          >
            {test.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {test.description || 'Проверьте свои знания в этой области'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Clock />
                <span>{test.timeLimit || 20} мин</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Questions />
                <span>{test.questionsCount || test.questions?.length || 0} вопр.</span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-blue-600 transition-all duration-300 ${isHovered ? 'gap-2 translate-x-1' : ''}`}
            >
              <span className="text-sm font-medium">Пройти</span>
              <Icons.ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
