import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, prices, types } from '../utils/mockData';
import { storage } from '../utils/storage';
import { ChevronRight, Check } from 'lucide-react';

const Preferences = () => {
    const navigate = useNavigate();
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        // Load saved preferences if any
        const saved = storage.getPreferences();
        if (saved) {
            setSelectedTypes(saved.types || []);
            setSelectedPrice(saved.price || '');
            setSelectedLocation(saved.location || '');
        }
    }, []);

    const toggleType = (id) => {
        setSelectedTypes(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleStart = () => {
        if (selectedTypes.length === 0 || !selectedPrice || !selectedLocation) {
            alert('請選擇所有條件！'); // Simple alert for now, can be improved
            return;
        }

        // Save preferences
        storage.setPreferences({
            types: selectedTypes,
            price: selectedPrice,
            location: selectedLocation
        });

        // Navigate to result with state
        navigate('/result', {
            state: {
                criteria: {
                    types: selectedTypes,
                    price: selectedPrice,
                    location: selectedLocation
                }
            }
        });
    };

    const SelectionSection = ({ title, children, completed }) => (
        <div style={{
            marginBottom: '2.5rem',
            padding: '1.5rem',
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: '1rem',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: completed ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    flex: 1
                }}>
                    {title}
                </h3>
                {completed && <Check size={20} color="#818cf8" />}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {children}
            </div>
        </div>
    );

    const Chip = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                border: selected ? '2px solid var(--color-primary)' : '2px solid rgba(148, 163, 184, 0.2)',
                background: selected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: selected ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                fontWeight: selected ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                boxShadow: selected ? 'var(--shadow-glow)' : 'none'
            }}
            onMouseEnter={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                }
            }}
            onMouseLeave={(e) => {
                if (!selected) {
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.currentTarget.style.background = 'transparent';
                }
            }}
        >
            {label}
        </button>
    );

    const isComplete = selectedTypes.length > 0 && selectedPrice && selectedLocation;

    return (
        <div className="container fade-in" style={{ paddingBottom: '120px' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #818cf8, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    想吃點什麼？
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                    告訴我們你的偏好，我們來幫你決定
                </p>
            </div>

            <SelectionSection title="1. 飲食偏好 (可多選)" completed={selectedTypes.length > 0}>
                {types.map(t => (
                    <Chip
                        key={t.id}
                        label={t.name}
                        selected={selectedTypes.includes(t.id)}
                        onClick={() => toggleType(t.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection title="2. 價位範圍" completed={!!selectedPrice}>
                {prices.map(p => (
                    <Chip
                        key={p.id}
                        label={p.name}
                        selected={selectedPrice === p.id}
                        onClick={() => setSelectedPrice(p.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection title="3. 地區" completed={!!selectedLocation}>
                {locations.map(l => (
                    <Chip
                        key={l.id}
                        label={l.name}
                        selected={selectedLocation === l.id}
                        onClick={() => setSelectedLocation(l.id)}
                    />
                ))}
            </SelectionSection>

            <button
                className="btn btn-primary"
                style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    fontSize: '1.1rem',
                    opacity: isComplete ? 1 : 0.6,
                    cursor: isComplete ? 'pointer' : 'not-allowed'
                }}
                onClick={handleStart}
                disabled={!isComplete}
            >
                開始推薦 <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Preferences;
