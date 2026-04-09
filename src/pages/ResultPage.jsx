import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { testTitle, totalQuestions, correctAnswers, percentage, answers, userEmail } =
    location.state || {};
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const getGrade = (percent) => {
    if (percent >= 90) return { text: 'Отлично!', color: 'text-green-600', emoji: '🏆' };
    if (percent >= 70) return { text: 'Хорошо!', color: 'text-blue-600', emoji: '🎯' };
    if (percent >= 50) return { text: 'Неплохо', color: 'text-yellow-600', emoji: '📚' };
    return { text: 'Нужно подтянуть', color: 'text-red-600', emoji: '💪' };
  };

  const getColorClass = (percent) => {
    if (percent >= 70) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const sendResultsToEmail = async () => {
    setSending(true);
    // Здесь будет отправка на email через Firebase Cloud Function
    // Пока просто имитация
    setTimeout(() => {
      setEmailSent(true);
      setSending(false);
    }, 1500);
  };

  if (!testTitle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Результаты не найдены</p>
          <button
            onClick={() => navigate('/tests')}
            className="mt-4 text-primary-600 hover:underline"
          >
            Вернуться к тестам
          </button>
        </div>
      </div>
    );
  }

  const grade = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Результат */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 text-center">
          <div className="text-6xl mb-4">{grade.emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{testTitle}</h1>
          <p className={`text-xl font-semibold ${grade.color} mb-6`}>{grade.text}</p>

          {/* Круговая диаграмма */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="72" fill="none" stroke="#e5e7eb" strokeWidth="16" />
              <circle
                cx="80"
                cy="80"
                r="72"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeDasharray={`${percentage * 4.52} 452`}
                strokeLinecap="round"
                className={getColorClass(percentage)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-sm text-green-600">Правильно</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</p>
              <p className="text-sm text-red-600">Неправильно</p>
            </div>
          </div>

          {/* Кнопка отправки на email */}
          {userEmail && !emailSent && (
            <button
              onClick={sendResultsToEmail}
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>📧 Отправить результат на email</>
              )}
            </button>
          )}
          {emailSent && (
            <div className="text-green-600 text-sm">✅ Результат отправлен на ваш email</div>
          )}
        </div>

        {/* Детальный разбор */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Детальный разбор</h2>
          <div className="space-y-4">
            {answers?.map((answer, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl">{answer.isCorrect ? '✅' : '❌'}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{answer.questionText}</p>
                    <div className="space-y-1 text-sm">
                      <p className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                        Ваш ответ: {answer.userAnswer}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-green-700">Правильный ответ: {answer.correctAnswer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate('/tests')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            ← К другим тестам
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Пройти снова
          </button>
        </div>
      </div>
    </div>
  );
}
