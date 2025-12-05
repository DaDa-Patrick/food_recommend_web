import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
            gap: '2rem',
            padding: '2rem 1rem'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
                padding: '3rem',
                borderRadius: '50%',
                marginBottom: '1rem',
                boxShadow: '0 0 50px rgba(99, 102, 241, 0.3), 0 0 100px rgba(139, 92, 246, 0.1)',
                position: 'relative',
                animation: 'pulse 3s ease-in-out infinite'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '200px',
                    height: '200px',
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid rgba(99, 102, 241, 0.2)',
                        animation: 'spin 20s linear infinite'
                    }}></div>
                </div>
                <UtensilsCrossed size={80} className="text-gradient" style={{ position: 'relative', zIndex: 1 }} />
            </div>

            <div>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '0.75rem',
                    background: 'linear-gradient(135deg, #818cf8, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    今天吃什麼？
                </h2>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    maxWidth: '400px'
                }}>
                    不再為午餐煩惱，<br />讓我們幫你做決定！
                </p>
            </div>

            <button
                className="btn btn-primary"
                style={{
                    fontSize: '1rem',
                    padding: '1rem 2.5rem',
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/preferences')}
            >
                <Sparkles size={20} />
                開始挑選午餐
            </button>

            <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                borderRadius: '1rem',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                maxWidth: '400px'
            }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                    ✨ 快速推薦 • 💾 保存收藏 • 📋 查看紀錄
                </p>
            </div>
        </div>
    );
};

export default Home;
