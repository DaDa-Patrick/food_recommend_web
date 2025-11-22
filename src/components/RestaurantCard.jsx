import React from 'react';
import { MapPin, DollarSign, Heart, Ban } from 'lucide-react';
import { prices, types, locations } from '../utils/mockData';

const RestaurantCard = ({ restaurant, isFavorite, onToggleFavorite, onBlock, showActions = true }) => {
    if (!restaurant) return null;

    const priceLabel = prices.find(p => p.id === restaurant.price)?.name.split(' ')[0] || restaurant.price;
    const locationLabel = locations.find(l => l.id === restaurant.location)?.name || restaurant.location;
    const typeLabel = types.find(t => t.id === restaurant.type)?.name || restaurant.type;

    return (
        <div className="card fade-in" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {restaurant.name}
                    </h3>
                    {showActions && (
                        <button
                            onClick={onToggleFavorite}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isFavorite ? 'var(--color-secondary)' : 'var(--color-text-secondary)'
                            }}
                        >
                            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>
                        {typeLabel}
                    </span>
                    <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }}>
                        {priceLabel}
                    </span>
                    <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} /> {locationLabel}
                    </span>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {restaurant.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {restaurant.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', background: 'var(--color-surface)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {showActions && onBlock && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onBlock}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Ban size={16} /> 加入避雷
                    </button>
                </div>
            )}
        </div>
    );
};

export default RestaurantCard;
