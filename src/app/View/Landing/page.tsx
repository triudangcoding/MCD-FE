import React, { useMemo } from 'react';
import Hyperspeed from './Hyperspeed';
import Navbar from '../../../shared/components/Navbar';
import DarkModeToggle from '../../../shared/components/drakmode';
import { useTheme } from '../../../providers/ThemeProvider';

const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Màu sắc thay đổi theo theme - Road nổi bật với contrast cao
  const hyperspeedColors = useMemo(() => {
    if (isDark) {
      // Dark mode - Giữ nguyên màu cũ (base colors)
      return {
        roadColor: 0x1a1a1a,               // Xám đậm - road nổi bật
        islandColor: 0x0d0d0d,             // Xám đen - island
        background: 0x000000,              // Đen tuyền
        shoulderLines: 0xFFFFFF,           // Trắng - giữ nguyên
        brokenLines: 0xFFFFFF,             // Trắng - giữ nguyên
        leftCars: [0xD856BF, 0x6750A2, 0xC247AC],    // Hồng/tím nhạt - giữ nguyên
        rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],   // Xanh dương nhạt - giữ nguyên
        sticks: 0x03B3C3,                  // Xanh cyan - giữ nguyên
      };
    } else {
      // Light mode - Màu hồng ĐẬM và xanh lá ĐẬM (vibrant/neon)
      return {
        roadColor: 0xAAAAAA,               // Xám đậm hơn - road nổi bật
        islandColor: 0xCCCCCC,             // Xám nhạt - island tạo contrast
        background: 0xFFFFFF,              // Trắng
        shoulderLines: 0x00FF00,           // Xanh lá neon đậm
        brokenLines: 0x00FF00,             // Xanh lá neon đậm
        leftCars: [0xFF0080, 0xFF1493, 0xFF69B4],    // Hồng neon đậm
        rightCars: [0x00FF00, 0x00E676, 0x00C853],   // Xanh lá neon đậm
        sticks: 0x00E676,                  // Xanh lá sáng
      };
    }
  }, [isDark]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Floating Dark Mode Toggle - Fixed Position */}
      <div className="fixed bottom-8 right-8 z-50 group">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 scale-110"></div>
          
          {/* Toggle button with label */}
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-3 shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110">
            <DarkModeToggle />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
              Toggle Theme
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Hyperspeed Background */}
      <section className="relative h-screen w-full">
        {/* Hyperspeed Background - với màu thay đổi theo theme */}
        <div className="absolute inset-0 z-0">
          <Hyperspeed
            key={theme} // Force re-render khi theme thay đổi
            effectOptions={{
              onSpeedUp: () => { },
              onSlowDown: () => { },
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: hyperspeedColors
            }}
          />
        </div>

        {/* Hero Content Overlay - Text Area riêng biệt để có thể select/copy */}
        <div className="relative z-10 flex items-center justify-center h-full pt-20 md:pt-24 pointer-events-none">
          {/* Text Content Area - có thể select text */}
          <div 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto select-text"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to the
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Future of Design
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Experience cutting-edge UI/UX with stunning animations and seamless interactions. 
              Built with modern technologies for the next generation of web applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className={`px-8 py-4 backdrop-blur-md border rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-gray-900/10 border-gray-900/20 text-gray-900 hover:bg-gray-900/20'
              }`}>
                Learn More
              </button>
            </div>

            {/* Feature badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
              {['Fast', 'Modern', 'Responsive', 'Beautiful'].map((feature, index) => (
                <div
                  key={feature}
                  className={`px-6 py-2 backdrop-blur-sm border rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      : 'bg-gray-900/5 border-gray-900/10 text-gray-900 hover:bg-gray-900/10'
                  }`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce pointer-events-none">
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-2 ${
            isDark ? 'border-white/30' : 'border-gray-900/30'
          }`}>
            <div className={`w-1 h-3 rounded-full animate-scroll ${
              isDark ? 'bg-white/50' : 'bg-gray-900/50'
            }`}></div>
          </div>
        </div>
      </section>

      {/* Additional sections can be added here */}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        /* Text selection styles */
        .select-text {
          user-select: text;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
        }

        .select-text * {
          user-select: text;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
        }

        /* Ensure gradient text can be selected */
        .select-text .bg-clip-text {
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .select-text .bg-clip-text::selection {
          -webkit-text-fill-color: initial;
          background-clip: initial;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;