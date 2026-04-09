import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import LandingPage from './pages/LandingPage';
import TestsPage from './pages/TestsPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/test/:id" element={<TestPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/task/:id" element={<TaskPage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
