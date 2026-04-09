import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestById, saveTestResult, getUserTestResults } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Common/Icons';

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTest();
  }, [id]);

  useEffect(() => {
    if (testStarted && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, testStarted]);

  const loadTest = async () => {
    try {
      const testData = await getTestById(id);
      if (testData) {
        setTest(testData);
        setTimeLeft(testData.timeLimit * 60);
      } else {
        setError('Тест не найден');
      }
    } catch (err) {
      console.error('Ошибка загрузки теста:', err);
      setError('Не удалось загрузить тест');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setTestStarted(true);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      // Подсчитываем правильные ответы
      let correctCount = 0;
      const userAnswers = [];

      test.questions.forEach((question, idx) => {
        const userAnswer = answers[question.id];
        const isCorrect = userAnswer === question.correct;
        if (isCorrect) correctCount++;
        userAnswers.push({
          questionId: question.id,
          questionText: question.text,
          userAnswer: userAnswer !== undefined ? question.options[userAnswer] : 'Не отвечен',
          correctAnswer: question.options[question.correct],
          isCorrect,
        });
      });

      const totalQuestions = test.questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      // Сохраняем результат в Firebase если пользователь авторизован
      if (user) {
        try {
          await saveTestResult(user.uid, test, userAnswers, correctCount, percentage);
          console.log('✅ Результат сохранён в Firebase');
        } catch (saveError) {
          console.error('Ошибка сохранения результата:', saveError);
          // Продолжаем, даже если сохранение не удалось
        }
      }

      // Переходим на страницу результатов
      navigate('/result', {
        state: {
          testTitle: test.title,
          totalQuestions: totalQuestions,
          correctAnswers: correctCount,
          percentage,
          answers: userAnswers,
          userEmail: user?.email,
        },
      });
    } catch (err) {
      console.error('Ошибка при завершении теста:', err);
      setError('Не удалось завершить тест. Попробуйте ещё раз.');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icons.Loading />
          <p className="text-gray-600 mt-2">Загрузка теста...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-600 mb-4">{error || 'Тест не найден'}</p>
          <button onClick={() => navigate('/tests')} className="text-blue-600 hover:underline">
            Вернуться к тестам
          </button>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{test.title}</h1>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-medium text-gray-900">Количество вопросов</p>
                  <p className="text-gray-600">{test.questions.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-medium text-gray-900">Время на тест</p>
                  <p className="text-gray-600">{test.timeLimit} минут</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-medium text-gray-900">Для кого</p>
                  <p className="text-gray-600">
                    {test.level === 'beginner'
                      ? 'Начинающие'
                      : test.level === 'intermediate'
                        ? 'Средний уровень'
                        : 'Продвинутый'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Начать тест
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Прогресс */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Вопрос {currentQuestion + 1} из {test.questions.length}
            </span>
            <span
              className={`text-sm font-medium ${timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}`}
            >
              ⏱️ {formatTime(timeLeft)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Вопрос */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.text}</h2>
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQ.id, idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  answers[currentQ.id] === idx
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQ.id] === idx
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {answers[currentQ.id] === idx && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Навигация */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Назад
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === test.questions.length - 1 ? 'Завершить' : 'Далее →'}
          </button>
        </div>
      </div>
    </div>
  );
}
