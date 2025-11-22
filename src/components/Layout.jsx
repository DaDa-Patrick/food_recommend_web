import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, History as HistoryIcon, Utensils } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="container" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '80px' }}>
            <header style={{ padding: '1rem 0', textAlign: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: '800' }}>Lunch Picker</h1>
                </Link>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>

            {/* Bottom Navigation Bar */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 50
            }}>
                <Link to="/" style={{ color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>
                    <Home size={24} />
                    <span style={{ marginTop: '4px' }}>首頁</span>
                </Link>
                <Link to="/favorites" style={{ color: isActive('/favorites') ? 'var(--color-secondary)' : 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>
                    <Heart size={24} />
                    <span style={{ marginTop: '4px' }}>收藏</span>
                </Link>
                <Link to="/history" style={{ color: isActive('/history') ? 'var(--color-accent)' : 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>
                    <HistoryIcon size={24} />
                    <span style={{ marginTop: '4px' }}>紀錄</span>
                </Link>
            </nav>
        </div>
    );
};

export default Layout;
