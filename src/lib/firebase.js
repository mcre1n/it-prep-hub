import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBcP3Q02sPnS7pG0BWZ_gHbQQM2uGM-_Os',
  authDomain: 'it-prep-hub.firebaseapp.com',
  projectId: 'it-prep-hub',
  storageBucket: 'it-prep-hub.firebasestorage.app',
  messagingSenderId: '124192650537',
  appId: '1:124192650537:web:2a3e477e669bad02307338',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ==================== АВТОРИЗАЦИЯ ====================

// Регистрация
export async function register(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName: displayName || email.split('@')[0],
      createdAt: serverTimestamp(),
      testResults: [],
      completedTasks: [],
      totalPoints: 0,
      averageScore: 0,
      totalTests: 0,
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Вход
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Выход
export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
}

// Сброс пароля
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
}

// Следим за состоянием авторизации
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ==================== ТЕСТЫ ====================

// Получение всех тестов
export async function getAllTests() {
  try {
    const testsRef = collection(db, 'tests');
    const snapshot = await getDocs(testsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Ошибка получения тестов:', error);
    return [];
  }
}

// Получение теста по ID
export async function getTestById(testId) {
  try {
    const testDoc = await getDoc(doc(db, 'tests', testId));
    if (testDoc.exists()) {
      return { id: testDoc.id, ...testDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения теста:', error);
    return null;
  }
}

// Сохранение результата теста
export async function saveTestResult(userId, testData, answers, score, percentage) {
  try {
    console.log('📝 Сохраняем результат теста:', {
      userId,
      testId: testData.id,
      score,
      percentage,
    });

    const resultRef = await addDoc(collection(db, 'testResults'), {
      userId,
      testId: testData.id,
      testTitle: testData.title,
      category: testData.category,
      questionsCount: testData.questions.length,
      correctAnswers: score,
      percentage,
      answers,
      completedAt: serverTimestamp(),
    });

    console.log('✅ Результат сохранён, ID:', resultRef.id);

    // Обновляем статистику пользователя
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userResults = userData.testResults || [];
      const totalTests = userResults.length + 1;
      const currentAvg = userData.averageScore || 0;
      const avgScore = (currentAvg * (totalTests - 1) + percentage) / totalTests;

      await updateDoc(userRef, {
        testResults: [...userResults, resultRef.id],
        totalTests,
        averageScore: Math.round(avgScore),
      });
      console.log('✅ Статистика пользователя обновлена');
    } else {
      // Если пользователь ещё не создан, создаём
      await setDoc(userRef, {
        email: userId,
        displayName: 'Пользователь',
        testResults: [resultRef.id],
        totalTests: 1,
        averageScore: percentage,
        createdAt: serverTimestamp(),
        completedTasks: [],
        totalPoints: 0,
      });
      console.log('✅ Создан новый пользователь');
    }

    return resultRef.id;
  } catch (error) {
    console.error('❌ Ошибка сохранения результата:', error);
    throw error;
  }
}

// Получение истории тестов пользователя
export async function getUserTestResults(userId) {
  try {
    console.log('🔍 Загрузка результатов тестов для пользователя:', userId);

    const q = query(
      collection(db, 'testResults'),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        completedAt: data.completedAt,
      };
    });

    console.log(`✅ Загружено ${results.length} результатов`);
    return results;
  } catch (error) {
    console.error('❌ Ошибка получения истории:', error);
    return [];
  }
}

// ==================== ЗАДАНИЯ ====================

// Получение всех заданий
export async function getAllTasks() {
  try {
    const tasksRef = collection(db, 'tasks');
    const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Ошибка получения заданий:', error);
    return [];
  }
}

// Получение задания по ID
export async function getTaskById(taskId) {
  try {
    const taskDoc = await getDoc(doc(db, 'tasks', taskId));
    if (taskDoc.exists()) {
      return { id: taskDoc.id, ...taskDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения задания:', error);
    return null;
  }
}

// Получение выполненных заданий пользователя
export async function getUserCompletedTasks(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().completedTasks || [];
    }
    return [];
  } catch (error) {
    console.error('Ошибка получения выполненных заданий:', error);
    return [];
  }
}

// Сохранение ответа на задание
export async function submitTaskAnswer(userId, taskId, answer, taskPoints = 100) {
  try {
    const userTaskRef = doc(db, 'userTasks', `${userId}_${taskId}`);
    await setDoc(userTaskRef, {
      userId,
      taskId,
      answer,
      completedAt: serverTimestamp(),
      status: 'completed',
      points: taskPoints,
    });

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        completedTasks: arrayUnion(taskId),
        totalPoints: (userDoc.data().totalPoints || 0) + taskPoints,
      });
    } else {
      await setDoc(userRef, {
        completedTasks: [taskId],
        totalPoints: taskPoints,
        createdAt: serverTimestamp(),
        testResults: [],
        averageScore: 0,
        totalTests: 0,
      });
    }

    return true;
  } catch (error) {
    console.error('Ошибка сохранения ответа:', error);
    return false;
  }
}

// ==================== ПРОФИЛЬ ====================

// Получение профиля пользователя
export async function getUserProfile(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    return null;
  }
}

// Обновление профиля
export async function updateUserProfile(userId, data) {
  try {
    await updateDoc(doc(db, 'users', userId), data);
    return true;
  } catch (error) {
    console.error('Ошибка обновления профиля:', error);
    return false;
  }
}

// Получение полной статистики пользователя
export async function getUserStats(userId) {
  try {
    console.log('📊 Загрузка статистики для пользователя:', userId);

    // Получаем все результаты тестов
    const testResults = await getUserTestResults(userId);

    // Получаем профиль пользователя
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    let totalPoints = 0;
    let completedTasks = 0;

    if (userDoc.exists()) {
      const userData = userDoc.data();
      totalPoints = userData.totalPoints || 0;
      completedTasks = userData.completedTasks?.length || 0;
    }

    // Расчёт статистики по тестам
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
          };
        }
        categoryStats[category].count++;
        categoryStats[category].sum += result.percentage;
        categoryStats[category].best = Math.max(categoryStats[category].best, result.percentage);
        categoryStats[category].worst = Math.min(categoryStats[category].worst, result.percentage);
      });

      // Вычисляем среднее по категориям
      Object.keys(categoryStats).forEach((cat) => {
        categoryStats[cat].average = Math.round(categoryStats[cat].sum / categoryStats[cat].count);
      });
    }

    console.log('📊 Статистика рассчитана:', {
      totalTests,
      averageScore,
      bestScore,
      worstScore,
      totalPoints,
      completedTasks,
      categoryStats,
    });

    return {
      totalTests,
      averageScore,
      bestScore,
      worstScore: worstScore === 100 ? 0 : worstScore,
      totalPoints,
      completedTasks,
      categoryStats,
    };
  } catch (error) {
    console.error('❌ Ошибка получения статистики:', error);
    return {
      totalTests: 0,
      averageScore: 0,
      bestScore: 0,
      worstScore: 0,
      totalPoints: 0,
      completedTasks: 0,
      categoryStats: {},
    };
  }
}
