import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { History as HistoryIcon, Trash2, Clock } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(storage.getHistory());
    }, []);

    const clearHistory = () => {
        if (window.confirm('確定要清除所有歷史紀錄嗎？')) {
            setHistory([]);
            storage.setHistory([]);
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
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.05))',
                borderRadius: '1rem',
                border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        background: 'rgba(139, 92, 246, 0.2)',
                        padding: '0.75rem',
                        borderRadius: '0.5rem'
                    }}>
                        <Clock fill="#a78bfa" color="#a78bfa" size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--color-text-primary)' }}>
                            抽選紀錄
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>
                            最近 <span style={{ fontWeight: '600', color: '#a78bfa' }}>{history.length}</span> 筆紀錄
                        </p>
                    </div>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        style={{
                            background: 'transparent',
                            border: '2px solid rgba(139, 92, 246, 0.2)',
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
                            e.currentTarget.style.borderColor = '#a78bfa';
                            e.currentTarget.style.color = '#a78bfa';
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <Trash2 size={16} /> 全部清除
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    padding: '2rem',
                    background: 'rgba(139, 92, 246, 0.05)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(139, 92, 246, 0.1)'
                }}>
                    <HistoryIcon size={48} style={{ color: 'var(--color-text-secondary)', margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>
                        目前沒有抽選紀錄。
                    </p>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                        開始推薦後會記錄你的選擇！
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {history.map((restaurant, index) => (
                        <div key={`${restaurant.id}-${index}`} className="slide-in-up" style={{ animationDelay: `${index * 50}ms`, position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '1rem',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(167, 139, 250, 0.1))',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '1rem',
                                fontSize: '0.8rem',
                                zIndex: 10,
                                color: '#a78bfa',
                                fontWeight: '600',
                                border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                第 {index + 1} 次
                            </div>
                            <RestaurantCard
                                restaurant={restaurant}
                                showActions={false}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
