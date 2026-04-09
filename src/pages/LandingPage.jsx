import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Common/Icons';
import { categories } from '../data/tests';

export default function LandingPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let hexagons = [];
    let particles = [];
    let time = 0;
    let pixelRatio = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(pixelRatio, pixelRatio);

      initHexagons();
      initParticles();
    };

    class Hexagon {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.002 + Math.random() * 0.002;
        this.opacity = 0.1 + Math.random() * 0.2;
      }

      update() {
        this.angle += this.speed;
        this.opacity = 0.1 + Math.sin(Date.now() * 0.0003 + this.x) * 0.08;
      }

      draw() {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = this.angle + (i * Math.PI * 2) / 6;
          const x = this.x + Math.cos(angle) * this.size;
          const y = this.y + Math.sin(angle) * this.size;
          points.push({ x, y });
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();

        ctx.strokeStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${this.opacity * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.4 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initHexagons = () => {
      hexagons = [];
      const spacing = 85;
      const startX = -50;
      const startY = -50;
      const cols = Math.ceil((window.innerWidth + 100) / spacing);
      const rows = Math.ceil((window.innerHeight + 100) / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = startX + i * spacing;
          const y = startY + j * spacing + ((i % 2) * spacing) / 2;
          const size = 28 + Math.sin(i * j) * 4;
          hexagons.push(new Hexagon(x, y, size));
        }
      }
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
        );
      }
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(0, '#fafcff');
      gradient.addColorStop(0.3, '#f5f9ff');
      gradient.addColorStop(0.7, '#f0f5fe');
      gradient.addColorStop(1, '#eef2fa');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const radialGradient = ctx.createRadialGradient(
        window.innerWidth * 0.3,
        window.innerHeight * 0.2,
        0,
        window.innerWidth * 0.5,
        window.innerHeight * 0.3,
        window.innerWidth * 0.5
      );
      radialGradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      radialGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const drawGrid = () => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;

      const step = 45;
      for (let x = 0; x < window.innerWidth + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.stroke();
      }

      for (let y = 0; y < window.innerHeight + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }
    };

    const drawGridPoints = () => {
      const step = 45;
      for (let x = step; x < window.innerWidth; x += step) {
        for (let y = step; y < window.innerHeight; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
          ctx.fill();
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 0.04 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawHexagonConnections = () => {
      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const dx = hexagons[i].x - hexagons[j].x;
          const dy = hexagons[i].y - hexagons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 95) {
            ctx.beginPath();
            ctx.moveTo(hexagons[i].x, hexagons[i].y);
            ctx.lineTo(hexagons[j].x, hexagons[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, 0.02)`;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      drawBackground();
      drawGrid();
      drawGridPoints();

      hexagons.forEach((hex) => {
        hex.update();
        hex.draw();
      });

      drawHexagonConnections();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      time += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const features = [
    {
      icon: <Icons.AdvantageActual />,
      title: 'Актуальные тесты',
      description: 'Тесты по самым востребованным IT-направлениям',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Icons.AdvantageAnalytics />,
      title: 'Детальная аналитика',
      description: 'Отслеживайте свой прогресс и сильные стороны',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Icons.RealQuestions />,
      title: 'Реальные вопросы',
      description: 'Вопросы, основанные на реальных собеседованиях',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Icons.Practice />,
      title: 'Практические задания',
      description: 'Закрепляйте теорию на реальных задачах',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Icons.Rating />,
      title: 'Рейтинг',
      description: 'Сравнивайте свои результаты с другими',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: <Icons.Repeat />,
      title: 'Повторное прохождение',
      description: 'Проходите тесты снова для закрепления',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Canvas фон */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none', imageRendering: 'crisp-edges' }}
      />

      {/* Контент */}
      <div className="relative z-10">
        {/* Hero секция */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur rounded-full px-4 py-2 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-700">IT Prep Hub</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Готовьтесь к
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IT-собеседованиям
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Тесты и практические задания для DevOps, аналитиков, PM, разработчиков и QA
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tests"
                  className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold overflow-hidden transition-all hover:shadow-lg"
                >
                  <span className="relative z-10">Начать подготовку</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>

                <Link
                  to="/tasks"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  Практические задания
                </Link>
              </div>

              {/* Статистика */}
              <div className="mt-12 flex justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">6+</div>
                  <div className="text-sm text-gray-500">Направлений</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-500">Тестов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-500">Вопросов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">20+</div>
                  <div className="text-sm text-gray-500">Заданий</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Категории */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Направления подготовки</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Выберите своё направление и начните подготовку
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/tests?category=${cat.id}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    {cat.icon === '🚀' && <Icons.DevOps />}
                    {cat.icon === '📊' && <Icons.SystemAnalyst />}
                    {cat.icon === '📋' && <Icons.ProjectManager />}
                    {cat.icon === '⚙️' && <Icons.Backend />}
                    {cat.icon === '🎨' && <Icons.Frontend />}
                    {cat.icon === '🔍' && <Icons.QA />}
                    {!['🚀', '📊', '📋', '⚙️', '🎨', '🔍'].includes(cat.icon) && (
                      <span className="text-3xl">{cat.icon}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-600 text-sm">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
                    <span className="text-sm font-medium">Перейти к тестам</span>
                    <Icons.ArrowRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
              <p className="text-xl text-gray-600">Всё, что нужно для эффективной подготовки</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="text-center p-6 group">
                  <div
                    className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы начать подготовку?</h2>
            <p className="text-blue-100 text-lg mb-8">Присоединяйтесь к тысячам IT-специалистов</p>
            <Link
              to="/tests"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Начать подготовку
              <Icons.ArrowRight />
            </Link>
          </div>
        </section>

        {/* Футер */}
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IT</span>
                </div>
                <span className="font-semibold text-white">Prep Hub</span>
                <span className="text-sm">© 2024</span>
              </div>
              <div className="flex gap-6">
                <Link to="/tests" className="hover:text-white transition">
                  Тесты
                </Link>
                <Link to="/tasks" className="hover:text-white transition">
                  Задания
                </Link>
                <Link to="/profile" className="hover:text-white transition">
                  Профиль
                </Link>
              </div>
              <div className="text-sm">Сделано с ❤️ для IT-специалистов</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
