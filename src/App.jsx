import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
// Placeholders for other pages
import Preferences from './pages/Preferences';
import Result from './pages/Result';
import Favorites from './pages/Favorites';
import History from './pages/History';

function App() {
  React.useEffect(() => {
    const handleClick = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'magic-sparkle';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      document.body.appendChild(sparkle);

      // Remove the element after animation completes
      setTimeout(() => {
        sparkle.remove();
      }, 500);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="result" element={<Result />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
