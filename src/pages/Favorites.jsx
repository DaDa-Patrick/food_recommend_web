import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { Heart, Trash2 } from 'lucide-react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(storage.getFavorites());
    }, []);

    const removeFavorite = (id) => {
        const newFavorites = favorites.filter(f => f.id !== id);
        setFavorites(newFavorites);
        storage.setFavorites(newFavorites);
    };

    const clearAll = () => {
        if (window.confirm('確定要清除所有收藏嗎？')) {
            setFavorites([]);
            storage.setFavorites([]);
        }
    };

    return (
        <div className="container fade-in" style={{ paddingBottom: '120px' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.05))',
                borderRadius: '1rem',
                border: '1px solid rgba(236, 72, 153, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        background: 'rgba(236, 72, 153, 0.2)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem'
                    }}>
                        <Heart fill="#f472b6" color="#f472b6" size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--color-text-primary)' }}>
                            我的收藏
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>
                            共 <span style={{ fontWeight: '600', color: '#f472b6' }}>{favorites.length}</span> 間餐廳
                        </p>
                    </div>
                </div>
                {favorites.length > 0 && (
                    <button
                        onClick={clearAll}
                        style={{
                            background: 'transparent',
                            border: '2px solid rgba(236, 72, 153, 0.2)',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#f472b6';
                            e.currentTarget.style.color = '#f472b6';
                            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <Trash2 size={16} /> 全部清除
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    padding: '2rem',
                    background: 'rgba(236, 72, 153, 0.05)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(236, 72, 153, 0.1)'
                }}>
                    <Heart size={48} style={{ color: 'var(--color-text-secondary)', margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>
                        目前沒有收藏的餐廳。
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                        從推薦頁面收藏你喜歡的餐廳吧！
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {favorites.map((restaurant, index) => (
                        <div key={restaurant.id} className="slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                            <RestaurantCard
                                restaurant={restaurant}
                                isFavorite={true}
                                onToggleFavorite={() => removeFavorite(restaurant.id)}
                                showActions={true}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
