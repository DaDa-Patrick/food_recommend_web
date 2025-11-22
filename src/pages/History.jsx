import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import RestaurantCard from '../components/RestaurantCard';
import { History as HistoryIcon, Trash2 } from 'lucide-react';

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
        <div className="container fade-in" style={{ paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HistoryIcon color="var(--color-accent)" /> 抽選紀錄
                </h2>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '3rem' }}>
                    <p>目前沒有抽選紀錄。</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {history.map((restaurant, index) => (
                        <div key={`${restaurant.id}-${index}`} style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '10px',
                                background: 'var(--color-surface-light)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                zIndex: 10,
                                color: 'var(--color-text-secondary)'
                            }}>
                                #{index + 1}
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
