import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// Все тесты по категориям
const allTests = [
  // DevOps
  {
    title: "DevOps: Основы CI/CD",
    category: "devops",
    level: "beginner",
    description: "Базовые концепции непрерывной интеграции и доставки",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что означает CI в CI/CD?", options: ["Continuous Integration", "Code Integration", "Continuous Implementation", "Core Integration"], correct: 0 },
      { id: 2, text: "Что такое CD в CI/CD?", options: ["Continuous Delivery/Deployment", "Code Delivery", "Core Development", "Continuous Development"], correct: 0 },
      { id: 3, text: "Какой инструмент чаще всего используется для CI/CD?", options: ["Jenkins", "Git", "Docker", "Kubernetes"], correct: 0 },
      { id: 4, text: "Что такое pipeline в CI/CD?", options: ["Автоматизированный процесс сборки и доставки", "Трубопровод данных", "Сеть связи", "База данных"], correct: 0 },
      { id: 5, text: "Что такое артефакт в CI/CD?", options: ["Результат сборки", "Инструмент сборки", "Сервер", "База данных"], correct: 0 }
    ]
  },
  {
    title: "DevOps: Контейнеризация",
    category: "devops",
    level: "intermediate",
    description: "Продвинутые знания Docker и контейнеризации",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Docker image?", options: ["Шаблон для создания контейнера", "Запущенный контейнер", "Сеть Docker", "Том данных"], correct: 0 },
      { id: 2, text: "Какая команда создает Docker image?", options: ["docker build", "docker run", "docker create", "docker start"], correct: 0 },
      { id: 3, text: "Что такое Dockerfile?", options: ["Файл инструкций для сборки образа", "Файл конфигурации сети", "Файл логов", "Файл данных"], correct: 0 },
      { id: 4, text: "Что такое Docker Compose?", options: ["Инструмент для многоконтейнерных приложений", "Альтернатива Docker", "Система мониторинга", "CI/CD инструмент"], correct: 0 },
      { id: 5, text: "Что такое Docker volume?", options: ["Механизм сохранения данных", "Сетевой интерфейс", "Тип контейнера", "Образ Docker"], correct: 0 }
    ]
  },
  
  // Frontend
  {
    title: "Frontend: JavaScript ES6+",
    category: "frontend",
    level: "intermediate",
    description: "Современный JavaScript ES6+",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое стрелочные функции?", options: ["() => {}", "function()", "new Function()", "=> function"], correct: 0 },
      { id: 2, text: "Что такое let и const?", options: ["Способы объявления переменных", "Ключевые слова", "Типы данных", "Операторы"], correct: 0 },
      { id: 3, text: "Что такое деструктуризация?", options: ["Распаковка объектов/массивов", "Создание объектов", "Удаление свойств", "Копирование"], correct: 0 },
      { id: 4, text: "Что такое spread оператор?", options: ["...", "&&", "||", "??"], correct: 0 },
      { id: 5, text: "Что такое Promise?", options: ["Объект для асинхронных операций", "Функция", "Массив", "Строка"], correct: 0 }
    ]
  },
  {
    title: "Frontend: CSS Grid и Flexbox",
    category: "frontend",
    level: "beginner",
    description: "Современные CSS технологии для вёрстки",
    timeLimit: 15,
    questions: [
      { id: 1, text: "Что такое Flexbox?", options: ["CSS технология для раскладки", "База данных", "Язык программирования", "Фреймворк"], correct: 0 },
      { id: 2, text: "Какое свойство задаёт направление в Flexbox?", options: ["flex-direction", "justify-content", "align-items", "flex-wrap"], correct: 0 },
      { id: 3, text: "Что такое Grid Layout?", options: ["Двумерная система сеток", "Одномерная раскладка", "Анимация", "Трансформация"], correct: 0 },
      { id: 4, text: "Как центрировать элемент по вертикали и горизонтали в Flexbox?", options: ["justify-content: center; align-items: center", "margin: auto", "position: absolute", "text-align: center"], correct: 0 },
      { id: 5, text: "Что такое медиа-запросы?", options: ["Адаптивность под разные устройства", "Стилизация", "Анимация", "Трансформация"], correct: 0 }
    ]
  },
  
  // Backend
  {
    title: "Backend: Базы данных",
    category: "backend",
    level: "intermediate",
    description: "SQL и NoSQL базы данных",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое SQL?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Structured Question Language"], correct: 0 },
      { id: 2, text: "Что такое NoSQL?", options: ["Not Only SQL", "No SQL", "Non SQL", "New SQL"], correct: 0 },
      { id: 3, text: "Что такое JOIN в SQL?", options: ["Объединение таблиц", "Сортировка", "Фильтрация", "Группировка"], correct: 0 },
      { id: 4, text: "Что такое индекс в БД?", options: ["Ускоряет поиск данных", "Замедляет поиск", "Организует данные", "Сортирует данные"], correct: 0 },
      { id: 5, text: "Что такое транзакция?", options: ["Группа операций, выполняемых как единое целое", "Запрос", "Таблица", "Поле"], correct: 0 }
    ]
  },
  {
    title: "Backend: Node.js",
    category: "backend",
    level: "intermediate",
    description: "Node.js разработка",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Node.js?", options: ["Среда выполнения JavaScript", "Фреймворк", "Библиотека", "Язык программирования"], correct: 0 },
      { id: 2, text: "Что такое npm?", options: ["Менеджер пакетов Node.js", "Node Package Manager", "Утилита", "Инструмент"], correct: 0 },
      { id: 3, text: "Что такое Express.js?", options: ["Фреймворк для Node.js", "База данных", "Сервер", "Маршрутизатор"], correct: 0 },
      { id: 4, text: "Что такое асинхронность в Node.js?", options: ["Неблокирующая модель ввода-вывода", "Параллелизм", "Многопоточность", "Конкурентность"], correct: 0 },
      { id: 5, text: "Что такое Event Loop?", options: ["Механизм обработки асинхронных операций", "Цикл событий", "Очередь", "Планировщик"], correct: 0 }
    ]
  },
  
  // System Analyst
  {
    title: "Системный аналитик: BPMN",
    category: "system-analyst",
    level: "beginner",
    description: "Моделирование бизнес-процессов в BPMN",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое BPMN?", options: ["Business Process Model and Notation", "Business Process Management", "Business Project Management", "Business Process Model"], correct: 0 },
      { id: 2, text: "Какие основные элементы BPMN?", options: ["События, задачи, шлюзы, потоки", "Классы, объекты, методы", "Таблицы, поля, записи", "Модули, функции"], correct: 0 },
      { id: 3, text: "Что такое событие (Event) в BPMN?", options: ["То, что происходит в процессе", "Действие", "Условие", "Результат"], correct: 0 },
      { id: 4, text: "Что такое задача (Task) в BPMN?", options: ["Работа, которую нужно выполнить", "Событие", "Шлюз", "Поток"], correct: 0 },
      { id: 5, text: "Что такое шлюз (Gateway) в BPMN?", options: ["Управление ветвлением процесса", "Событие", "Задача", "Поток"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: UML",
    category: "system-analyst",
    level: "intermediate",
    description: "Диаграммы UML для аналитика",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое UML?", options: ["Unified Modeling Language", "Universal Modeling Language", "Unified Markup Language", "Universal Markup Language"], correct: 0 },
      { id: 2, text: "Какая диаграмма показывает варианты использования?", options: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "Activity Diagram"], correct: 0 },
      { id: 3, text: "Что такое актор (Actor) в Use Case?", options: ["Внешний пользователь системы", "Система", "Событие", "Действие"], correct: 0 },
      { id: 4, text: "Какая диаграмма показывает структуру классов?", options: ["Class Diagram", "Sequence Diagram", "Activity Diagram", "State Diagram"], correct: 0 },
      { id: 5, text: "Какая диаграмма показывает взаимодействие объектов по времени?", options: ["Sequence Diagram", "Class Diagram", "Activity Diagram", "State Diagram"], correct: 0 }
    ]
  },
  
  // Project Manager
  {
    title: "Project Manager: Agile основы",
    category: "project-manager",
    level: "beginner",
    description: "Базовые принципы Agile",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Agile?", options: ["Гибкая методология разработки", "Система контроля версий", "База данных", "Язык программирования"], correct: 0 },
      { id: 2, text: "Что такое Scrum?", options: ["Фреймворк для управления проектами", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 3, text: "Кто такой Scrum Master?", options: ["Ответственный за процесс Scrum", "Владелец продукта", "Разработчик", "Тестировщик"], correct: 0 },
      { id: 4, text: "Что такое Sprint?", options: ["Итерация в Scrum", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 5, text: "Что такое Product Backlog?", options: ["Список требований к продукту", "План спринта", "База данных", "Система мониторинга"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Kanban",
    category: "project-manager",
    level: "intermediate",
    description: "Методология Kanban",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Kanban?", options: ["Метод управления задачами", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 2, text: "Что такое WIP limit?", options: ["Ограничение незавершённых задач", "Лимит работы", "Ограничение времени", "Лимит задач"], correct: 0 },
      { id: 3, text: "Что такое Lead Time в Kanban?", options: ["Время от запроса до доставки", "Время работы", "Время ожидания", "Время выполнения"], correct: 0 },
      { id: 4, text: "Что такое Cycle Time в Kanban?", options: ["Время активной работы над задачей", "Время ожидания", "Время от запроса до доставки", "Время выполнения"], correct: 0 },
      { id: 5, text: "Какие столбцы обычно есть на Kanban доске?", options: ["To Do, In Progress, Done", "Backlog, Sprint, Done", "Open, In Progress, Closed", "New, Work, Complete"], correct: 0 }
    ]
  },
  
  // QA
  {
    title: "QA: Основы тестирования",
    category: "qa",
    level: "beginner",
    description: "Базовые знания тестирования",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое тестирование?", options: ["Проверка качества ПО", "Написание кода", "Управление проектами", "Дизайн интерфейсов"], correct: 0 },
      { id: 2, text: "Что такое баг (bug)?", options: ["Ошибка в программе", "Функция программы", "Требование клиента", "Документ"], correct: 0 },
      { id: 3, text: "Что такое тест-кейс?", options: ["Сценарий тестирования", "Результат теста", "Баг-репорт", "План проекта"], correct: 0 },
      { id: 4, text: "Что такое smoke testing?", options: ["Дымовое тестирование", "Нагрузочное тестирование", "Юнит-тестирование", "Регрессионное тестирование"], correct: 0 },
      { id: 5, text: "Что такое regression testing?", options: ["Регрессионное тестирование", "Дымовое тестирование", "Нагрузочное тестирование", "Юнит-тестирование"], correct: 0 }
    ]
  },
  {
    title: "QA: Автоматизация",
    category: "qa",
    level: "intermediate",
    description: "Автоматизированное тестирование",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Selenium?", options: ["Инструмент для автоматизации браузера", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 2, text: "Что такое Cypress?", options: ["Фреймворк для автотестов", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 3, text: "Что такое JUnit?", options: ["Фреймворк для юнит-тестов Java", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 4, text: "Что такое Jest?", options: ["Фреймворк для тестов JavaScript", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 5, text: "Что такое Page Object Model?", options: ["Паттерн для автотестов", "Модель данных", "Архитектура", "Фреймворк"], correct: 0 }
    ]
  }
];

async function addAllTests() {
  console.log(`🚀 Добавляем ${allTests.length} тестов...\n`);
  
  for (let i = 0; i < allTests.length; i++) {
    const test = allTests[i];
    const testData = {
      ...test,
      questionsCount: test.questions.length,
      createdAt: new Date()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'tests'), testData);
      console.log(`✅ [${i + 1}/${allTests.length}] Добавлен: ${test.title}`);
    } catch (error) {
      console.error(`❌ Ошибка добавления ${test.title}:`, error);
    }
  }
  
  console.log(`\n🎉 Добавлено ${allTests.length} тестов!`);
}

addAllTests();