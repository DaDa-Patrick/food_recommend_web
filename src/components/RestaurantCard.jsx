import React from 'react';
import { MapPin, DollarSign, Heart, Ban, Utensils } from 'lucide-react';
import { prices, types, locations } from '../utils/mockData';

const RestaurantCard = ({ restaurant, isFavorite, onToggleFavorite, onBlock, showActions = true }) => {
    if (!restaurant) return null;

    const priceLabel = prices.find(p => p.id === restaurant.price)?.name.split(' ')[0] || restaurant.price;
    const locationLabel = locations.find(l => l.id === restaurant.location)?.name || restaurant.location;
    const typeLabel = types.find(t => t.id === restaurant.type)?.name || restaurant.type;

    return (
        <div className="card fade-in scale-in" style={{ width: '100%', maxWidth: '450px', margin: '0 auto' }}>
            {/* Header with Image placeholder and Favorite button */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                borderRadius: '0.75rem',
                padding: '2rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: '150px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Utensils size={48} color="#818cf8" />
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>美食推薦</span>
                </div>
                {showActions && (
                    <button
                        onClick={onToggleFavorite}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: isFavorite ? 'rgba(244, 114, 182, 0.2)' : 'rgba(99, 102, 241, 0.1)',
                            border: isFavorite ? '2px solid #f472b6' : '2px solid rgba(148, 163, 184, 0.2)',
                            cursor: 'pointer',
                            color: isFavorite ? '#f472b6' : 'var(--color-text-secondary)',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (!isFavorite) {
                                e.currentTarget.style.background = 'rgba(244, 114, 182, 0.15)';
                                e.currentTarget.style.borderColor = '#f472b6';
                                e.currentTarget.style.color = '#f472b6';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isFavorite) {
                                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                e.currentTarget.style.color = 'var(--color-text-secondary)';
                            }
                        }}
                    >
                        <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                )}
            </div>

            {/* Restaurant Name */}
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    color: 'var(--color-text-primary)',
                    background: 'linear-gradient(135deg, #818cf8, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    {restaurant.name}
                </h3>
            </div>

            {/* Tags/Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
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
            <p style={{
                color: 'var(--color-text-secondary)',
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                fontSize: '0.95rem'
            }}>
                {restaurant.description}
            </p>

            {/* Restaurant Tags/Features */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {restaurant.tags.map(tag => (
                    <span key={tag} style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-primary-light)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '0.35rem',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        transition: 'all 0.2s ease'
                    }}>
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Block Button */}
            {showActions && onBlock && (
                <div style={{
                    borderTop: '1px solid rgba(99, 102, 241, 0.1)',
                    paddingTop: '1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onBlock}
                        style={{
                            background: 'transparent',
                            border: '2px solid rgba(99, 102, 241, 0.2)',
                            cursor: 'pointer',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#a78bfa';
                            e.currentTarget.style.color = '#a78bfa';
                            e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                            e.currentTarget.style.background = 'transparent';
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
