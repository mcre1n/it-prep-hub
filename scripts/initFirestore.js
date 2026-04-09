import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcP3Q02sPnS7pG0BWZ_gHbQQM2uGM-_Os",
  authDomain: "it-prep-hub.firebaseapp.com",
  projectId: "it-prep-hub",
  storageBucket: "it-prep-hub.firebasestorage.app",
  messagingSenderId: "124192650537",
  appId: "1:124192650537:web:2a3e477e669bad02307338"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==================== ТЕСТЫ ====================
const tests = [
  {
    title: "DevOps: Базовый уровень",
    category: "devops",
    level: "beginner",
    description: "Проверьте свои знания основ DevOps: CI/CD, контейнеризация, Git",
    timeLimit: 20,
    questions: [
      {
        id: 1,
        text: "Что означает CI в CI/CD?",
        options: ["Continuous Integration", "Code Integration", "Continuous Implementation", "Core Integration"],
        correct: 0
      },
      {
        id: 2,
        text: "Какой инструмент используется для контейнеризации?",
        options: ["Jenkins", "Git", "Docker", "Ansible"],
        correct: 2
      },
      {
        id: 3,
        text: "Что такое Kubernetes?",
        options: ["Система контроля версий", "Платформа для CI/CD", "Оркестрация контейнеров", "Инструмент для мониторинга"],
        correct: 2
      },
      {
        id: 4,
        text: "Какой протокол используется Git для связи с удалённым репозиторием?",
        options: ["HTTP", "SSH", "FTP", "SMTP"],
        correct: 1
      },
      {
        id: 5,
        text: "Что такое Docker Compose?",
        options: [
          "Инструмент для создания образов",
          "Инструмент для запуска многоконтейнерных приложений",
          "Система оркестрации",
          "Репозиторий образов"
        ],
        correct: 1
      }
    ]
  },
  {
    title: "Frontend: Основы React",
    category: "frontend",
    level: "beginner",
    description: "Проверьте знания основ React библиотеки",
    timeLimit: 20,
    questions: [
      {
        id: 1,
        text: "Что такое JSX?",
        options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
        correct: 0
      },
      {
        id: 2,
        text: "Что такое useState?",
        options: ["Хук для управления состоянием", "Функция для рендеринга", "Компонент", "Стиль"],
        correct: 0
      },
      {
        id: 3,
        text: "Что такое props?",
        options: ["Передача данных в компонент", "Состояние компонента", "Метод компонента", "Стили"],
        correct: 0
      },
      {
        id: 4,
        text: "Что такое Virtual DOM?",
        options: ["Виртуальное представление UI", "База данных", "Сервер", "Стили"],
        correct: 0
      },
      {
        id: 5,
        text: "Что такое useEffect?",
        options: ["Хук для побочных эффектов", "Хук для состояния", "Компонент", "Функция"],
        correct: 0
      }
    ]
  },
  {
    title: "Backend: Основы API",
    category: "backend",
    level: "beginner",
    description: "Проверьте знания основ API и бэкенд-разработки",
    timeLimit: 20,
    questions: [
      {
        id: 1,
        text: "Что такое REST API?",
        options: ["Архитектурный стиль для API", "База данных", "Язык программирования", "Протокол"],
        correct: 0
      },
      {
        id: 2,
        text: "Какие методы HTTP существуют?",
        options: ["GET, POST, PUT, DELETE", "SELECT, INSERT, UPDATE", "READ, WRITE", "OPEN, CLOSE"],
        correct: 0
      },
      {
        id: 3,
        text: "Что такое JSON?",
        options: ["JavaScript Object Notation", "Java Object Notation", "JavaScript Oriented Notation", "JSON Object Notation"],
        correct: 0
      },
      {
        id: 4,
        text: "Какой статус код означает успешный запрос?",
        options: ["200", "404", "500", "301"],
        correct: 0
      },
      {
        id: 5,
        text: "Что такое JWT?",
        options: ["JSON Web Token", "Java Web Token", "JavaScript Web Token", "JSON Web Tool"],
        correct: 0
      }
    ]
  }
];

// ==================== ЗАДАНИЯ ====================
const tasks = [
  {
    title: "Создать Docker контейнер с Nginx",
    category: "devops",
    difficulty: "beginner",
    description: "Напишите Dockerfile для запуска Nginx и сконфигурируйте его",
    instructions: `1. Создайте Dockerfile
2. Используйте официальный образ nginx:alpine
3. Добавьте кастомную страницу index.html
4. Соберите образ и запустите контейнер
5. Проверьте, что страница доступна на порту 80`,
    hints: [
      "FROM nginx:alpine",
      "COPY index.html /usr/share/nginx/html/",
      "docker build -t my-nginx .",
      "docker run -p 80:80 my-nginx"
    ],
    solution: `FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EXPOSE 80`,
    timeEstimate: 15,
    points: 100
  },
  {
    title: "Создать React компонент",
    category: "frontend",
    difficulty: "beginner",
    description: "Создайте функциональный React компонент с состоянием",
    instructions: `1. Создайте компонент Counter
2. Используйте useState для хранения счётчика
3. Добавьте кнопки +1 и -1
4. Отобразите текущее значение`,
    hints: [
      "import { useState } from 'react'",
      "const [count, setCount] = useState(0)",
      "onClick={() => setCount(count + 1)}"
    ],
    solution: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}`,
    timeEstimate: 10,
    points: 100
  },
  {
    title: "Создать REST API эндпоинт",
    category: "backend",
    difficulty: "beginner",
    description: "Создайте простой REST API эндпоинт на Express",
    instructions: `1. Инициализируйте Express приложение
2. Создайте GET эндпоинт /api/hello
3. Верните JSON ответ с приветствием
4. Запустите сервер на порту 3000`,
    hints: [
      "const express = require('express')",
      "app.get('/api/hello', (req, res) => {...})",
      "res.json({ message: 'Hello World' })",
      "app.listen(3000)"
    ],
    solution: `const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    timeEstimate: 15,
    points: 100
  }
];

// ==================== ФУНКЦИИ ДЛЯ ДОБАВЛЕНИЯ ====================

async function addTests() {
  console.log('🚀 Добавляем тесты...');
  for (const test of tests) {
    const testData = {
      ...test,
      questionsCount: test.questions.length,
      createdAt: new Date()
    };
    const docRef = await addDoc(collection(db, 'tests'), testData);
    console.log(`✅ Добавлен тест: ${test.title} (ID: ${docRef.id})`);
  }
  console.log(`🎉 Добавлено ${tests.length} тестов`);
}

async function addTasks() {
  console.log('🚀 Добавляем задания...');
  for (const task of tasks) {
    const taskData = {
      ...task,
      createdAt: new Date()
    };
    const docRef = await addDoc(collection(db, 'tasks'), taskData);
    console.log(`✅ Добавлено задание: ${task.title} (ID: ${docRef.id})`);
  }
  console.log(`🎉 Добавлено ${tasks.length} заданий`);
}

async function initCollections() {
  console.log('🔥 Начинаем инициализацию Firestore...\n');
  
  try {
    // Создаём тестового пользователя (опционально)
    const testUserRef = doc(db, 'users', 'test_user');
    await setDoc(testUserRef, {
      email: 'test@example.com',
      displayName: 'Тестовый пользователь',
      createdAt: new Date(),
      testResults: [],
      completedTasks: [],
      totalPoints: 0,
      averageScore: 0
    });
    console.log('✅ Создан тестовый пользователь');
    
    // Добавляем тесты
    await addTests();
    
    // Добавляем задания
    await addTasks();
    
    console.log('\n🎉 Инициализация Firestore завершена!');
    console.log('📊 Коллекции созданы:');
    console.log('   - users (пользователи)');
    console.log('   - tests (тесты)');
    console.log('   - tasks (задания)');
    console.log('   - testResults (результаты тестов)');
    console.log('   - userTasks (выполненные задания)');
    
  } catch (error) {
    console.error('❌ Ошибка инициализации:', error);
  }
}

// Запуск
initCollections();