import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Common/Icons';

export default function ProfilePage() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    worstScore: 0,
    completedTasks: 0,
    totalPoints: 0,
    categoryStats: {},
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('👤 Загрузка данных для пользователя:', user.uid);

      // 1. Загружаем результаты тестов напрямую из Firestore
      const testResultsRef = collection(db, 'testResults');
      const q = query(
        testResultsRef,
        where('userId', '==', user.uid),
        orderBy('completedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const testResults = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          testTitle: data.testTitle || 'Без названия',
          category: data.category || 'unknown',
          questionsCount: data.questionsCount || 0,
          correctAnswers: data.correctAnswers || 0,
          percentage: data.percentage || 0,
          completedAt: data.completedAt,
          answers: data.answers || [],
        };
      });

      console.log('📊 Загружено результатов тестов:', testResults.length);
      setResults(testResults);

      // 2. Рассчитываем статистику
      const totalTests = testResults.length;

      let averageScore = 0;
      let bestScore = 0;
      let worstScore = 100;
      let categoryStats = {};

      if (totalTests > 0) {
        // Суммируем все проценты
        const sum = testResults.reduce((acc, r) => acc + r.percentage, 0);
        averageScore = Math.round(sum / totalTests);

        // Находим лучший и худший результаты
        bestScore = Math.max(...testResults.map((r) => r.percentage));
        worstScore = Math.min(...testResults.map((r) => r.percentage));

        // Статистика по категориям
        testResults.forEach((result) => {
          const category = result.category;
          if (!categoryStats[category]) {
            categoryStats[category] = {
              count: 0,
              sum: 0,
              best: 0,
              worst: 100,
              name: getCategoryName(category),
            };
          }
          categoryStats[category].count++;
          categoryStats[category].sum += result.percentage;
          categoryStats[category].best = Math.max(categoryStats[category].best, result.percentage);
          categoryStats[category].worst = Math.min(
            categoryStats[category].worst,
            result.percentage
          );
        });

        // Вычисляем среднее по категориям
        Object.keys(categoryStats).forEach((cat) => {
          categoryStats[cat].average = Math.round(
            categoryStats[cat].sum / categoryStats[cat].count
          );
        });
      }

      // 3. Загружаем данные пользователя для баллов и заданий
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      let totalPoints = 0;
      let completedTasks = 0;

      if (userDoc.exists()) {
        const userData = userDoc.data();
        totalPoints = userData.totalPoints || 0;
        completedTasks = userData.completedTasks?.length || 0;
        console.log('👤 Данные пользователя:', { totalPoints, completedTasks });
      }

      setStats({
        totalTests,
        averageScore,
        bestScore,
        worstScore: worstScore === 100 ? 0 : worstScore,
        totalPoints,
        completedTasks,
        categoryStats,
      });

      console.log('📈 Статистика рассчитана:', { totalTests, averageScore, bestScore, worstScore });
    } catch (err) {
      console.error('❌ Ошибка загрузки данных:', err);
      setError('Не удалось загрузить данные профиля. Попробуйте обновить страницу.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category) => {
    const names = {
      devops: 'DevOps',
      frontend: 'Frontend',
      backend: 'Backend',
      'system-analyst': 'Системный аналитик',
      'project-manager': 'Project Manager',
      qa: 'QA',
      unknown: 'Другое',
    };
    return names[category] || category;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      devops: '🚀',
      frontend: '🎨',
      backend: '⚙️',
      'system-analyst': '📊',
      'project-manager': '📋',
      qa: '🔍',
      unknown: '📚',
    };
    return icons[category] || '📚';
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (percentage) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Войдите в аккаунт</h2>
          <p className="text-gray-600 mb-6">Чтобы увидеть свой профиль и статистику</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition inline-block"
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => loadAllData()}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Информация о пользователе */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl text-white">
                {user.displayName?.[0] || user.email?.[0] || '👤'}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.displayName || 'Пользователь'}
              </h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Аккаунт создан: {new Date(user.metadata.creationTime).toLocaleDateString('ru-RU')}
              </p>
            </div>
            <button
              onClick={() => loadAllData()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            >
              <Icons.TrendingUp />
              Обновить
            </button>
          </div>
        </div>

        {/* Основная статистика */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTests}</div>
            <div className="text-sm text-gray-500">Пройдено тестов</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
              {stats.averageScore}%
            </div>
            <div className="text-sm text-gray-500">Средний результат</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="text-2xl font-bold text-green-600">{stats.bestScore}%</div>
            <div className="text-sm text-gray-500">Лучший результат</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="text-2xl font-bold text-orange-600">{stats.worstScore}%</div>
            <div className="text-sm text-gray-500">Худший результат</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="text-2xl font-bold text-purple-600">{stats.completedTasks}</div>
            <div className="text-sm text-gray-500">Выполнено заданий</div>
          </div>
        </div>

        {/* Статистика по категориям */}
        {Object.keys(stats.categoryStats).length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icons.TrendingUp />
              Статистика по направлениям
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.categoryStats).map(([category, data]) => (
                <div
                  key={category}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(category)}</span>
                      <span className="font-semibold text-gray-900">{data.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{data.count} тестов</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Средний:</span>
                        <span className={`font-medium ${getScoreColor(data.average)}`}>
                          {data.average}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            data.average >= 80
                              ? 'bg-green-500'
                              : data.average >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${data.average}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Лучший: {data.best}%</span>
                      <span className="text-gray-400">
                        Худший: {data.worst === 100 ? 0 : data.worst}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* История тестов */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icons.Tests />
            История тестов
          </h2>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-3">📭</div>
              <p className="text-gray-500 mb-2">Вы ещё не прошли ни одного теста</p>
              <Link
                to="/tests"
                className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Пройти первый тест →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{result.testTitle}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                          {result.completedAt?.toDate
                            ? new Date(result.completedAt.toDate()).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Дата неизвестна'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {getCategoryName(result.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(result.percentage)}`}>
                          {result.percentage}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.correctAnswers}/{result.questionsCount}
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-full ${getScoreBg(result.percentage)} flex items-center justify-center`}
                      >
                        <span className="text-lg">
                          {result.percentage >= 80 ? '🏆' : result.percentage >= 60 ? '👍' : '📚'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Прогресс-бар */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          result.percentage >= 80
                            ? 'bg-green-500'
                            : result.percentage >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Кнопка возврата */}
        <div className="flex justify-center mt-8">
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-medium transition"
          >
            🏠 На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
