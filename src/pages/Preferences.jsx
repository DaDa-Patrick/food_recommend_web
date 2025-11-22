import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, prices, types } from '../utils/mockData';
import { storage } from '../utils/storage';
import { ChevronRight } from 'lucide-react';

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

    const SelectionSection = ({ title, children }) => (
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>{title}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {children}
            </div>
        </div>
    );

    const Chip = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                border: selected ? '2px solid var(--color-primary)' : '2px solid var(--color-surface-light)',
                background: selected ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: selected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: selected ? '600' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem'
            }}
        >
            {label}
        </button>
    );

    return (
        <div className="container fade-in" style={{ paddingBottom: '100px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' }}>
                想吃點什麼？
            </h2>

            <SelectionSection title="1. 飲食偏好 (可多選)">
                {types.map(t => (
                    <Chip
                        key={t.id}
                        label={t.name}
                        selected={selectedTypes.includes(t.id)}
                        onClick={() => toggleType(t.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection title="2. 價位範圍">
                {prices.map(p => (
                    <Chip
                        key={p.id}
                        label={p.name}
                        selected={selectedPrice === p.id}
                        onClick={() => setSelectedPrice(p.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection title="3. 地區">
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
                style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}
                onClick={handleStart}
            >
                開始推薦 <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Preferences;
