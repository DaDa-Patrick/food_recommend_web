import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart, History as HistoryIcon, Utensils } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="container" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '80px' }}>
            <header style={{
                padding: '1.5rem 0 1rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))'
            }}>
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

            {/* Bottom Navigation Bar */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                borderTop: '2px solid rgba(99, 102, 241, 0.2)',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 50,
                boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)'
            }}>
                <Link
                    to="/"
                    style={{
                        color: isActive('/') ? '#818cf8' : '#94a3b8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease',
                        gap: '4px',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        flex: 1
                    }}
                    onMouseEnter={(e) => !isActive('/') && (e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)')}
                    onMouseLeave={(e) => !isActive('/') && (e.currentTarget.style.background = 'transparent')}
                >
                    <Home size={24} />
                    <span>首頁</span>
                </Link>
                <Link
                    to="/preferences"
                    style={{
                        color: isActive('/preferences') ? '#ec4899' : '#94a3b8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease',
                        gap: '4px',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        flex: 1
                    }}
                    onMouseEnter={(e) => !isActive('/preferences') && (e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)')}
                    onMouseLeave={(e) => !isActive('/preferences') && (e.currentTarget.style.background = 'transparent')}
                >
                    <Utensils size={24} />
                    <span>偏好</span>
                </Link>
                <Link
                    to="/favorites"
                    style={{
                        color: isActive('/favorites') ? '#f472b6' : '#94a3b8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease',
                        gap: '4px',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        flex: 1
                    }}
                    onMouseEnter={(e) => !isActive('/favorites') && (e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)')}
                    onMouseLeave={(e) => !isActive('/favorites') && (e.currentTarget.style.background = 'transparent')}
                >
                    <Heart size={24} />
                    <span>收藏</span>
                </Link>
                <Link
                    to="/history"
                    style={{
                        color: isActive('/history') ? '#a78bfa' : '#94a3b8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease',
                        gap: '4px',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        flex: 1
                    }}
                    onMouseEnter={(e) => !isActive('/history') && (e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)')}
                    onMouseLeave={(e) => !isActive('/history') && (e.currentTarget.style.background = 'transparent')}
                >
                    <HistoryIcon size={24} />
                    <span>紀錄</span>
                </Link>
            </nav>
        </div>
    );
};

export default Layout;
