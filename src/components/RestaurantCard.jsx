import React from 'react';
import { MapPin, DollarSign, Heart, Ban, Utensils } from 'lucide-react';
import { prices, types, locations } from '../utils/mockData';

const RestaurantCard = ({ restaurant, isFavorite, onToggleFavorite, onBlock, showActions = true }) => {
    if (!restaurant) return null;

    const priceLabel = prices.find(p => p.id === restaurant.price)?.name.split(' ')[0] || restaurant.price;
    const locationLabel = locations.find(l => l.id === restaurant.location)?.name || restaurant.location;
    const typeLabel = types.find(t => t.id === restaurant.type)?.name || restaurant.type;

    return (
        <div className="rc-card card fade-in scale-in">
            {/* Header with Image placeholder and Favorite button */}
            <div className="rc-cover">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Utensils size={48} color="#818cf8" />
                    <span className="muted" style={{ fontSize: '0.9rem' }}>美食推薦</span>
                </div>
                {showActions && (
                    <button
                        onClick={onToggleFavorite}
                        className={`fav-btn ${isFavorite ? 'active' : ''}`}
                        aria-pressed={isFavorite}
                        title={isFavorite ? '取消收藏' : '加入收藏'}
                    >
                        <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                )}
            </div>

            {/* Restaurant Name */}
            <div style={{ marginBottom: '1rem' }}>
                <h3 className="rc-title">{restaurant.name}</h3>
            </div>

            {/* Tags/Badges */}
            <div className="rc-tags">
                <span className="badge" style={{ fontSize: '0.85rem', padding: '0.35rem 0.9rem' }}>
                    {typeLabel}
                </span>
                <span className="badge secondary" style={{ fontSize: '0.85rem', padding: '0.35rem 0.9rem' }}>
                    <DollarSign size={14} /> {priceLabel}
                </span>
                <span className="badge accent" style={{ fontSize: '0.85rem', padding: '0.35rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} /> {locationLabel}
                </span>
            </div>

            {/* Description */}
            <p className="muted" style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {restaurant.description}
            </p>

            {/* Restaurant Tags/Features */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {restaurant.tags.map(tag => (
                    <span key={tag} className="rc-tag">#{tag}</span>
                ))}
            </div>

            {/* Block Button */}
            {showActions && onBlock && (
                <div className="rc-actions">
                    <button onClick={onBlock} className="rc-block-btn">
                        <Ban size={16} /> 加入避雷
                    </button>
                </div>
            )}
        </div>
    );
};

export default RestaurantCard;
