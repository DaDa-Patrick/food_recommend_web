import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { Heart } from 'lucide-react';

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

    return (
        <div className="container fade-in" style={{ paddingBottom: '100px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Heart fill="var(--color-secondary)" color="var(--color-secondary)" /> 我的收藏
            </h2>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '3rem' }}>
                    <p>目前沒有收藏的餐廳。</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {favorites.map(restaurant => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            isFavorite={true}
                            onToggleFavorite={() => removeFavorite(restaurant.id)}
                            showActions={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
