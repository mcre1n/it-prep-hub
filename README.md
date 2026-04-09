# 🚀 IT Prep Hub

<div align="center">

![GitHub Actions](https://github.com/mcre1n/it-prep-hub/actions/workflows/deploy.yml/badge.svg)
![GitHub License](https://img.shields.io/github/license/ваш-аккаунт/it-prep-hub)
![GitHub stars](https://img.shields.io/github/stars/ваш-аккаунт/it-prep-hub)
![GitHub issues](https://img.shields.io/github/issues/ваш-аккаунт/it-prep-hub)
![Docker Pulls](https://img.shields.io/docker/pulls/ваш-аккаунт/it-prep-hub)

**Платформа для подготовки к IT-собеседованиям с тестами и практическими заданиями**

[Демо](https://it-prep-hub.web.app) • [Документация](#) • [Сообщить о проблеме](https://github.com/ваш-аккаунт/it-prep-hub/issues)

</div>

---

##  О проекте

**IT Prep Hub** — это веб-приложение, которое помогает IT-специалистам готовиться к собеседованиям. Здесь вы найдёте тесты по различным направлениям и практические задания для закрепления знаний.

###  Для кого этот проект

| Специализация | Что предлагает |
|---------------|----------------|
| **DevOps** | CI/CD, контейнеризация, облачные технологии |
| **Frontend** | React, JavaScript, CSS, TypeScript |
| **Backend** | API, базы данных, серверная разработка |
| **Системный аналитик** | BPMN, UML, требования, API |
| **Project Manager** | Agile, Scrum, управление рисками |
| **QA** | Тестирование, автоматизация, баг-трекинг |

###  Возможности

- ✅ **40+ тестов** по всем IT-направлениям
- ✅ **500+ вопросов** для подготовки
- ✅ **Практические задания** с проверкой
- ✅ **Статистика прогресса** в личном кабинете
- ✅ **Авторизация через Google и Яндекс**
- ✅ **Адаптивный дизайн** для всех устройств
- ✅ **Тёмная тема** (в разработке)

---

##  Архитектура проекта

```mermaid
graph TB
    subgraph "Frontend"
        A[React 18] --> B[Vite]
        A --> C[Tailwind CSS]
        A --> D[React Router]
    end

    subgraph "Backend (BaaS)"
        E[Firebase Auth] --> F[Firestore DB]
        E --> G[Firebase Hosting]
    end

    subgraph "DevOps"
        H[GitHub Actions] --> I[Docker]
        I --> J[Kubernetes]
        H --> K[Firebase Deploy]
    end

    A --> E