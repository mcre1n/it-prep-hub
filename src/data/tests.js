export const categories = [
  {
    id: 'devops',
    name: 'DevOps',
    icon: '🚀',
    color: 'blue',
    description: 'CI/CD, Docker, Kubernetes, Cloud',
  },
  {
    id: 'system-analyst',
    name: 'Системный аналитик',
    icon: '📊',
    color: 'purple',
    description: 'BPMN, UML, требования, API',
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    icon: '📋',
    color: 'green',
    description: 'Agile, Scrum, управление рисками',
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '⚙️',
    color: 'orange',
    description: 'API, базы данных, сервера',
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icon: '🎨',
    color: 'pink',
    description: 'React, Vue, CSS, JavaScript',
  },
  {
    id: 'qa',
    name: 'QA Engineer',
    icon: '🔍',
    color: 'red',
    description: 'Тестирование, автоматизация, bug tracking',
  },
];

export const sampleTests = [
  {
    id: 'devops-1',
    title: 'DevOps Базовый',
    category: 'devops',
    level: 'beginner',
    questionsCount: 10,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        text: 'Что означает CI в CI/CD?',
        options: [
          'Continuous Integration',
          'Code Integration',
          'Continuous Implementation',
          'Core Integration',
        ],
        correct: 0,
      },
      {
        id: 2,
        text: 'Какой инструмент используется для контейнеризации?',
        options: ['Jenkins', 'Git', 'Docker', 'Ansible'],
        correct: 2,
      },
      {
        id: 3,
        text: 'Что такое Kubernetes?',
        options: [
          'Система контроля версий',
          'Платформа для CI/CD',
          'Оркестрация контейнеров',
          'Инструмент для мониторинга',
        ],
        correct: 2,
      },
      {
        id: 4,
        text: 'Какой протокол используется для автоматизации конфигурации?',
        options: ['HTTP', 'SSH', 'FTP', 'SMTP'],
        correct: 1,
      },
      {
        id: 5,
        text: 'Что такое Git?',
        options: [
          'Система контроля версий',
          'CI/CD инструмент',
          'Контейнеризация',
          'Язык программирования',
        ],
        correct: 0,
      },
    ],
  },
];
