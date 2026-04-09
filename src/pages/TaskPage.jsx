import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Common/Icons';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const taskDoc = await getDoc(doc(db, 'tasks', id));
      if (taskDoc.exists()) {
        setTask({ id: taskDoc.id, ...taskDoc.data() });
      }
    } catch (error) {
      console.error('Ошибка загрузки задания:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      setFeedback({ type: 'error', message: 'Пожалуйста, введите ваше решение' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Здесь можно добавить автоматическую проверку
      // или просто сохранить ответ пользователя
      if (user) {
        const userTaskRef = doc(db, 'userTasks', `${user.uid}_${task.id}`);
        await updateDoc(userTaskRef, {
          answer: userAnswer,
          completedAt: new Date(),
          status: 'completed',
        }).catch(() => {
          // Если документа нет, создаём
          return setDoc(userTaskRef, {
            userId: user.uid,
            taskId: task.id,
            answer: userAnswer,
            completedAt: new Date(),
            status: 'completed',
            points: task.points,
          });
        });

        // Обновляем общий счёт пользователя
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          totalPoints: arrayUnion(task.points),
          completedTasks: arrayUnion(task.id),
        }).catch(() => {});

        setFeedback({
          type: 'success',
          message: '✅ Отлично! Задание выполнено. Вы получили баллы!',
        });

        setTimeout(() => navigate('/tasks'), 2000);
      } else {
        setFeedback({
          type: 'info',
          message: 'Войдите в аккаунт, чтобы сохранить прогресс',
        });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Ошибка при сохранении решения' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icons.Loading />
          <p className="text-gray-600 mt-2">Загрузка задания...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-600">Задание не найдено</p>
          <button onClick={() => navigate('/tasks')} className="mt-4 text-blue-600 hover:underline">
            Вернуться к заданиям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition"
          >
            <Icons.ChevronLeft />
            Назад к заданиям
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500">⏱️ {task.timeEstimate || 15} минут</span>
            <span className="text-sm text-gray-500">⭐ {task.points || 100} баллов</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - описание задания */}
          <div className="lg:col-span-2 space-y-6">
            {/* Описание */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">📋 Описание задания</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
            </div>

            {/* Инструкции */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">📖 Инструкция</h2>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                {task.instructions}
              </div>
            </div>

            {/* Подсказки */}
            {task.hints && task.hints.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-lg font-semibold text-gray-900">💡 Подсказки</h2>
                  <Icons.ChevronRight
                    className={`transform transition ${showHints ? 'rotate-90' : ''}`}
                  />
                </button>
                {showHints && (
                  <div className="mt-4 space-y-2">
                    {task.hints.map((hint, idx) => (
                      <div
                        key={idx}
                        className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800"
                      >
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Решение */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-lg font-semibold text-gray-900">🔑 Пример решения</h2>
                <Icons.ChevronRight
                  className={`transform transition ${showSolution ? 'rotate-90' : ''}`}
                />
              </button>
              {showSolution && (
                <div className="mt-4">
                  <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                    {task.solution}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ⚠️ Это один из вариантов решения. Может быть несколько правильных подходов.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка - ввод ответа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">✍️ Ваше решение</h2>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Напишите здесь ваше решение..."
                rows={12}
                className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {feedback && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    feedback.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : feedback.type === 'error'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Проверка...' : 'Отправить решение'}
              </button>

              {!user && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  🔐 Войдите в аккаунт, чтобы сохранить прогресс и получить баллы
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
