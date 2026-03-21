import React, { useState, useEffect, memo } from 'react';
import { Heart, Calendar, MapPin, Clock, Utensils, GlassWater, Music, Camera, Check } from 'lucide-react';

// =====================================================================
// 🎨 ПАЛИТРА САЙТА (НАСТРОЙКА ЦВЕТА)
// =====================================================================
// Замените HEX-коды ниже, чтобы поменять основной цвет всего сайта.
// Сейчас установлен Пыльно-розовый (Rose).
//
// Готовые примеры (просто скопируйте значения внутрь themeColors):
// 🌿 Изумрудный (Emerald): lightest: '#a7f3d0', light: '#6ee7b7', main: '#34d399', dark: '#10b981', darkest: '#059669'
// ☁️ Небесно-голубой (Sky): lightest: '#bae6fd', light: '#7dd3fc', main: '#38bdf8', dark: '#0ea5e9', darkest: '#0284c7'
// 💜 Лавандовый (Violet): lightest: '#ddd6fe', light: '#c4b5fd', main: '#a78bfa', dark: '#8b5cf6', darkest: '#7c3aed'
// =====================================================================
const themeColors = {
  lightest: '#34d399',
  light: '#10b981',
  main: '#059669',
  dark: '#065f46',
  darkest: '#064e3b' // Самый темный (наведение мыши на ссылки)
};

// ВАЖНО: В вашем локальном проекте раскомментируйте строки ниже и удалите временные ссылки-заглушки!
 import backgroundImage from './assets/IMG_9805.webp';
 import backgroundImageTitle from './assets/123.webp';


// Выносим стили в отдельный мемоизированный компонент
const GlobalStyles = memo(() => (
    <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');
    
    :root {
      --theme-lightest: ${themeColors.lightest};
      --theme-light: ${themeColors.light};
      --theme-main: ${themeColors.main};
      --theme-dark: ${themeColors.dark};
      --theme-darkest: ${themeColors.darkest};
    }

    .font-serif {
      font-family: 'Cormorant Garamond', serif;
    }
    
    .fade-in {
      animation: fadeIn 2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* === Классы цветовой палитры === */
    .text-theme-lightest { color: var(--theme-lightest); }
    .text-theme-light { color: var(--theme-light); }
    .text-theme-main { color: var(--theme-main); }
    .text-theme-dark { color: var(--theme-dark); }
    
    .bg-theme-main { background-color: var(--theme-main); }
    
    .border-theme-lightest { border-color: var(--theme-lightest); }
    .border-theme-light { border-color: var(--theme-light); }
    
    .hover-text-theme-darkest:hover { color: var(--theme-darkest); }
    
    .focus-input-theme:focus {
      border-color: var(--theme-light);
      box-shadow: 0 0 0 3px var(--theme-lightest);
    }
  `}} />
));

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    preferences: ''
  });

  const calculateTimeLeft = () => {
    const weddingDate = new Date(2026, 4, 30, 16, 30, 0); // 30 Мая 2026, 16:00
    const difference = +weddingDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        дней: Math.floor(difference / (1000 * 60 * 60 * 24)),
        часов: Math.floor((difference / (1000 * 60 * 60)) % 24),
        минут: Math.floor((difference / 1000 / 60) % 60),
        секунд: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xjgazpdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Имя гостя': formData.name,
          'Присутствие': formData.attendance === 'yes' ? 'Да, буду' : 'Нет, не смогу',
          'Пожелания/Аллергии': formData.preferences || 'Нет пожеланий'
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      console.log('Отправленные данные:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или сообщите нам лично.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-stone-50 font-sans text-stone-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <GlobalStyles />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${backgroundImageTitle})`,
              }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 fade-in">
            <p className="tracking-[0.2em] uppercase text-sm md:text-base mb-6 text-stone-200">Мы женимся</p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-4 font-light">
              Александр
              <span className="block text-4xl md:text-6xl italic my-2 text-theme-lightest">&</span>
              Анна
            </h1>
            <p className="text-xl md:text-2xl mt-8 tracking-widest font-light">
              30 . 05 . 2026
            </p>
            <div className="mt-12">
              <a href="#rsvp" className="inline-block border border-white/50 px-8 py-3 rounded-full hover:bg-white hover:text-stone-900 transition-colors duration-300 backdrop-blur-sm">
                Подтвердить присутствие
              </a>
            </div>
          </div>
        </section>

        {/* Invitation Text Section */}
        <section className="py-24 px-4 text-center max-w-3xl mx-auto">
          <Heart className="mx-auto w-8 h-8 text-theme-light mb-8 opacity-50" />
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-stone-800">Дорогие родные и друзья!</h2>
          <p className="text-lg md:text-xl leading-relaxed text-stone-600 font-light">
            Мы приглашаем вас разделить с нами один из самых важных и счастливых дней в нашей жизни.
            Ваше присутствие сделает наш праздник по-настоящему особенным и незабываемым.
            Будем рады видеть вас на нашей свадьбе!
          </p>
        </section>

        {/* Блок с общим вертикальным фото */}
        <section className="pb-32 px-4 flex justify-center">
          <div className="relative w-full max-w-[320px] md:max-w-md">
            {/* Декоративная рамка на фоне */}
            <div className="absolute inset-0 border border-theme-light translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6"></div>

            {/* Контейнер для фото */}
            <div className="relative aspect-[3/4] md:aspect-[2/3] overflow-hidden shadow-xl bg-stone-200">
              <img
                  src={backgroundImage}
                  alt="Наше совместное фото"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </section>

        {/* Details (When & Where) */}
        <section className="bg-stone-100 py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Когда */}
            <div className="bg-white p-10 md:p-14 text-center rounded-2xl shadow-sm border border-stone-100">
              <Calendar className="w-10 h-10 mx-auto text-theme-main mb-6" />
              <h3 className="font-serif text-3xl mb-4">Когда</h3>
              <p className="text-xl text-stone-700 mb-2">Суббота, 30 Мая 2026</p>
              <p className="text-stone-500">Сбор гостей в 16:30</p>

              {/* Таймер */}
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="text-sm uppercase tracking-wider text-stone-400 mb-4">До свадьбы осталось:</p>
                <div className="flex justify-center space-x-4 md:space-x-6">
                  {Object.keys(timeLeft).length ? Object.keys(timeLeft).map((interval, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <span className="font-serif text-3xl md:text-4xl text-stone-800">{timeLeft[interval]}</span>
                        <span className="text-xs text-stone-500 uppercase tracking-wider">{interval}</span>
                      </div>
                  )) : (
                      <span className="font-serif text-2xl text-theme-main italic">Свершилось!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Где */}
            <div className="bg-white p-10 md:p-14 text-center rounded-2xl shadow-sm border border-stone-100">
              <MapPin className="w-10 h-10 mx-auto text-theme-main mb-6" />
              <h3 className="font-serif text-3xl mb-4">Где</h3>
              <p className="text-xl text-stone-700 mb-2">Фудстори</p>
              <p className="text-stone-500 mb-6">Сибирский тракт, 12, стр. 2</p>
              <p className="text-sm text-stone-400 leading-relaxed mb-8">
                Церемония пройдет на свежем воздухе, а банкет в зале.
              </p>
              <a
                  href="https://yandex.ru/maps/?text=Фудстори,+Сибирский+тракт,+12,+стр.+2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-theme-dark hover-text-theme-darkest font-medium transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Открыть на карте</span>
              </a>
            </div>
          </div>
        </section>

        {/* Программа дня */}
        <section className="py-24 px-4 max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Программа дня</h2>

          <div className="relative border-l border-theme-lightest ml-4 md:ml-1/2 md:left-1/2 md:-translate-x-1/2 space-y-12 pb-8">

            <div className="relative pl-8 md:pl-0">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="absolute left-[-5px] md:left-auto md:right-[-5px] top-1 w-3 h-3 bg-theme-main rounded-full"></div>
                <Clock className="hidden md:inline-block w-5 h-5 text-theme-light mr-2 mb-1" />
                <h4 className="font-serif text-2xl mb-1">16:30 - Сбор гостей</h4>
                <p className="text-stone-500 font-light">Приветственный фуршет, шампанское и легкая музыка.</p>
              </div>
              <Clock className="md:hidden absolute left-[-24px] top-0 w-5 h-5 text-theme-light bg-stone-50" />
            </div>

            <div className="relative pl-8 md:pl-0">
              <div className="md:w-1/2 md:ml-auto md:pl-12 text-left">
                <div className="absolute left-[-5px] top-1 w-3 h-3 bg-theme-main rounded-full"></div>
                <Heart className="hidden md:inline-block w-5 h-5 text-theme-light mr-2 mb-1" />
                <h4 className="font-serif text-2xl mb-1">17:00 - Церемония</h4>
                <p className="text-stone-500 font-light">Обмен клятвами и кольцами у цветочной арки.</p>
              </div>
              <Heart className="md:hidden absolute left-[-24px] top-0 w-5 h-5 text-theme-light bg-stone-50" />
            </div>

            <div className="relative pl-8 md:pl-0">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="absolute left-[-5px] md:left-auto md:right-[-5px] top-1 w-3 h-3 bg-theme-main rounded-full"></div>
                <Camera className="hidden md:inline-block w-5 h-5 text-theme-light mr-2 mb-1" />
                <h4 className="font-serif text-2xl mb-1">17:45 - Фотосессия</h4>
                <p className="text-stone-500 font-light">Общие фотографии на память с молодоженами.</p>
              </div>
              <Camera className="md:hidden absolute left-[-24px] top-0 w-5 h-5 text-theme-light bg-stone-50" />
            </div>

            <div className="relative pl-8 md:pl-0">
              <div className="md:w-1/2 md:ml-auto md:pl-12 text-left">
                <div className="absolute left-[-5px] top-1 w-3 h-3 bg-theme-main rounded-full"></div>
                <Utensils className="hidden md:inline-block w-5 h-5 text-theme-light mr-2 mb-1" />
                <h4 className="font-serif text-2xl mb-1">18:30 - Праздничный ужин</h4>
                <p className="text-stone-500 font-light">Банкет, тосты, вкусная еда и развлекательная программа.</p>
              </div>
              <Utensils className="md:hidden absolute left-[-24px] top-0 w-5 h-5 text-theme-light bg-stone-50" />
            </div>

            <div className="relative pl-8 md:pl-0">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="absolute left-[-5px] md:left-auto md:right-[-5px] top-1 w-3 h-3 bg-theme-main rounded-full"></div>
                <Music className="hidden md:inline-block w-5 h-5 text-theme-light mr-2 mb-1" />
                <h4 className="font-serif text-2xl mb-1">22:00 - Танцы и веселье</h4>
                <p className="text-stone-500 font-light">Дискотека.</p>
              </div>
              <Music className="md:hidden absolute left-[-24px] top-0 w-5 h-5 text-theme-light bg-stone-50" />
            </div>

          </div>
        </section>

        {/* Дресс-код */}
        <section className="bg-white py-24 px-4 border-y border-stone-100 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Дресс-код</h2>
            <p className="text-lg text-stone-600 font-light mb-10 leading-relaxed">
              Мы будем очень признательны, если при выборе наряда вы поддержите цветовую гамму нашего праздника.
              Предпочтительны легкие ткани, пастельные и приглушенные природные оттенки.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D7C0A9] shadow-inner border border-stone-200" title="Пудровый"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E3BEB4] shadow-inner border border-stone-200" title="Фисташковый"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#9F8D80] shadow-inner border border-stone-200" title="Пыльно-серый"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#96A47F] shadow-inner border border-stone-200" title="Бежевый"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#7A5A46] shadow-inner border border-stone-200" title="Шалфей"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#656540] shadow-inner border border-stone-200" title="Оливковый"></div>
            </div>
            <p className="text-sm text-stone-400 mt-8">
              *Пожалуйста, избегайте чисто белого цвета (он для невесты), а также слишком ярких, неоновых оттенков, чтобы палитра праздника оставалась гармоничной.
            </p>
          </div>
        </section>

        {/* RSVP Form */}
        <section id="rsvp" className="py-24 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-stone-100 p-8 md:p-12 rounded-3xl text-center">
              <h2 className="font-serif text-4xl mb-4">Присутствие</h2>
              <p className="text-stone-500 mb-8 font-light">Пожалуйста, подтвердите ваше присутствие до 20 апреля 2026 года.</p>

              {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-3xl mb-2">Спасибо!</h3>
                    <p className="text-stone-600">Ваш ответ успешно сохранен. Ждем вас на празднике!</p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Имя и Фамилия</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Например: Иван Иванов"
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 outline-none transition-shadow focus-input-theme bg-white"
                      />
                      <p className="text-xs text-stone-400 mt-1">Если вы будете с парой, пожалуйста, укажите оба имени.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Сможете ли вы присутствовать?</label>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                          <input
                              type="radio"
                              name="attendance"
                              value="yes"
                              checked={formData.attendance === 'yes'}
                              onChange={handleInputChange}
                              className="w-4 h-4 cursor-pointer"
                              style={{ accentColor: themeColors.dark }}
                          />
                          <span className="ml-3 text-stone-700">Да, с удовольствием буду!</span>
                        </label>
                        <label className="flex items-center p-3 border border-stone-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                          <input
                              type="radio"
                              name="attendance"
                              value="no"
                              checked={formData.attendance === 'no'}
                              onChange={handleInputChange}
                              className="w-4 h-4 cursor-pointer"
                              style={{ accentColor: themeColors.dark }}
                          />
                          <span className="ml-3 text-stone-700">К сожалению, не смогу прийти</span>
                        </label>
                      </div>
                    </div>

                    {formData.attendance === 'yes' && (
                        <div className="fade-in">
                          <label htmlFor="preferences" className="block text-sm font-medium text-stone-700 mb-2">
                            Пожелания по напиткам или аллергии на еду?
                          </label>
                          <textarea
                              id="preferences"
                              name="preferences"
                              value={formData.preferences}
                              onChange={handleInputChange}
                              rows="3"
                              placeholder="Красное/белое вино, вегетарианское меню и т.д."
                              className="w-full px-4 py-3 rounded-lg border border-stone-200 outline-none transition-shadow focus-input-theme bg-white"
                          ></textarea>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white font-medium py-4 rounded-lg transition-colors mt-8 flex justify-center items-center ${
                            isLoading ? 'bg-stone-500 cursor-not-allowed' : 'bg-stone-800 hover:bg-stone-700'
                        }`}
                    >
                      {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Отправка...
                          </>
                      ) : (
                          'Отправить ответ'
                      )}
                    </button>
                  </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-12 text-center">
          <h2 className="font-serif text-3xl text-white mb-4 italic">А & А</h2>
          <p className="mb-6">30 мая 2026 г.</p>
          <div className="flex justify-center space-x-4 mb-8">
            <Heart className="w-4 h-4 text-theme-main opacity-50" />
            <Heart className="w-4 h-4 text-theme-main opacity-50" />
            <Heart className="w-4 h-4 text-theme-main opacity-50" />
          </div>
          <p className="text-sm text-stone-600">
            С нетерпением ждем встречи с вами! <br/> По всем вопросам: +7 (912) 645-38-66 (Александр) <br/> +7 (912) 294-01-05 (Анна)
          </p>
        </footer>
      </div>
  );
}