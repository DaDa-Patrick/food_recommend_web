import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendation } from '../utils/recommendationEngine';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { RefreshCw, ArrowLeft } from 'lucide-react';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

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
        <div className="container fade-in" style={{ paddingBottom: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate('/preferences')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> 重選條件
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                    <RefreshCw className="spin" size={48} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>正在為您挑選...</p>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{error}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/preferences')}>返回設定</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>推薦您吃：</h2>

                    <RestaurantCard
                        restaurant={restaurant}
                        isFavorite={favorites.some(f => f.id === restaurant.id)}
                        onToggleFavorite={toggleFavorite}
                        onBlock={blockRestaurant}
                    />

                    <button
                        className="btn btn-outline"
                        onClick={handleRecommendation}
                        style={{ marginTop: '1rem', width: '100%', maxWidth: '400px' }}
                    >
                        <RefreshCw size={20} /> 再換一間
                    </button>
                </div>
            )}
        </div>
    );
};

export default Result;
