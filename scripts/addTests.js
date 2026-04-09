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

// ========== 50 ТЕСТОВ ДЛЯ ВСЕХ IT-СПЕЦИАЛЬНОСТЕЙ ==========
const tests = [
  // ==================== DEVOPS (6 тестов) ====================
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
      { id: 5, text: "Какой файл описывает pipeline в GitLab CI?", options: [".gitlab-ci.yml", "Jenkinsfile", "Dockerfile", "pipeline.yml"], correct: 0 },
      { id: 6, text: "Что такое артефакт в CI/CD?", options: ["Результат сборки", "Инструмент сборки", "Сервер", "База данных"], correct: 0 },
      { id: 7, text: "Какой инструмент используется для управления зависимостями в Java?", options: ["Maven", "npm", "pip", "gem"], correct: 0 },
      { id: 8, text: "Что такое Blue/Green deployment?", options: ["Стратегия развертывания с двумя окружениями", "Цветовая схема", "Тип тестирования", "Методология"], correct: 0 },
      { id: 9, text: "Что такое Canary deployment?", options: ["Поэтапное развертывание для части пользователей", "Полное обновление", "Откат версии", "Тестирование"], correct: 0 },
      { id: 10, text: "Какой инструмент используется для оркестрации контейнеров?", options: ["Kubernetes", "Docker", "Podman", "Containerd"], correct: 0 }
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
      { id: 4, text: "Какая инструкция Dockerfile задает базовый образ?", options: ["FROM", "BASE", "IMAGE", "START"], correct: 0 },
      { id: 5, text: "Что такое Docker Compose?", options: ["Инструмент для многоконтейнерных приложений", "Альтернатива Docker", "Система мониторинга", "CI/CD инструмент"], correct: 0 },
      { id: 6, text: "Какой файл использует Docker Compose?", options: ["docker-compose.yml", "dockerfile.yml", "compose.yml", "docker.yaml"], correct: 0 },
      { id: 7, text: "Что такое Docker volume?", options: ["Механизм сохранения данных", "Сетевой интерфейс", "Тип контейнера", "Образ Docker"], correct: 0 },
      { id: 8, text: "Какая команда запускает контейнер?", options: ["docker run", "docker start", "docker exec", "docker create"], correct: 0 },
      { id: 9, text: "Что такое Docker registry?", options: ["Хранилище образов", "Сеть Docker", "Утилита командной строки", "Тип контейнера"], correct: 0 },
      { id: 10, text: "Какой официальный registry от Docker?", options: ["Docker Hub", "Docker Registry", "Docker Store", "Docker Cloud"], correct: 0 }
    ]
  },
  {
    title: "DevOps: Kubernetes",
    category: "devops",
    level: "advanced",
    description: "Оркестрация контейнеров в Kubernetes",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое Pod в Kubernetes?", options: ["Группа контейнеров", "Узел кластера", "Сервис", "Том данных"], correct: 0 },
      { id: 2, text: "Какой объект Kubernetes управляет репликацией Pod?", options: ["Deployment", "Service", "ConfigMap", "Secret"], correct: 0 },
      { id: 3, text: "Что такое Service в Kubernetes?", options: ["Стабильный сетевой endpoint", "Тип пода", "Конфигурация", "Хранилище"], correct: 0 },
      { id: 4, text: "Какой инструмент используется для управления Kubernetes?", options: ["kubectl", "k8sctl", "kubeadm", "minikube"], correct: 0 },
      { id: 5, text: "Что такое Ingress в Kubernetes?", options: ["Управление входящим трафиком", "Исходящий трафик", "Балансировщик", "Сеть"], correct: 0 },
      { id: 6, text: "Что такое ConfigMap?", options: ["Хранение конфигурации", "Секретные данные", "Том данных", "Сервис"], correct: 0 },
      { id: 7, text: "Что такое Secret в Kubernetes?", options: ["Хранение чувствительных данных", "Конфигурация", "Том", "Сеть"], correct: 0 },
      { id: 8, text: "Что такое Namespace в Kubernetes?", options: ["Виртуальный кластер", "Имя сервиса", "Тип пода", "Сеть"], correct: 0 },
      { id: 9, text: "Что такое Helm?", options: ["Пакетный менеджер для Kubernetes", "CI/CD инструмент", "Мониторинг", "Логирование"], correct: 0 },
      { id: 10, text: "Что такое StatefulSet?", options: ["Для stateful-приложений", "Для stateless-приложений", "Для batch-задач", "Для cron-задач"], correct: 0 }
    ]
  },
  {
    title: "DevOps: Облачные технологии",
    category: "devops",
    level: "intermediate",
    description: "AWS, GCP, Azure основы",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое IaaS?", options: ["Infrastructure as a Service", "Platform as a Service", "Software as a Service", "Function as a Service"], correct: 0 },
      { id: 2, text: "Что такое PaaS?", options: ["Platform as a Service", "Infrastructure as a Service", "Software as a Service", "Database as a Service"], correct: 0 },
      { id: 3, text: "Что такое SaaS?", options: ["Software as a Service", "Platform as a Service", "Infrastructure as a Service", "Storage as a Service"], correct: 0 },
      { id: 4, text: "Какой сервис AWS для виртуальных машин?", options: ["EC2", "S3", "RDS", "Lambda"], correct: 0 },
      { id: 5, text: "Какой сервис AWS для object storage?", options: ["S3", "EBS", "EFS", "Glacier"], correct: 0 },
      { id: 6, text: "Что такое AWS Lambda?", options: ["Serverless функции", "Виртуальные машины", "База данных", "Хранилище"], correct: 0 },
      { id: 7, text: "Какой сервис GCP для виртуальных машин?", options: ["Compute Engine", "App Engine", "Cloud Functions", "Cloud Run"], correct: 0 },
      { id: 8, text: "Что такое Azure Functions?", options: ["Serverless в Azure", "ВМ в Azure", "БД в Azure", "Хранилище в Azure"], correct: 0 },
      { id: 9, text: "Что такое Terraform?", options: ["IaC инструмент", "CI/CD инструмент", "Мониторинг", "Логирование"], correct: 0 },
      { id: 10, text: "Что такое Ansible?", options: ["Инструмент автоматизации конфигурации", "IaC", "CI/CD", "Мониторинг"], correct: 0 }
    ]
  },
  {
    title: "DevOps: Мониторинг и логирование",
    category: "devops",
    level: "intermediate",
    description: "Prometheus, Grafana, ELK Stack",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Prometheus?", options: ["Система мониторинга", "База данных", "CI/CD инструмент", "Логирование"], correct: 0 },
      { id: 2, text: "Что такое Grafana?", options: ["Визуализация метрик", "Сбор метрик", "Хранение метрик", "Алертинг"], correct: 0 },
      { id: 3, text: "Что такое ELK Stack?", options: ["Elasticsearch, Logstash, Kibana", "Elastic, Logstash, Kafka", "Elastic, Logstash, Kibana", "Elasticsearch, Logstash, Kafka"], correct: 0 },
      { id: 4, text: "Что такое PromQL?", options: ["Язык запросов Prometheus", "База данных", "Протокол", "Формат данных"], correct: 0 },
      { id: 5, text: "Что такое Alertmanager?", options: ["Управление алертами в Prometheus", "Сбор метрик", "Визуализация", "Хранение"], correct: 0 },
      { id: 6, text: "Что такое Loki?", options: ["Система логирования от Grafana", "База данных", "Мониторинг", "Алертинг"], correct: 0 },
      { id: 7, text: "Что такое Datadog?", options: ["Платформа мониторинга", "CI/CD", "Логирование", "Безопасность"], correct: 0 },
      { id: 8, text: "Что такое New Relic?", options: ["APM мониторинг", "Логирование", "Метрики", "Алертинг"], correct: 0 },
      { id: 9, text: "Что такое OpenTelemetry?", options: ["Стандарт для телеметрии", "База данных", "CI/CD", "Мониторинг"], correct: 0 },
      { id: 10, text: "Что такое SLO?", options: ["Service Level Objective", "Service Level Agreement", "Service Level Indicator", "Service Level Object"], correct: 0 }
    ]
  },
  {
    title: "DevOps: Безопасность",
    category: "devops",
    level: "advanced",
    description: "DevSecOps, безопасность контейнеров",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое DevSecOps?", options: ["Интеграция безопасности в DevOps", "Методология разработки", "CI/CD процесс", "Тестирование"], correct: 0 },
      { id: 2, text: "Что такое SAST?", options: ["Static Application Security Testing", "Dynamic Application Security Testing", "Software Testing", "Security Testing"], correct: 0 },
      { id: 3, text: "Что такое DAST?", options: ["Dynamic Application Security Testing", "Static Application Security Testing", "Software Testing", "Security Testing"], correct: 0 },
      { id: 4, text: "Что такое Trivy?", options: ["Сканер уязвимостей контейнеров", "CI/CD инструмент", "Мониторинг", "Логирование"], correct: 0 },
      { id: 5, text: "Что такое Clair?", options: ["Сканер уязвимостей", "CI/CD", "Мониторинг", "Логирование"], correct: 0 },
      { id: 6, text: "Что такое Vault от HashiCorp?", options: ["Управление секретами", "CI/CD", "Мониторинг", "IaC"], correct: 0 },
      { id: 7, text: "Что такое OPA?", options: ["Open Policy Agent", "Open Source", "Open Platform", "Open API"], correct: 0 },
      { id: 8, text: "Что такое SBOM?", options: ["Software Bill of Materials", "Software Build", "Software Bill", "Software Management"], correct: 0 },
      { id: 9, text: "Что такое image scanning?", options: ["Сканирование образов на уязвимости", "Создание образов", "Запуск образов", "Хранение образов"], correct: 0 },
      { id: 10, text: "Что такое secret management?", options: ["Управление секретами и ключами", "Управление паролями", "Шифрование", "Аутентификация"], correct: 0 }
    ]
  },

  // ==================== СИСТЕМНЫЙ АНАЛИТИК (7 тестов) ====================
  {
    title: "Системный аналитик: Основы",
    category: "system-analyst",
    level: "beginner",
    description: "Базовые понятия системного анализа",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое системный анализ?", options: ["Изучение и проектирование систем", "Программирование", "Тестирование", "Управление проектами"], correct: 0 },
      { id: 2, text: "Что такое стейкхолдер?", options: ["Заинтересованное лицо", "Разработчик", "Тестировщик", "Менеджер"], correct: 0 },
      { id: 3, text: "Что такое функциональное требование?", options: ["Что система должна делать", "Как система работает", "Ограничения системы", "Качество системы"], correct: 0 },
      { id: 4, text: "Что такое нефункциональное требование?", options: ["Качество и ограничения системы", "Функции системы", "Бизнес-правила", "Интерфейсы"], correct: 0 },
      { id: 5, text: "Что такое BRD?", options: ["Business Requirements Document", "Technical Requirements", "System Requirements", "User Requirements"], correct: 0 },
      { id: 6, text: "Что такое SRS?", options: ["Software Requirements Specification", "System Requirements", "Business Requirements", "User Stories"], correct: 0 },
      { id: 7, text: "Что такое MVP?", options: ["Minimum Viable Product", "Model View Presenter", "Minimum Value Product", "Maximum Value Product"], correct: 0 },
      { id: 8, text: "Что такое Prototype?", options: ["Прототип системы", "Готовый продукт", "Документ", "Тест"], correct: 0 },
      { id: 9, text: "Что такое Gap Analysis?", options: ["Анализ различий", "Анализ требований", "Анализ рисков", "Анализ стоимости"], correct: 0 },
      { id: 10, text: "Что такое Feasibility Study?", options: ["Оценка可行性", "Требования", "Риски", "Бюджет"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: BPMN",
    category: "system-analyst",
    level: "intermediate",
    description: "Моделирование бизнес-процессов в BPMN",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое BPMN?", options: ["Business Process Model and Notation", "Business Process Management", "Business Project Management", "Business Process Model"], correct: 0 },
      { id: 2, text: "Какие основные элементы BPMN?", options: ["События, задачи, шлюзы, потоки", "Классы, объекты, методы", "Таблицы, поля, записи", "Модули, функции"], correct: 0 },
      { id: 3, text: "Что такое событие (Event) в BPMN?", options: ["То, что происходит в процессе", "Действие", "Условие", "Результат"], correct: 0 },
      { id: 4, text: "Что такое задача (Task) в BPMN?", options: ["Работа, которую нужно выполнить", "Событие", "Шлюз", "Поток"], correct: 0 },
      { id: 5, text: "Что такое шлюз (Gateway) в BPMN?", options: ["Управление ветвлением процесса", "Событие", "Задача", "Поток"], correct: 0 },
      { id: 6, text: "Какой шлюз используется для ветвления 'И'?", options: ["Parallel Gateway", "Exclusive Gateway", "Inclusive Gateway", "Event Gateway"], correct: 0 },
      { id: 7, text: "Какой шлюз используется для ветвления 'ИЛИ'?", options: ["Inclusive Gateway", "Exclusive Gateway", "Parallel Gateway", "Event Gateway"], correct: 0 },
      { id: 8, text: "Что такое пул (Pool) в BPMN?", options: ["Участник процесса", "Задача", "Событие", "Шлюз"], correct: 0 },
      { id: 9, text: "Что такое дорожка (Lane) в BPMN?", options: ["Роль внутри пула", "Участник", "Задача", "Событие"], correct: 0 },
      { id: 10, text: "Что такое артефакт в BPMN?", options: ["Дополнительная информация", "Событие", "Задача", "Шлюз"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: UML",
    category: "system-analyst",
    level: "intermediate",
    description: "Диаграммы UML для аналитика",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое UML?", options: ["Unified Modeling Language", "Universal Modeling Language", "Unified Markup Language", "Universal Markup Language"], correct: 0 },
      { id: 2, text: "Какая диаграмма показывает варианты использования?", options: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "Activity Diagram"], correct: 0 },
      { id: 3, text: "Что такое актор (Actor) в Use Case?", options: ["Внешний пользователь системы", "Система", "Событие", "Действие"], correct: 0 },
      { id: 4, text: "Какая диаграмма показывает структуру классов?", options: ["Class Diagram", "Sequence Diagram", "Activity Diagram", "State Diagram"], correct: 0 },
      { id: 5, text: "Что такое ассоциация в Class Diagram?", options: ["Связь между классами", "Метод класса", "Атрибут класса", "Наследование"], correct: 0 },
      { id: 6, text: "Что такое наследование в UML?", options: ["Отношение 'является'", "Связь", "Зависимость", "Агрегация"], correct: 0 },
      { id: 7, text: "Какая диаграмма показывает взаимодействие объектов по времени?", options: ["Sequence Diagram", "Class Diagram", "Activity Diagram", "State Diagram"], correct: 0 },
      { id: 8, text: "Что такое линия жизни в Sequence Diagram?", options: ["Объект во времени", "Сообщение", "Событие", "Действие"], correct: 0 },
      { id: 9, text: "Какая диаграмма показывает бизнес-процессы?", options: ["Activity Diagram", "Sequence Diagram", "Class Diagram", "State Diagram"], correct: 0 },
      { id: 10, text: "Что такое состояние (State) в State Machine Diagram?", options: ["Состояние объекта", "Событие", "Переход", "Действие"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: Требования",
    category: "system-analyst",
    level: "intermediate",
    description: "Работа с требованиями и документацией",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое SMART критерии для требований?", options: ["Specific, Measurable, Achievable, Relevant, Time-bound", "Simple, Measurable, Achievable, Relevant, Testable", "Specific, Meaningful, Achievable, Relevant, Traceable", "Simple, Meaningful, Achievable, Relevant, Time-bound"], correct: 0 },
      { id: 2, text: "Что такое MoSCoW?", options: ["Must, Should, Could, Won't", "More, Some, Could, Will", "Must, Shall, Can, Will", "Major, Secondary, Could, Won't"], correct: 0 },
      { id: 3, text: "Что такое user story?", options: ["История пользователя", "Требование", "Тест-кейс", "Баг-репорт"], correct: 0 },
      { id: 4, text: "Формат user story?", options: ["Как <роль>, я хочу <действие>, чтобы <ценность>", "Я хочу <действие>", "Система должна <действие>", "Пользователь может <действие>"], correct: 0 },
      { id: 5, text: "Что такое acceptance criteria?", options: ["Критерии приемки", "Требования", "Тесты", "Сценарии"], correct: 0 },
      { id: 6, text: "Что такое INVEST в user stories?", options: ["Independent, Negotiable, Valuable, Estimable, Small, Testable", "Important, Negotiable, Valuable, Estimable, Small, Testable", "Independent, Necessary, Valuable, Estimable, Small, Testable", "Independent, Negotiable, Valuable, Estimable, Simple, Testable"], correct: 0 },
      { id: 7, text: "Что такое traceability matrix?", options: ["Матрица трассировки требований", "Матрица тестов", "Матрица рисков", "Матрица решений"], correct: 0 },
      { id: 8, text: "Что такое requirements prioritization?", options: ["Приоритизация требований", "Сбор требований", "Анализ требований", "Валидация требований"], correct: 0 },
      { id: 9, text: "Что такое requirements validation?", options: ["Валидация требований", "Сбор требований", "Приоритизация", "Документирование"], correct: 0 },
      { id: 10, text: "Что такое requirements elicitation?", options: ["Сбор требований", "Валидация", "Приоритизация", "Документирование"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: API и интеграции",
    category: "system-analyst",
    level: "intermediate",
    description: "API, интеграции, обмен данными",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое API?", options: ["Application Programming Interface", "Application Protocol Interface", "Application Program Interface", "Application Process Interface"], correct: 0 },
      { id: 2, text: "Что такое REST API?", options: ["Representational State Transfer", "REstful State Transfer", "REpresentational State Transmission", "REstful State Transmission"], correct: 0 },
      { id: 3, text: "Какие методы HTTP используются в REST?", options: ["GET, POST, PUT, DELETE, PATCH", "SELECT, INSERT, UPDATE, DELETE", "READ, WRITE, UPDATE, DELETE", "FETCH, SEND, UPDATE, REMOVE"], correct: 0 },
      { id: 4, text: "Что такое JSON?", options: ["JavaScript Object Notation", "Java Object Notation", "JavaScript Oriented Notation", "Java Oriented Notation"], correct: 0 },
      { id: 5, text: "Что такое XML?", options: ["eXtensible Markup Language", "eXtra Markup Language", "eXtended Markup Language", "eXternal Markup Language"], correct: 0 },
      { id: 6, text: "Что такое GraphQL?", options: ["Язык запросов для API", "База данных", "Протокол", "Формат данных"], correct: 0 },
      { id: 7, text: "Что такое SOAP?", options: ["Simple Object Access Protocol", "Simple Object Application Protocol", "Simple Oriented Access Protocol", "Simple Object Access Procedure"], correct: 0 },
      { id: 8, text: "Что такое WebSocket?", options: ["Протокол двунаправленной связи", "HTTP метод", "Формат данных", "База данных"], correct: 0 },
      { id: 9, text: "Что такое gRPC?", options: ["High-performance RPC framework", "База данных", "Протокол", "Формат данных"], correct: 0 },
      { id: 10, text: "Что такое OpenAPI/Swagger?", options: ["Спецификация для описания API", "База данных", "Протокол", "Язык программирования"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: DDD",
    category: "system-analyst",
    level: "advanced",
    description: "Domain-Driven Design",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое Domain-Driven Design?", options: ["Подход к проектированию сложных систем", "Методология разработки", "Архитектурный паттерн", "База данных"], correct: 0 },
      { id: 2, text: "Что такое Bounded Context?", options: ["Границы контекста в предметной области", "Ограниченный контекст", "Контекст выполнения", "Бизнес-контекст"], correct: 0 },
      { id: 3, text: "Что такое Entity в DDD?", options: ["Объект с идентичностью", "Объект без идентичности", "Сервис", "Событие"], correct: 0 },
      { id: 4, text: "Что такое Value Object в DDD?", options: ["Объект без идентичности", "Объект с идентичностью", "Сервис", "Событие"], correct: 0 },
      { id: 5, text: "Что такое Aggregate в DDD?", options: ["Группа объектов с корневой сущностью", "Событие", "Сервис", "Репозиторий"], correct: 0 },
      { id: 6, text: "Что такое Aggregate Root?", options: ["Корень агрегата", "Главный объект", "Базовый класс", "Интерфейс"], correct: 0 },
      { id: 7, text: "Что такое Repository в DDD?", options: ["Паттерн для доступа к данным", "Хранилище", "Сервис", "Событие"], correct: 0 },
      { id: 8, text: "Что такое Domain Service?", options: ["Сервис предметной области", "Технический сервис", "Инфраструктурный сервис", "Прикладной сервис"], correct: 0 },
      { id: 9, text: "Что такое Domain Event?", options: ["Событие предметной области", "Системное событие", "UI событие", "Сетевое событие"], correct: 0 },
      { id: 10, text: "Что такое Ubiquitous Language?", options: ["Единый язык команды и экспертов", "Язык программирования", "Язык моделирования", "Язык документации"], correct: 0 }
    ]
  },
  {
    title: "Системный аналитик: Архитектура",
    category: "system-analyst",
    level: "advanced",
    description: "Архитектурные паттерны и подходы",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое Monolithic architecture?", options: ["Монолитная архитектура", "Микросервисная", "Серверлесс", "Событийная"], correct: 0 },
      { id: 2, text: "Что такое Microservices architecture?", options: ["Микросервисная архитектура", "Монолитная", "Серверлесс", "Событийная"], correct: 0 },
      { id: 3, text: "Что такое Event-Driven Architecture?", options: ["Событийная архитектура", "Микросервисная", "Монолитная", "Серверлесс"], correct: 0 },
      { id: 4, text: "Что такое CQRS?", options: ["Command Query Responsibility Segregation", "Command Query Response Segregation", "Command Query Responsibility Separation", "Command Query Response Separation"], correct: 0 },
      { id: 5, text: "Что такое Event Sourcing?", options: ["Хранение событий как источника истины", "Событийное программирование", "Обработка событий", "Генерация событий"], correct: 0 },
      { id: 6, text: "Что такое Message Broker?", options: ["Брокер сообщений", "База данных", "Кэш", "Прокси"], correct: 0 },
      { id: 7, text: "Что такое API Gateway?", options: ["Единая точка входа для API", "База данных", "Кэш", "Лоадер"], correct: 0 },
      { id: 8, text: "Что такое Circuit Breaker?", options: ["Паттерн защиты от каскадных отказов", "Безопасность", "Мониторинг", "Логирование"], correct: 0 },
      { id: 9, text: "Что такое Saga pattern?", options: ["Управление распределенными транзакциями", "Шаблон проектирования", "Архитектурный паттерн", "Паттерн интеграции"], correct: 0 },
      { id: 10, text: "Что такое Strangler pattern?", options: ["Постепенная миграция legacy систем", "Реконструкция", "Рефакторинг", "Переписывание"], correct: 0 }
    ]
  },

  // ==================== PROJECT MANAGER (7 тестов) ====================
  {
    title: "Project Manager: Agile основы",
    category: "project-manager",
    level: "beginner",
    description: "Базовые принципы Agile",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Agile?", options: ["Гибкая методология разработки", "Система контроля версий", "База данных", "Язык программирования"], correct: 0 },
      { id: 2, text: "Что такое Scrum?", options: ["Фреймворк для управления проектами", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 3, text: "Что такое Scrum Master?", options: ["Ответственный за процесс Scrum", "Владелец продукта", "Разработчик", "Тестировщик"], correct: 0 },
      { id: 4, text: "Что такое Product Owner?", options: ["Владелец продукта", "Скрам-мастер", "Разработчик", "Тестировщик"], correct: 0 },
      { id: 5, text: "Что такое Sprint?", options: ["Итерация в Scrum", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 6, text: "Что такое Product Backlog?", options: ["Список требований к продукту", "План спринта", "База данных", "Система мониторинга"], correct: 0 },
      { id: 7, text: "Что такое Sprint Backlog?", options: ["Список задач на спринт", "Список требований", "План релиза", "База данных"], correct: 0 },
      { id: 8, text: "Что такое Daily Standup?", options: ["Ежедневная планерка", "План спринта", "Ретроспектива", "Демонстрация"], correct: 0 },
      { id: 9, text: "Что такое Sprint Review?", options: ["Демонстрация результатов спринта", "Планирование", "Ретроспектива", "Ежедневная встреча"], correct: 0 },
      { id: 10, text: "Что такое Sprint Retrospective?", options: ["Анализ прошедшего спринта", "Планирование", "Демонстрация", "Ежедневная встреча"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Scrum детально",
    category: "project-manager",
    level: "intermediate",
    description: "Глубокое понимание Scrum",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Кто формирует Product Backlog?", options: ["Product Owner", "Scrum Master", "Команда", "Стейкхолдеры"], correct: 0 },
      { id: 2, text: "Кто приоритизирует Product Backlog?", options: ["Product Owner", "Scrum Master", "Команда", "Стейкхолдеры"], correct: 0 },
      { id: 3, text: "Что такое Definition of Done?", options: ["Критерии готовности", "Определение задачи", "План спринта", "Цель спринта"], correct: 0 },
      { id: 4, text: "Что такое Sprint Goal?", options: ["Цель спринта", "План спринта", "Результат спринта", "Задача спринта"], correct: 0 },
      { id: 5, text: "Что такое Timeboxing?", options: ["Ограничение времени на активность", "Планирование времени", "Учет времени", "Отслеживание времени"], correct: 0 },
      { id: 6, text: "Какова максимальная длительность спринта в Scrum?", options: ["1 месяц", "2 недели", "3 недели", "2 месяца"], correct: 0 },
      { id: 7, text: "Что такое User Story Mapping?", options: ["Техника визуализации пользовательских историй", "Карта пользователя", "Карта требований", "Карта задач"], correct: 0 },
      { id: 8, text: "Что такое Story Points?", options: ["Оценка сложности задачи", "Баллы за задачу", "Очки пользователя", "Очки истории"], correct: 0 },
      { id: 9, text: "Что такое Planning Poker?", options: ["Техника оценки задач", "Игра в покер", "План покера", "Оценка покера"], correct: 0 },
      { id: 10, text: "Что такое Burndown Chart?", options: ["Диаграмма сгорания задач", "Диаграмма прогресса", "Диаграмма спринта", "Диаграмма задач"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Kanban",
    category: "project-manager",
    level: "intermediate",
    description: "Методология Kanban",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Kanban?", options: ["Метод управления задачами", "Доска задач", "Система учета", "База данных"], correct: 0 },
      { id: 2, text: "Что такое WIP limit?", options: ["Ограничение незавершенных задач", "Лимит работы", "Ограничение времени", "Лимит задач"], correct: 0 },
      { id: 3, text: "Что такое Cumulative Flow Diagram?", options: ["Диаграмма накопленного потока", "Диаграмма сгорания", "Диаграмма прогресса", "Диаграмма задач"], correct: 0 },
      { id: 4, text: "Что такое Lead Time в Kanban?", options: ["Время от запроса до доставки", "Время работы", "Время ожидания", "Время выполнения"], correct: 0 },
      { id: 5, text: "Что такое Cycle Time в Kanban?", options: ["Время активной работы над задачей", "Время ожидания", "Время от запроса до доставки", "Время выполнения"], correct: 0 },
      { id: 6, text: "Какие столбцы обычно есть на Kanban доске?", options: ["To Do, In Progress, Done", "Backlog, Sprint, Done", "Open, In Progress, Closed", "New, Work, Complete"], correct: 0 },
      { id: 7, text: "Что такое Swimlanes в Kanban?", options: ["Горизонтальные разделы доски", "Вертикальные разделы", "Статусы задач", "Типы задач"], correct: 0 },
      { id: 8, text: "Что такое классы обслуживания в Kanban?", options: ["Категории задач с разным приоритетом", "Типы задач", "Статусы задач", "Роли пользователей"], correct: 0 },
      { id: 9, text: "Что такое эксплицитные политики в Kanban?", options: ["Явные правила работы", "Скрытые правила", "Автоматические правила", "Системные правила"], correct: 0 },
      { id: 10, text: "Как часто обновляется Kanban доска?", options: ["Непрерывно", "Ежедневно", "Еженедельно", "По спринтам"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Управление рисками",
    category: "project-manager",
    level: "intermediate",
    description: "Управление рисками в проектах",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое риск в проекте?", options: ["Неопределенное событие", "Проблема", "Ошибка", "Баг"], correct: 0 },
      { id: 2, text: "Какие типы рисков бывают?", options: ["Внутренние и внешние", "Технические и бизнес", "Критические и некритические", "Высокие и низкие"], correct: 0 },
      { id: 3, text: "Что такое риск-менеджмент?", options: ["Управление рисками", "Оценка рисков", "Минимизация рисков", "Идентификация рисков"], correct: 0 },
      { id: 4, text: "Какие этапы риск-менеджмента?", options: ["Идентификация, анализ, планирование, мониторинг", "Оценка, контроль, отчетность", "Выявление, устранение, проверка", "Сбор, анализ, решение"], correct: 0 },
      { id: 5, text: "Что такое матрица рисков?", options: ["Оценка вероятности и влияния", "Список рисков", "План рисков", "Анализ рисков"], correct: 0 },
      { id: 6, text: "Что такое стратегия избегания риска?", options: ["Устранение источника риска", "Передача риска", "Снижение риска", "Принятие риска"], correct: 0 },
      { id: 7, text: "Что такое стратегия передачи риска?", options: ["Передача ответственности третьей стороне", "Страхование", "Аутсорсинг", "Контрактация"], correct: 0 },
      { id: 8, text: "Что такое стратегия снижения риска?", options: ["Уменьшение вероятности или влияния", "Митигация", "Контроль", "Предотвращение"], correct: 0 },
      { id: 9, text: "Что такое стратегия принятия риска?", options: ["Признание риска и готовность к последствиям", "Игнорирование", "Отказ", "Бездействие"], correct: 0 },
      { id: 10, text: "Что такое реестр рисков?", options: ["Документ со списком рисков", "База рисков", "Журнал рисков", "Каталог рисков"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Управление сроками",
    category: "project-manager",
    level: "intermediate",
    description: "Управление временем в проектах",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое WBS?", options: ["Work Breakdown Structure", "Work Base Structure", "Workflow Breakdown Structure", "Work Breakdown System"], correct: 0 },
      { id: 2, text: "Что такое Critical Path Method?", options: ["Метод критического пути", "Критический метод", "Метод пути", "Ключевой метод"], correct: 0 },
      { id: 3, text: "Что такое Gantt диаграмма?", options: ["Визуализация графика проекта", "Диаграмма Ганта", "Диаграмма задач", "График работ"], correct: 0 },
      { id: 4, text: "Что такое Milestone?", options: ["Контрольная точка", "Веха", "Этап", "Событие"], correct: 0 },
      { id: 5, text: "Что такое PERT?", options: ["Program Evaluation and Review Technique", "Метод оценки программ", "Техника оценки", "Метод планирования"], correct: 0 },
      { id: 6, text: "Что такое Float (Slack) в проекте?", options: ["Резерв времени", "Запас времени", "Свободное время", "Дополнительное время"], correct: 0 },
      { id: 7, text: "Что такое Fast-tracking?", options: ["Параллельное выполнение задач", "Ускорение", "Оптимизация", "Сжатие"], correct: 0 },
      { id: 8, text: "Что такое Crashing?", options: ["Добавление ресурсов для ускорения", "Крашинг", "Ускорение", "Оптимизация"], correct: 0 },
      { id: 9, text: "Что такое Rolling Wave Planning?", options: ["Планирование по волнам", "Итеративное планирование", "Детализация по мере выполнения", "Адаптивное планирование"], correct: 0 },
      { id: 10, text: "Что такое Time-boxing?", options: ["Фиксированное время на активность", "Ограничение времени", "Контроль времени", "Тайм-боксинг"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: Управление командой",
    category: "project-manager",
    level: "intermediate",
    description: "Управление людьми в проектах",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое RACI матрица?", options: ["Матрица ответственности", "Матрица ролей", "Матрица задач", "Матрица прав"], correct: 0 },
      { id: 2, text: "Что означает R в RACI?", options: ["Responsible (Исполнитель)", "Accountable (Ответственный)", "Consulted (Консультируемый)", "Informed (Информируемый)"], correct: 0 },
      { id: 3, text: "Что означает A в RACI?", options: ["Accountable (Ответственный)", "Responsible (Исполнитель)", "Consulted (Консультируемый)", "Informed (Информируемый)"], correct: 0 },
      { id: 4, text: "Что такое Tuckman модель?", options: ["Формирование, Штурм, Нормирование, Работа", "Модель команды", "Этапы развития команды", "Цикл команды"], correct: 0 },
      { id: 5, text: "Что такое конфликт в команде?", options: ["Разногласия между членами команды", "Проблема", "Спор", "Дискуссия"], correct: 0 },
      { id: 6, text: "Какие стили разрешения конфликтов?", options: ["Сотрудничество, Компромисс, Избегание, Соревнование, Приспособление", "Диалог, Переговоры, Арбитраж, Медиация", "Спор, Дискуссия, Дебаты, Полемика", "Решение, Обсуждение, Голосование, Консенсус"], correct: 0 },
      { id: 7, text: "Что такое мотивация команды?", options: ["Побуждение к эффективной работе", "Стимулирование", "Поощрение", "Вдохновение"], correct: 0 },
      { id: 8, text: "Что такое обратная связь?", options: ["Информация о результатах деятельности", "Комментарий", "Оценка", "Критика"], correct: 0 },
      { id: 9, text: "Что такое one-on-one meeting?", options: ["Индивидуальная встреча", "Личная встреча", "Разговор один на один", "Персональная встреча"], correct: 0 },
      { id: 10, text: "Что такое Team Building?", options: ["Мероприятия для сплочения команды", "Построение команды", "Командообразование", "Тимбилдинг"], correct: 0 }
    ]
  },
  {
    title: "Project Manager: PMBOK",
    category: "project-manager",
    level: "advanced",
    description: "Стандарты управления проектами PMBOK",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое PMBOK?", options: ["Project Management Body of Knowledge", "Project Management Book of Knowledge", "Project Manager Body of Knowledge", "Project Management Base of Knowledge"], correct: 0 },
      { id: 2, text: "Сколько областей знаний в PMBOK 6?", options: ["10", "8", "12", "9"], correct: 0 },
      { id: 3, text: "Что такое Project Charter?", options: ["Устав проекта", "Хартия проекта", "Документ проекта", "Разрешение проекта"], correct: 0 },
      { id: 4, text: "Что такое Stakeholder Register?", options: ["Реестр стейкхолдеров", "Список заинтересованных лиц", "Журнал участников", "Каталог контактов"], correct: 0 },
      { id: 5, text: "Что такое Work Performance Information?", options: ["Информация о выполнении работ", "Отчет о работе", "Данные о прогрессе", "Статус задач"], correct: 0 },
      { id: 6, text: "Что такое Change Request?", options: ["Запрос на изменение", "Изменение требований", "Запрос на доработку", "Предложение изменений"], correct: 0 },
      { id: 7, text: "Что такое Lessons Learned?", options: ["Извлеченные уроки", "Опыт проекта", "Знания проекта", "Выводы"], correct: 0 },
      { id: 8, text: "Что такое Project Management Plan?", options: ["План управления проектом", "План проекта", "Документ планирования", "Стратегия проекта"], correct: 0 },
      { id: 9, text: "Что такое Quality Management Plan?", options: ["План управления качеством", "План качества", "Стандарт качества", "Политика качества"], correct: 0 },
      { id: 10, text: "Что такое Communication Management Plan?", options: ["План управления коммуникациями", "План коммуникаций", "Стратегия общения", "План взаимодействия"], correct: 0 }
    ]
  },

  // ==================== BACKEND (6 тестов) ====================
  {
    title: "Backend: Основы",
    category: "backend",
    level: "beginner",
    description: "Базовые знания бэкенд-разработки",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое REST API?", options: ["Архитектурный стиль для API", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 2, text: "Что такое HTTP?", options: ["Протокол передачи гипертекста", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 3, text: "Какие методы HTTP вы знаете?", options: ["GET, POST, PUT, DELETE", "SELECT, INSERT, UPDATE, DELETE", "READ, WRITE, UPDATE, DELETE", "OPEN, CLOSE, READ, WRITE"], correct: 0 },
      { id: 4, text: "Что такое JWT?", options: ["JSON Web Token", "Java Web Token", "JavaScript Web Token", "JSON Web Tool"], correct: 0 },
      { id: 5, text: "Что такое SQL?", options: ["Язык запросов к базам данных", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 6, text: "Что такое ORM?", options: ["Object-Relational Mapping", "Object Request Mapping", "Object Relation Model", "Object Relational Model"], correct: 0 },
      { id: 7, text: "Что такое Docker?", options: ["Платформа для контейнеризации", "База данных", "Язык программирования", "Система контроля версий"], correct: 0 },
      { id: 8, text: "Что такое Nginx?", options: ["Веб-сервер", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 9, text: "Что такое Redis?", options: ["In-memory база данных", "Язык программирования", "Веб-сервер", "Система мониторинга"], correct: 0 },
      { id: 10, text: "Что такое WebSocket?", options: ["Протокол полнодуплексной связи", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 }
    ]
  },
  {
    title: "Backend: Базы данных",
    category: "backend",
    level: "intermediate",
    description: "Работа с базами данных",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое SQL?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Structured Question Language"], correct: 0 },
      { id: 2, text: "Что такое NoSQL?", options: ["Not Only SQL", "No SQL", "Non SQL", "New SQL"], correct: 0 },
      { id: 3, text: "Что такое ACID?", options: ["Atomicity, Consistency, Isolation, Durability", "Atomic, Consistent, Isolated, Durable", "Atom, Consistency, Isolation, Durability", "Atomicity, Consistency, Isolation, Data"], correct: 0 },
      { id: 4, text: "Что такое JOIN в SQL?", options: ["Объединение таблиц", "Соединение", "Связывание", "Объединение данных"], correct: 0 },
      { id: 5, text: "Какой JOIN возвращает только совпадающие записи?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correct: 0 },
      { id: 6, text: "Что такое индекс в БД?", options: ["Ускоряет поиск данных", "Замедляет поиск", "Организует данные", "Сортирует данные"], correct: 0 },
      { id: 7, text: "Что такое транзакция?", options: ["Группа операций, выполняемых как единое целое", "Операция", "Запрос", "Команда"], correct: 0 },
      { id: 8, text: "Что такое репликация?", options: ["Копирование данных на несколько серверов", "Резервное копирование", "Синхронизация", "Дублирование"], correct: 0 },
      { id: 9, text: "Что такое шардирование?", options: ["Разделение данных по разным серверам", "Распределение", "Сегментация", "Партиционирование"], correct: 0 },
      { id: 10, text: "Что такое нормализация БД?", options: ["Устранение избыточности данных", "Оптимизация", "Структурирование", "Организация"], correct: 0 }
    ]
  },
  {
    title: "Backend: API и протоколы",
    category: "backend",
    level: "intermediate",
    description: "Протоколы и API",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое GraphQL?", options: ["Язык запросов для API", "База данных", "Протокол", "Формат данных"], correct: 0 },
      { id: 2, text: "Что такое gRPC?", options: ["High-performance RPC framework", "База данных", "Протокол", "Формат данных"], correct: 0 },
      { id: 3, text: "Что такое SOAP?", options: ["Simple Object Access Protocol", "Simple Object Application Protocol", "Simple Oriented Access Protocol", "Simple Object Access Procedure"], correct: 0 },
      { id: 4, text: "Что такое OpenAPI/Swagger?", options: ["Спецификация для описания API", "База данных", "Протокол", "Язык программирования"], correct: 0 },
      { id: 5, text: "Что такое WebSocket?", options: ["Протокол двунаправленной связи", "HTTP метод", "Формат данных", "База данных"], correct: 0 },
      { id: 6, text: "Что такое MQTT?", options: ["Протокол для IoT", "База данных", "Язык программирования", "Система мониторинга"], correct: 0 },
      { id: 7, text: "Что такое OAuth 2.0?", options: ["Протокол авторизации", "Аутентификация", "Безопасность", "Шифрование"], correct: 0 },
      { id: 8, text: "Что такое OpenID Connect?", options: ["Протокол аутентификации", "Авторизация", "Безопасность", "Идентификация"], correct: 0 },
      { id: 9, text: "Что такое CORS?", options: ["Cross-Origin Resource Sharing", "Безопасность", "Доступ к ресурсам", "Политика безопасности"], correct: 0 },
      { id: 10, text: "Что такое API Gateway?", options: ["Единая точка входа для API", "База данных", "Кэш", "Лоадер"], correct: 0 }
    ]
  },
  {
    title: "Backend: Архитектура",
    category: "backend",
    level: "advanced",
    description: "Архитектурные паттерны",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое микросервисная архитектура?", options: ["Архитектура из маленьких независимых сервисов", "Монолит", "Серверлесс", "Событийная"], correct: 0 },
      { id: 2, text: "Что такое монолитная архитектура?", options: ["Единое приложение", "Микросервисы", "Серверлесс", "Событийная"], correct: 0 },
      { id: 3, text: "Что такое серверлесс (Serverless)?", options: ["Выполнение кода без управления серверами", "Без серверов", "Облачные функции", "FaaS"], correct: 0 },
      { id: 4, text: "Что такое событийная архитектура?", options: ["Event-Driven Architecture", "Микросервисы", "Серверлесс", "Монолит"], correct: 0 },
      { id: 5, text: "Что такое CQRS?", options: ["Command Query Responsibility Segregation", "Разделение команд и запросов", "Архитектурный паттерн", "Паттерн проектирования"], correct: 0 },
      { id: 6, text: "Что такое Event Sourcing?", options: ["Хранение событий как источника истины", "Событийное программирование", "Обработка событий", "Генерация событий"], correct: 0 },
      { id: 7, text: "Что такое Message Queue?", options: ["Очередь сообщений", "Брокер сообщений", "Канал связи", "Буфер"], correct: 0 },
      { id: 8, text: "Что такое Circuit Breaker?", options: ["Паттерн защиты от каскадных отказов", "Безопасность", "Мониторинг", "Логирование"], correct: 0 },
      { id: 9, text: "Что такое Retry pattern?", options: ["Паттерн повторных попыток", "Повтор", "Ретрай", "Попытка"], correct: 0 },
      { id: 10, text: "Что такое Bulkhead pattern?", options: ["Паттерн изоляции ресурсов", "Изоляция", "Разделение", "Блокировка"], correct: 0 }
    ]
  },
  {
    title: "Backend: Безопасность",
    category: "backend",
    level: "advanced",
    description: "Безопасность бэкенда",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое HTTPS?", options: ["HTTP over SSL/TLS", "Secure HTTP", "HTTP Secure", "Encrypted HTTP"], correct: 0 },
      { id: 2, text: "Что такое SSL/TLS?", options: ["Протокол шифрования", "Безопасность", "Сертификаты", "Шифрование"], correct: 0 },
      { id: 3, text: "Что такое SQL Injection?", options: ["Внедрение SQL кода", "Атака на БД", "Взлом", "Уязвимость"], correct: 0 },
      { id: 4, text: "Что такое XSS?", options: ["Cross-Site Scripting", "Межсайтовый скриптинг", "Атака", "Уязвимость"], correct: 0 },
      { id: 5, text: "Что такое CSRF?", options: ["Cross-Site Request Forgery", "Подделка межсайтовых запросов", "Атака", "Уязвимость"], correct: 0 },
      { id: 6, text: "Что такое JWT?", options: ["JSON Web Token", "Токен", "Аутентификация", "Авторизация"], correct: 0 },
      { id: 7, text: "Что такое хеширование паролей?", options: ["Преобразование пароля в хеш", "Шифрование", "Кодирование", "Обратимое преобразование"], correct: 0 },
      { id: 8, text: "Что такое соль (salt) в паролях?", options: ["Случайные данные к паролю", "Дополнение", "Усложнение", "Защита"], correct: 0 },
      { id: 9, text: "Что такое Rate Limiting?", options: ["Ограничение частоты запросов", "Лимит", "Ограничение", "Контроль"], correct: 0 },
      { id: 10, text: "Что такое CORS?", options: ["Cross-Origin Resource Sharing", "Безопасность", "Доступ к ресурсам", "Политика безопасности"], correct: 0 }
    ]
  },
  {
    title: "Backend: Node.js",
    category: "backend",
    level: "intermediate",
    description: "Node.js разработка",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Node.js?", options: ["Среда выполнения JavaScript", "Фреймворк", "Библиотека", "Язык программирования"], correct: 0 },
      { id: 2, text: "Что такое npm?", options: ["Менеджер пакетов Node.js", "Node Package Manager", "Утилита", "Инструмент"], correct: 0 },
      { id: 3, text: "Что такое Express.js?", options: ["Фреймворк для Node.js", "Библиотека", "Сервер", "Маршрутизатор"], correct: 0 },
      { id: 4, text: "Что такое асинхронность в Node.js?", options: ["Неблокирующая модель ввода-вывода", "Параллелизм", "Многопоточность", "Конкурентность"], correct: 0 },
      { id: 5, text: "Что такое Callback в Node.js?", options: ["Функция обратного вызова", "Коллбэк", "Обработчик", "Функция"], correct: 0 },
      { id: 6, text: "Что такое Promise в JavaScript?", options: ["Объект для асинхронных операций", "Промис", "Обещание", "Асинхронность"], correct: 0 },
      { id: 7, text: "Что такое async/await?", options: ["Синтаксис для работы с промисами", "Асинхронность", "Ожидание", "Синтаксис"], correct: 0 },
      { id: 8, text: "Что такое Event Loop?", options: ["Механизм обработки асинхронных операций", "Цикл событий", "Очередь", "Планировщик"], correct: 0 },
      { id: 9, text: "Что такое middleware в Express?", options: ["Промежуточное ПО", "Микровещество", "Посредник", "Обработчик"], correct: 0 },
      { id: 10, text: "Что такое PM2?", options: ["Менеджер процессов для Node.js", "Мониторинг", "Демон", "Запуск"], correct: 0 }
    ]
  },

  // ==================== FRONTEND (6 тестов) ====================
  {
    title: "Frontend: Основы",
    category: "frontend",
    level: "beginner",
    description: "Базовые знания фронтенд-разработки",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое HTML?", options: ["HyperText Markup Language", "HighText Markup Language", "HyperText Markdown Language", "HighText Markdown Language"], correct: 0 },
      { id: 2, text: "Что такое CSS?", options: ["Cascading Style Sheets", "Cascading Style Scripts", "Color Style Sheets", "Cascading Simple Sheets"], correct: 0 },
      { id: 3, text: "Что такое JavaScript?", options: ["Язык программирования", "База данных", "Система контроля версий", "Веб-сервер"], correct: 0 },
      { id: 4, text: "Что такое DOM?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], correct: 0 },
      { id: 5, text: "Что такое семантическая верстка?", options: ["HTML с осмысленными тегами", "Красивая верстка", "Сложная верстка", "Адаптивная верстка"], correct: 0 },
      { id: 6, text: "Что такое адаптивный дизайн?", options: ["Подстраивается под разные устройства", "Фиксированный дизайн", "Резиновый дизайн", "Мобильный дизайн"], correct: 0 },
      { id: 7, text: "Что такое Flexbox?", options: ["CSS технология для раскладки", "Сетка", "Позиционирование", "Выравнивание"], correct: 0 },
      { id: 8, text: "Что такое Grid?", options: ["CSS Grid Layout", "Сетка", "Раскладка", "Таблица"], correct: 0 },
      { id: 9, text: "Что такое медиа-запросы?", options: ["CSS для адаптивности", "Медиа", "Устройства", "Экраны"], correct: 0 },
      { id: 10, text: "Что такое SVG?", options: ["Scalable Vector Graphics", "Масштабируемая векторная графика", "Формат изображений", "Вектор"], correct: 0 }
    ]
  },
  {
    title: "Frontend: JavaScript",
    category: "frontend",
    level: "intermediate",
    description: "Современный JavaScript",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое ES6?", options: ["ECMAScript 6", "JavaScript 6", "Стандарт JS", "Версия JS"], correct: 0 },
      { id: 2, text: "Что такое let и const?", options: ["Способы объявления переменных", "Ключевые слова", "var", "Переменные"], correct: 0 },
      { id: 3, text: "Что такое стрелочные функции?", options: ["() => {}", "Lambda", "Анонимные функции", "Короткий синтаксис"], correct: 0 },
      { id: 4, text: "Что такое деструктуризация?", options: ["Распаковка объектов/массивов", "Разрушение", "Разложение", "Деструктуризация"], correct: 0 },
      { id: 5, text: "Что такое spread оператор?", options: ["...", "Распространение", "Копирование", "Объединение"], correct: 0 },
      { id: 6, text: "Что такое rest оператор?", options: ["...", "Сбор аргументов", "Остаток", "Сбор"], correct: 0 },
      { id: 7, text: "Что такое шаблонные строки?", options: ["`${}`", "Интерполяция", "Многострочные строки", "Шаблоны"], correct: 0 },
      { id: 8, text: "Что такое модули в JS?", options: ["import/export", "Разделение кода", "Компоненты", "Файлы"], correct: 0 },
      { id: 9, text: "Что такое Promise?", options: ["Объект для асинхронных операций", "Промис", "Обещание", "Асинхронность"], correct: 0 },
      { id: 10, text: "Что такое async/await?", options: ["Синтаксис для промисов", "Асинхронность", "Ожидание", "Синтаксис"], correct: 0 }
    ]
  },
  {
    title: "Frontend: React",
    category: "frontend",
    level: "intermediate",
    description: "React библиотека",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое React?", options: ["JavaScript библиотека для UI", "Фреймворк", "Библиотека", "Инструмент"], correct: 0 },
      { id: 2, text: "Что такое JSX?", options: ["JavaScript XML", "Синтаксис React", "HTML в JS", "Расширение JS"], correct: 0 },
      { id: 3, text: "Что такое компонент в React?", options: ["Переиспользуемый блок UI", "Функция", "Класс", "Элемент"], correct: 0 },
      { id: 4, text: "Что такое props?", options: ["Передача данных в компонент", "Свойства", "Параметры", "Атрибуты"], correct: 0 },
      { id: 5, text: "Что такое state?", options: ["Внутреннее состояние компонента", "Состояние", "Данные", "Память"], correct: 0 },
      { id: 6, text: "Что такое хук useState?", options: ["Хук для состояния", "useState", "Состояние", "Хук"], correct: 0 },
      { id: 7, text: "Что такое хук useEffect?", options: ["Хук для побочных эффектов", "useEffect", "Эффекты", "Жизненный цикл"], correct: 0 },
      { id: 8, text: "Что такое Virtual DOM?", options: ["Виртуальное представление UI", "Оптимизация", "Копия DOM", "Рендеринг"], correct: 0 },
      { id: 9, text: "Что такое React Router?", options: ["Маршрутизация в React", "Навигация", "Роутинг", "Ссылки"], correct: 0 },
      { id: 10, text: "Что такое Context API?", options: ["Управление глобальным состоянием", "Контекст", "Провайдер", "Хранилище"], correct: 0 }
    ]
  },
  {
    title: "Frontend: React продвинутый",
    category: "frontend",
    level: "advanced",
    description: "Продвинутый React",
    timeLimit: 30,
    questions: [
      { id: 1, text: "Что такое Redux?", options: ["Менеджер состояния", "Библиотека", "Хранилище", "Состояние"], correct: 0 },
      { id: 2, text: "Что такое Redux Thunk?", options: ["Middleware для асинхронных действий", "Thunk", "Асинхронность", "Middleware"], correct: 0 },
      { id: 3, text: "Что такое Next.js?", options: ["React фреймворк", "SSR", "Генерация сайтов", "Фреймворк"], correct: 0 },
      { id: 4, text: "Что такое Gatsby?", options: ["Static Site Generator", "Генератор сайтов", "React фреймворк", "SSG"], correct: 0 },
      { id: 5, text: "Что такое Tailwind CSS?", options: ["CSS фреймворк", "Утилиты", "Стили", "Дизайн"], correct: 0 },
      { id: 6, text: "Что такое styled-components?", options: ["CSS-in-JS библиотека", "Стили", "Компоненты", "Стилизация"], correct: 0 },
      { id: 7, text: "Что такое React Query?", options: ["Библиотека для работы с серверным состоянием", "Запросы", "Кэширование", "Данные"], correct: 0 },
      { id: 8, text: "Что такое Zustand?", options: ["Менеджер состояния", "Библиотека", "Хранилище", "Состояние"], correct: 0 },
      { id: 9, text: "Что такое React Hook Form?", options: ["Библиотека для форм", "Формы", "Хуки", "Валидация"], correct: 0 },
      { id: 10, text: "Что такое Framer Motion?", options: ["Библиотека для анимации", "Анимация", "Движение", "Эффекты"], correct: 0 }
    ]
  },
  {
    title: "Frontend: TypeScript",
    category: "frontend",
    level: "intermediate",
    description: "TypeScript основы",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое TypeScript?", options: ["Типизированный JavaScript", "Язык", "Надстройка", "Компилятор"], correct: 0 },
      { id: 2, text: "Что такое типы в TS?", options: ["string, number, boolean", "Типизация", "Аннотации", "Интерфейсы"], correct: 0 },
      { id: 3, text: "Что такое interface в TS?", options: ["Описание структуры объекта", "Интерфейс", "Тип", "Контракт"], correct: 0 },
      { id: 4, text: "Что такое type в TS?", options: ["Создание типа", "Type", "Алиас", "Псевдоним"], correct: 0 },
      { id: 5, text: "Что такое enum в TS?", options: ["Перечисление", "Enum", "Константы", "Значения"], correct: 0 },
      { id: 6, text: "Что такое generics в TS?", options: ["Обобщенные типы", "Дженерики", "Шаблоны", "Параметры"], correct: 0 },
      { id: 7, text: "Что такое union types?", options: ["Объединение типов", "|", "Union", "Или"], correct: 0 },
      { id: 8, text: "Что такое intersection types?", options: ["Пересечение типов", "&", "Intersection", "И"], correct: 0 },
      { id: 9, text: "Что такое optional chaining?", options: ["?.", "Безопасный доступ", "Опциональная цепочка", "Проверка"], correct: 0 },
      { id: 10, text: "Что такое non-null assertion?", options: ["!", "Утверждение", "Не null", "Оператор"], correct: 0 }
    ]
  },
  {
    title: "Frontend: Performance",
    category: "frontend",
    level: "advanced",
    description: "Оптимизация производительности",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Core Web Vitals?", options: ["Метрики производительности", "LCP, FID, CLS", "Веб-виталы", "Показатели"], correct: 0 },
      { id: 2, text: "Что такое LCP?", options: ["Largest Contentful Paint", "Загрузка контента", "Метрика", "Скорость"], correct: 0 },
      { id: 3, text: "Что такое FID?", options: ["First Input Delay", "Задержка ввода", "Интерактивность", "Метрика"], correct: 0 },
      { id: 4, text: "Что такое CLS?", options: ["Cumulative Layout Shift", "Сдвиг макета", "Стабильность", "Метрика"], correct: 0 },
      { id: 5, text: "Что такое code splitting?", options: ["Разделение кода", "Ленивая загрузка", "Оптимизация", "Чанки"], correct: 0 },
      { id: 6, text: "Что такое lazy loading?", options: ["Ленивая загрузка компонентов", "Отложенная загрузка", "Асинхронность", "Оптимизация"], correct: 0 },
      { id: 7, text: "Что такое memoization?", options: ["Кэширование результатов", "Мемоизация", "Оптимизация", "Запоминание"], correct: 0 },
      { id: 8, text: "Что такое React.memo?", options: ["Мемоизация компонента", "Оптимизация", "Кэширование", "HOC"], correct: 0 },
      { id: 9, text: "Что такое useCallback?", options: ["Мемоизация функции", "Хук", "Оптимизация", "Кэширование"], correct: 0 },
      { id: 10, text: "Что такое useMemo?", options: ["Мемоизация значения", "Хук", "Оптимизация", "Кэширование"], correct: 0 }
    ]
  },

  // ==================== QA (6 тестов) ====================
  {
    title: "QA: Основы",
    category: "qa",
    level: "beginner",
    description: "Базовые знания тестирования",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое тестирование?", options: ["Проверка качества ПО", "Написание кода", "Управление проектами", "Дизайн интерфейсов"], correct: 0 },
      { id: 2, text: "Что такое баг (bug)?", options: ["Ошибка в программе", "Функция программы", "Требование клиента", "Документ"], correct: 0 },
      { id: 3, text: "Что такое тест-кейс?", options: ["Сценарий тестирования", "Результат теста", "Баг-репорт", "План проекта"], correct: 0 },
      { id: 4, text: "Что такое чек-лист?", options: ["Список проверок", "Сценарий", "План", "Инструкция"], correct: 0 },
      { id: 5, text: "Что такое баг-репорт?", options: ["Отчет об ошибке", "Документ", "Описание бага", "Жалоба"], correct: 0 },
      { id: 6, text: "Что такое smoke testing?", options: ["Дымовое тестирование", "Нагрузочное", "Юнит", "Регрессионное"], correct: 0 },
      { id: 7, text: "Что такое regression testing?", options: ["Регрессионное тестирование", "Дымовое", "Нагрузочное", "Юнит"], correct: 0 },
      { id: 8, text: "Что такое unit testing?", options: ["Юнит-тестирование", "Интеграционное", "Системное", "Приемочное"], correct: 0 },
      { id: 9, text: "Что такое интеграционное тестирование?", options: ["Тестирование взаимодействия модулей", "Юнит", "Системное", "Приемочное"], correct: 0 },
      { id: 10, text: "Что такое системное тестирование?", options: ["Тестирование всей системы", "Юнит", "Интеграционное", "Приемочное"], correct: 0 }
    ]
  },
  {
    title: "QA: Типы тестирования",
    category: "qa",
    level: "intermediate",
    description: "Различные виды тестирования",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое функциональное тестирование?", options: ["Проверка функций", "Требования", "Бизнес-логика", "Спецификация"], correct: 0 },
      { id: 2, text: "Что такое нефункциональное тестирование?", options: ["Производительность, безопасность", "Скорость", "Надежность", "Удобство"], correct: 0 },
      { id: 3, text: "Что такое нагрузочное тестирование?", options: ["Проверка под нагрузкой", "Производительность", "Масштабирование", "Стресс"], correct: 0 },
      { id: 4, text: "Что такое стресс-тестирование?", options: ["Проверка за пределами нормы", "Нагрузка", "Предел", "Экстрим"], correct: 0 },
      { id: 5, text: "Что такое UI тестирование?", options: ["Тестирование интерфейса", "Пользовательский интерфейс", "Визуальное", "UX"], correct: 0 },
      { id: 6, text: "Что такое API тестирование?", options: ["Тестирование API", "Бэкенд", "Интеграция", "Запросы"], correct: 0 },
      { id: 7, text: "Что такое мобильное тестирование?", options: ["Тестирование мобильных приложений", "Android", "iOS", "Устройства"], correct: 0 },
      { id: 8, text: "Что такое кроссбраузерное тестирование?", options: ["Тестирование в разных браузерах", "Совместимость", "Браузеры", "ОС"], correct: 0 },
      { id: 9, text: "Что такое тестирование безопасности?", options: ["Security testing", "Безопасность", "Уязвимости", "Защита"], correct: 0 },
      { id: 10, text: "Что такое юзабилити тестирование?", options: ["Тестирование удобства использования", "Usability", "UX", "Пользовательский опыт"], correct: 0 }
    ]
  },
  {
    title: "QA: Автоматизация",
    category: "qa",
    level: "intermediate",
    description: "Автоматизированное тестирование",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое автоматизация тестирования?", options: ["Использование инструментов для тестов", "Скрипты", "Программы", "Роботы"], correct: 0 },
      { id: 2, text: "Что такое Selenium?", options: ["Инструмент для автоматизации браузера", "WebDriver", "Автотесты", "UI тесты"], correct: 0 },
      { id: 3, text: "Что такое Cypress?", options: ["Фреймворк для автотестов", "JavaScript", "E2E", "UI"], correct: 0 },
      { id: 4, text: "Что такое Playwright?", options: ["Инструмент для автотестов", "Microsoft", "E2E", "Браузеры"], correct: 0 },
      { id: 5, text: "Что такое JUnit?", options: ["Фреймворк для юнит-тестов Java", "Java", "Тесты", "Unit"], correct: 0 },
      { id: 6, text: "Что такое Jest?", options: ["Фреймворк для тестов JavaScript", "React", "Unit", "Snapshot"], correct: 0 },
      { id: 7, text: "Что такое Pytest?", options: ["Фреймворк для тестов Python", "Python", "Unit", "Автотесты"], correct: 0 },
      { id: 8, text: "Что такое CI/CD в тестировании?", options: ["Непрерывная интеграция", "Автоматизация", "Конвейер", "Доставка"], correct: 0 },
      { id: 9, text: "Что такое тестовые данные?", options: ["Данные для тестов", "Фикстуры", "Mock", "Stub"], correct: 0 },
      { id: 10, text: "Что такое Page Object Model?", options: ["Паттерн для автотестов", "POM", "Абстракция", "Модель"], correct: 0 }
    ]
  },
  {
    title: "QA: Баги и отладка",
    category: "qa",
    level: "intermediate",
    description: "Работа с багами и отладка",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое severity бага?", options: ["Серьезность", "Важность", "Критичность", "Уровень"], correct: 0 },
      { id: 2, text: "Что такое priority бага?", options: ["Приоритет", "Очередность", "Срочность", "Важность"], correct: 0 },
      { id: 3, text: "Какие бывают уровни severity?", options: ["Blocker, Critical, Major, Minor, Trivial", "High, Medium, Low", "S1, S2, S3", "A, B, C"], correct: 0 },
      { id: 4, text: "Какие бывают уровни priority?", options: ["High, Medium, Low", "Blocker, Critical, Major", "Срочный, Обычный", "Важный, Неважный"], correct: 0 },
      { id: 5, text: "Что такое жизненный цикл бага?", options: ["Стадии жизни бага", "Статусы", "Состояния", "Процесс"], correct: 0 },
      { id: 6, text: "Что такое регрессия?", options: ["Появление старого бага", "Возврат", "Повтор", "Старое"], correct: 0 },
      { id: 7, text: "Что такое воспроизведение бага?", options: ["Шаги для повторения", "Репродукция", "Описание", "Сценарий"], correct: 0 },
      { id: 8, text: "Что такое DevTools?", options: ["Инструменты разработчика", "Отладка", "Консоль", "Инспектор"], correct: 0 },
      { id: 9, text: "Что такое логирование?", options: ["Запись событий", "Логи", "Журналирование", "Отслеживание"], correct: 0 },
      { id: 10, text: "Что такое отладка (debugging)?", options: ["Поиск и исправление ошибок", "Дебаггинг", "Анализ", "Исправление"], correct: 0 }
    ]
  },
  {
    title: "QA: Инструменты",
    category: "qa",
    level: "intermediate",
    description: "Инструменты тестировщика",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое Jira?", options: ["Система отслеживания задач", "Баг-трекинг", "Управление проектами", "Трекер"], correct: 0 },
      { id: 2, text: "Что такое Confluence?", options: ["База знаний", "Wiki", "Документация", "Хранилище"], correct: 0 },
      { id: 3, text: "Что такое TestRail?", options: ["Система управления тестами", "Test Management", "Тест-кейсы", "Планы"], correct: 0 },
      { id: 4, text: "Что такое Postman?", options: ["Инструмент для тестирования API", "API", "Запросы", "Коллекции"], correct: 0 },
      { id: 5, text: "Что такое SoapUI?", options: ["Инструмент для SOAP/REST", "API", "Веб-сервисы", "Тесты"], correct: 0 },
      { id: 6, text: "Что такое Charles Proxy?", options: ["Прокси для отладки", "Сниффер", "Перехват трафика", "Анализ"], correct: 0 },
      { id: 7, text: "Что такое JMeter?", options: ["Инструмент для нагрузочного тестирования", "Нагрузка", "Перформанс", "Стресс"], correct: 0 },
      { id: 8, text: "Что такое Gatling?", options: ["Инструмент для нагрузочного тестирования", "Нагрузка", "Перформанс", "Стресс"], correct: 0 },
      { id: 9, text: "Что такое Appium?", options: ["Автоматизация мобильных приложений", "Мобайл", "Android", "iOS"], correct: 0 },
      { id: 10, text: "Что такое Allure?", options: ["Фреймворк для отчетов", "Отчеты", "Результаты", "Визуализация"], correct: 0 }
    ]
  },
  {
    title: "QA: Процессы и методологии",
    category: "qa",
    level: "advanced",
    description: "Процессы тестирования",
    timeLimit: 25,
    questions: [
      { id: 1, text: "Что такое V-модель?", options: ["Модель разработки", "V-model", "Процесс", "Методология"], correct: 0 },
      { id: 2, text: "Что такое Agile testing?", options: ["Тестирование в Agile", "Гибкая методология", "Итерации", "Спринты"], correct: 0 },
      { id: 3, text: "Что такое Shift Left testing?", options: ["Тестирование на ранних этапах", "Раннее тестирование", "Сдвиг влево", "Превентивное"], correct: 0 },
      { id: 4, text: "Что такое TDD?", options: ["Test-Driven Development", "Разработка через тесты", "Юнит-тесты", "Красный-зеленый"], correct: 0 },
      { id: 5, text: "Что такое BDD?", options: ["Behavior-Driven Development", "Разработка через поведение", "Gherkin", "Given-When-Then"], correct: 0 },
      { id: 6, text: "Что такое ATDD?", options: ["Acceptance Test-Driven Development", "Приемочные тесты", "Разработка", "Критерии"], correct: 0 },
      { id: 7, text: "Что такое exploratory testing?", options: ["Исследовательское тестирование", "Без сценариев", "Адаптивное", "Свободное"], correct: 0 },
      { id: 8, text: "Что такое парное тестирование?", options: ["Два тестировщика вместе", "Парное", "Коллаборация", "Совместное"], correct: 0 },
      { id: 9, text: "Что такое тест-план?", options: ["План тестирования", "Документ", "Стратегия", "Подход"], correct: 0 },
      { id: 10, text: "Что такое метрики в тестировании?", options: ["Показатели качества", "Оценка", "Измерение", "Статистика"], correct: 0 }
    ]
  },

  // ==================== ДОПОЛНИТЕЛЬНЫЕ СМЕШАННЫЕ ТЕСТЫ (6 тестов) ====================
  {
    title: "Git: Основы",
    category: "devops",
    level: "beginner",
    description: "Базовые команды Git",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое Git?", options: ["Система контроля версий", "База данных", "Язык программирования", "CI/CD"], correct: 0 },
      { id: 2, text: "Какая команда создает репозиторий?", options: ["git init", "git start", "git create", "git new"], correct: 0 },
      { id: 3, text: "Какая команда добавляет файлы?", options: ["git add", "git commit", "git push", "git pull"], correct: 0 },
      { id: 4, text: "Какая команда сохраняет изменения?", options: ["git commit", "git add", "git push", "git save"], correct: 0 },
      { id: 5, text: "Какая команда отправляет в удаленный репозиторий?", options: ["git push", "git pull", "git fetch", "git clone"], correct: 0 },
      { id: 6, text: "Какая команда получает изменения?", options: ["git pull", "git push", "git fetch", "git clone"], correct: 0 },
      { id: 7, text: "Какая команда создает ветку?", options: ["git branch", "git checkout -b", "git new-branch", "git branch create"], correct: 0 },
      { id: 8, text: "Какая команда переключает ветку?", options: ["git checkout", "git switch", "git branch", "git change"], correct: 0 },
      { id: 9, text: "Какая команда показывает статус?", options: ["git status", "git log", "git diff", "git show"], correct: 0 },
      { id: 10, text: "Какая команда показывает историю?", options: ["git log", "git status", "git diff", "git history"], correct: 0 }
    ]
  },
  {
    title: "Docker: Основы",
    category: "devops",
    level: "beginner",
    description: "Базовые команды Docker",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Какая команда создает образ?", options: ["docker build", "docker create", "docker make", "docker image"], correct: 0 },
      { id: 2, text: "Какая команда запускает контейнер?", options: ["docker run", "docker start", "docker create", "docker exec"], correct: 0 },
      { id: 3, text: "Какая команда показывает контейнеры?", options: ["docker ps", "docker ls", "docker list", "docker show"], correct: 0 },
      { id: 4, text: "Какая команда останавливает контейнер?", options: ["docker stop", "docker kill", "docker end", "docker finish"], correct: 0 },
      { id: 5, text: "Какая команда удаляет контейнер?", options: ["docker rm", "docker remove", "docker delete", "docker rmi"], correct: 0 },
      { id: 6, text: "Какая команда показывает образы?", options: ["docker images", "docker ls", "docker list", "docker show"], correct: 0 },
      { id: 7, text: "Какая команда удаляет образ?", options: ["docker rmi", "docker rm", "docker remove", "docker delete"], correct: 0 },
      { id: 8, text: "Какая команда логинится в registry?", options: ["docker login", "docker auth", "docker signin", "docker registry"], correct: 0 },
      { id: 9, text: "Какая команда пушит образ?", options: ["docker push", "docker upload", "docker send", "docker publish"], correct: 0 },
      { id: 10, text: "Какая команда пуллит образ?", options: ["docker pull", "docker download", "docker get", "docker fetch"], correct: 0 }
    ]
  },
  {
    title: "SQL: Основы",
    category: "backend",
    level: "beginner",
    description: "Базовые SQL запросы",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Какая команда выбирает данные?", options: ["SELECT", "GET", "FETCH", "RETRIEVE"], correct: 0 },
      { id: 2, text: "Какая команда вставляет данные?", options: ["INSERT", "ADD", "CREATE", "PUT"], correct: 0 },
      { id: 3, text: "Какая команда обновляет данные?", options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"], correct: 0 },
      { id: 4, text: "Какая команда удаляет данные?", options: ["DELETE", "REMOVE", "DROP", "ERASE"], correct: 0 },
      { id: 5, text: "Что такое WHERE?", options: ["Условие фильтрации", "Где", "Фильтр", "Условие"], correct: 0 },
      { id: 6, text: "Что такое JOIN?", options: ["Объединение таблиц", "Соединение", "Связь", "Объединение"], correct: 0 },
      { id: 7, text: "Что такое GROUP BY?", options: ["Группировка", "Группа", "Агрегация", "Сортировка"], correct: 0 },
      { id: 8, text: "Что такое ORDER BY?", options: ["Сортировка", "Порядок", "Сортировать", "Упорядочить"], correct: 0 },
      { id: 9, text: "Что такое LIMIT?", options: ["Ограничение количества", "Лимит", "Максимум", "Ограничение"], correct: 0 },
      { id: 10, text: "Что такое PRIMARY KEY?", options: ["Первичный ключ", "Главный ключ", "Уникальный идентификатор", "Ключ"], correct: 0 }
    ]
  },
  {
    title: "Linux: Основы",
    category: "devops",
    level: "beginner",
    description: "Базовые команды Linux",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Какая команда выводит текущую директорию?", options: ["pwd", "cd", "ls", "dir"], correct: 0 },
      { id: 2, text: "Какая команда меняет директорию?", options: ["cd", "pwd", "ls", "mv"], correct: 0 },
      { id: 3, text: "Какая команда показывает содержимое?", options: ["ls", "dir", "show", "list"], correct: 0 },
      { id: 4, text: "Какая команда создает директорию?", options: ["mkdir", "create", "md", "newdir"], correct: 0 },
      { id: 5, text: "Какая команда удаляет файл?", options: ["rm", "delete", "remove", "del"], correct: 0 },
      { id: 6, text: "Какая команда копирует файл?", options: ["cp", "copy", "cpoy", "duplicate"], correct: 0 },
      { id: 7, text: "Какая команда перемещает файл?", options: ["mv", "move", "rename", "transfer"], correct: 0 },
      { id: 8, text: "Какая команда показывает процессы?", options: ["ps", "top", "process", "tasks"], correct: 0 },
      { id: 9, text: "Какая команда показывает место на диске?", options: ["df", "du", "disk", "space"], correct: 0 },
      { id: 10, text: "Какая команда показывает сетевые соединения?", options: ["netstat", "ifconfig", "ip", "network"], correct: 0 }
    ]
  },
  {
    title: "Networking: Основы",
    category: "devops",
    level: "beginner",
    description: "Базовые сетевые протоколы",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое IP адрес?", options: ["Уникальный идентификатор устройства", "Протокол", "Адрес", "Идентификатор"], correct: 0 },
      { id: 2, text: "Что такое порт?", options: ["Номер для подключения", "Дверь", "Канал", "Сокет"], correct: 0 },
      { id: 3, text: "Какой порт у HTTP?", options: ["80", "443", "8080", "22"], correct: 0 },
      { id: 4, text: "Какой порт у HTTPS?", options: ["443", "80", "8080", "8443"], correct: 0 },
      { id: 5, text: "Какой порт у SSH?", options: ["22", "21", "23", "25"], correct: 0 },
      { id: 6, text: "Что такое DNS?", options: ["Преобразует домены в IP", "Сервер", "Имена", "Домены"], correct: 0 },
      { id: 7, text: "Что такое DHCP?", options: ["Автоматическая выдача IP", "Динамический", "Настройка сети", "Протокол"], correct: 0 },
      { id: 8, text: "Что такое TCP?", options: ["Надежный протокол", "Транспортный", "Соединение", "Контроль"], correct: 0 },
      { id: 9, text: "Что такое UDP?", options: ["Быстрый, ненадежный", "Транспортный", "Датаграммы", "Протокол"], correct: 0 },
      { id: 10, text: "Что такое ping?", options: ["Проверка доступности", "Эхо", "ICMP", "Тест"], correct: 0 }
    ]
  },
  {
    title: "Security: Основы",
    category: "devops",
    level: "beginner",
    description: "Базовые принципы безопасности",
    timeLimit: 20,
    questions: [
      { id: 1, text: "Что такое шифрование?", options: ["Преобразование данных в нечитаемый вид", "Кодирование", "Защита", "Криптография"], correct: 0 },
      { id: 2, text: "Что такое аутентификация?", options: ["Проверка подлинности", "Вход", "Авторизация", "Идентификация"], correct: 0 },
      { id: 3, text: "Что такое авторизация?", options: ["Проверка прав доступа", "Разрешение", "Доступ", "Права"], correct: 0 },
      { id: 4, text: "Что такое двухфакторная аутентификация?", options: ["Два способа подтверждения", "2FA", "Двойная защита", "Дополнительная"], correct: 0 },
      { id: 5, text: "Что такое SSL/TLS?", options: ["Протокол шифрования", "Сертификаты", "Безопасность", "HTTPS"], correct: 0 },
      { id: 6, text: "Что такое VPN?", options: ["Виртуальная частная сеть", "Туннель", "Защита", "Шифрование"], correct: 0 },
      { id: 7, text: "Что такое брандмауэр?", options: ["Фильтр сетевого трафика", "Firewall", "Защита", "Экран"], correct: 0 },
      { id: 8, text: "Что такое антивирус?", options: ["Защита от вредоносного ПО", "Вирусы", "Безопасность", "Сканер"], correct: 0 },
      { id: 9, text: "Что такое DDoS атака?", options: ["Перегрузка сервера запросами", "Отказ в обслуживании", "Атака", "Нагрузка"], correct: 0 },
      { id: 10, text: "Что такое фишинг?", options: ["Кража данных через подделку сайтов", "Мошенничество", "Обман", "Социальная инженерия"], correct: 0 }
    ]
  }
];

// ========== ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ТЕСТОВ ==========
async function addTests() {
  try {
    console.log(`🚀 Начинаем добавление ${tests.length} тестов...`);
    
    let added = 0;
    for (const test of tests) {
      const testData = {
        ...test,
        questionsCount: test.questions.length,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'tests'), testData);
      console.log(`✅ Добавлен тест: ${test.title} (ID: ${docRef.id})`);
      added++;
    }
    
    console.log(`🎉 Все ${added} тестов успешно добавлены!`);
    console.log(`📊 Статистика:`);
    console.log(`   - DevOps: 6 тестов`);
    console.log(`   - Системный аналитик: 7 тестов`);
    console.log(`   - Project Manager: 7 тестов`);
    console.log(`   - Backend: 6 тестов`);
    console.log(`   - Frontend: 6 тестов`);
    console.log(`   - QA: 6 тестов`);
    console.log(`   - Дополнительные: 6 тестов`);
    console.log(`   - Всего: 44 теста, ${tests.reduce((sum, t) => sum + t.questions.length, 0)} вопросов`);
  } catch (error) {
    console.error('❌ Ошибка при добавлении тестов:', error);
  }
}

// Запуск
addTests();