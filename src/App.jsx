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
