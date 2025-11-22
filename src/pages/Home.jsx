import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

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
            gap: '2rem'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                padding: '3rem',
                borderRadius: '50%',
                marginBottom: '1rem',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)'
            }}>
                <UtensilsCrossed size={64} className="text-gradient" style={{ color: '#818cf8' }} />
            </div>

            <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    今天吃什麼？
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                    不再為午餐煩惱，<br />讓我們幫你做決定！
                </p>
            </div>

            <button
                className="btn btn-primary"
                style={{ fontSize: '1.2rem', padding: '1rem 3rem', marginTop: '2rem' }}
                onClick={() => navigate('/preferences')}
            >
                開始挑選午餐
            </button>
        </div>
    );
};

export default Home;
