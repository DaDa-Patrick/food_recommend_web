import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendation } from '../utils/recommendationEngine';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { RefreshCw, ArrowLeft, Zap } from 'lucide-react';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [recommendationCount, setRecommendationCount] = useState(1);

    const criteria = location.state?.criteria;

    useEffect(() => {
        if (!criteria) {
            navigate('/preferences');
            return;
        }
        setFavorites(storage.getFavorites());
        handleRecommendation();
    }, [criteria]);

    const handleRecommendation = () => {
        setLoading(true);
        setError(null);

        // Simulate slight delay for effect
        setTimeout(() => {
            const result = getRecommendation(criteria);
            if (result) {
                setRestaurant(result);
                setRecommendationCount(prev => prev + 1);
                // Save to history
                const history = storage.getHistory();
                const newHistory = [result, ...history].slice(0, 10); // Keep last 10
                storage.setHistory(newHistory);
            } else {
                setRestaurant(null);
                setError('沒有符合條件的店家，請重新調整偏好。');
            }
            setLoading(false);
        }, 600);
    };

    const toggleFavorite = () => {
        if (!restaurant) return;
        const isFav = favorites.some(f => f.id === restaurant.id);
        let newFavorites;
        if (isFav) {
            newFavorites = favorites.filter(f => f.id !== restaurant.id);
        } else {
            newFavorites = [...favorites, restaurant];
        }
        setFavorites(newFavorites);
        storage.setFavorites(newFavorites);
    };

    const blockRestaurant = () => {
        if (!restaurant) return;
        if (window.confirm(`確定要將「${restaurant.name}」加入避雷清單嗎？下次將不再推薦。`)) {
            const blocklist = storage.getBlocklist();
            storage.setBlocklist([...blocklist, restaurant.id]);
            handleRecommendation(); // Re-roll
        }
    };

    if (!criteria) return null;

    return (
        <div className="container fade-in" style={{ paddingBottom: '120px' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.05))',
                borderRadius: '0.75rem',
                border: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
                <button
                    onClick={() => navigate('/preferences')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.color = 'var(--color-primary-light)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                >
                    <ArrowLeft size={20} /> 重選條件
                </button>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    第 <span style={{ color: 'var(--color-primary-light)', fontWeight: '600' }}>{recommendationCount}</span> 次推薦
                </span>
            </div>

            {loading ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '400px',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '60px',
                        height: '60px'
                    }}>
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            border: '3px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderTop: '3px solid var(--color-primary)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <Zap size={24} style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#818cf8'
                        }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>正在為您挑選...</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>尋找最完美的午餐選擇</p>
                    </div>
                </div>
            ) : error ? (
                <div style={{
                    textAlign: 'center',
                    marginTop: '3rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                    borderRadius: '1rem',
                    border: '1px solid rgba(236, 72, 153, 0.2)'
                }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
                        😅 {error}
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/preferences')}>
                        返回設定
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #818cf8, #f472b6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        ✨ 推薦您吃：
                    </h2>

                    <RestaurantCard
                        restaurant={restaurant}
                        isFavorite={favorites.some(f => f.id === restaurant.id)}
                        onToggleFavorite={toggleFavorite}
                        onBlock={blockRestaurant}
                    />

                    <button
                        className="btn btn-outline"
                        onClick={handleRecommendation}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            maxWidth: '400px',
                            fontSize: '1rem',
                            padding: '0.85rem 1.5rem'
                        }}
                    >
                        <RefreshCw size={20} /> 再換一間
                    </button>
                </div>
            )}
        </div>
    );
};

export default Result;
