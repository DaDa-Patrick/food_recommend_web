import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, History as HistoryIcon, Utensils } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="container" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '80px' }}>
            <div className="app-bg" />
            <header className="app-header">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            padding: '0.5rem',
                            borderRadius: '0.5rem'
                        }}>
                            <Utensils size={24} color="white" />
                        </div>
                        <h1 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>Lunch Picker</h1>
                    </div>
                </Link>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>

            {/* Bottom Navigation Bar (glass) */}
            <nav className="bottom-nav">
                <Link to="/" className={isActive('/') ? 'active' : ''}>
                    <Home size={24} />
                    <span>首頁</span>
                </Link>
                <Link to="/preferences" className={isActive('/preferences') ? 'active' : ''}>
                    <Utensils size={24} />
                    <span>偏好</span>
                </Link>
                <Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}>
                    <Heart size={24} />
                    <span>收藏</span>
                </Link>
                <Link to="/history" className={isActive('/history') ? 'active' : ''}>
                    <HistoryIcon size={24} />
                    <span>紀錄</span>
                </Link>
            </nav>
        </div>
    );
};

export default Layout;
