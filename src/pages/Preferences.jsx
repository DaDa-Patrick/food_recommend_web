import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, prices, types } from '../utils/mockData';
import { storage } from '../utils/storage';
import { ChevronRight, Check, CheckCheck } from 'lucide-react';

const Preferences = () => {
    const navigate = useNavigate();
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        // Load saved preferences if any
        const saved = storage.getPreferences();
        if (saved) {
            setSelectedTypes(saved.types || []);
            // Handle backward compatibility (old format was single value)
            setSelectedPrices(Array.isArray(saved.prices) ? saved.prices : (saved.price ? [saved.price] : []));
            setSelectedLocations(Array.isArray(saved.locations) ? saved.locations : (saved.location ? [saved.location] : []));
        }
    }, []);

    const toggleItem = (list, setList, id) => {
        setList(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const toggleAll = (list, setList, allItems) => {
        const allIds = allItems.map(item => item.id);
        if (list.length === allIds.length) {
            // All selected, so deselect all
            setList([]);
        } else {
            // Select all
            setList(allIds);
        }
    };

    const handleStart = () => {
        if (selectedTypes.length === 0 || selectedPrices.length === 0 || selectedLocations.length === 0) {
            alert('請在每個類別中至少選擇一項！');
            return;
        }

        // Save preferences
        storage.setPreferences({
            types: selectedTypes,
            prices: selectedPrices,
            locations: selectedLocations
        });

        // Navigate to result with state
        navigate('/result', {
            state: {
                criteria: {
                    types: selectedTypes,
                    prices: selectedPrices,
                    locations: selectedLocations
                }
            }
        });
    };

    const SelectionSection = ({ title, children, completed, onSelectAll, isAllSelected }) => (
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
                {/* Select All Button */}
                <button
                    onClick={onSelectAll}
                    style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '2rem',
                        border: isAllSelected ? '2px solid #10b981' : '2px dashed rgba(148, 163, 184, 0.4)',
                        background: isAllSelected ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                        color: isAllSelected ? '#10b981' : 'var(--color-text-secondary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}
                >
                    <CheckCheck size={16} />
                    全選
                </button>
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

    const isComplete = selectedTypes.length > 0 && selectedPrices.length > 0 && selectedLocations.length > 0;

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

            <SelectionSection
                title="1. 飲食偏好 (可多選)"
                completed={selectedTypes.length > 0}
                onSelectAll={() => toggleAll(selectedTypes, setSelectedTypes, types)}
                isAllSelected={selectedTypes.length === types.length}
            >
                {types.map(t => (
                    <Chip
                        key={t.id}
                        label={t.name}
                        selected={selectedTypes.includes(t.id)}
                        onClick={() => toggleItem(selectedTypes, setSelectedTypes, t.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection
                title="2. 價位範圍 (可多選)"
                completed={selectedPrices.length > 0}
                onSelectAll={() => toggleAll(selectedPrices, setSelectedPrices, prices)}
                isAllSelected={selectedPrices.length === prices.length}
            >
                {prices.map(p => (
                    <Chip
                        key={p.id}
                        label={p.name}
                        selected={selectedPrices.includes(p.id)}
                        onClick={() => toggleItem(selectedPrices, setSelectedPrices, p.id)}
                    />
                ))}
            </SelectionSection>

            <SelectionSection
                title="3. 地區 (可多選)"
                completed={selectedLocations.length > 0}
                onSelectAll={() => toggleAll(selectedLocations, setSelectedLocations, locations)}
                isAllSelected={selectedLocations.length === locations.length}
            >
                {locations.map(l => (
                    <Chip
                        key={l.id}
                        label={l.name}
                        selected={selectedLocations.includes(l.id)}
                        onClick={() => toggleItem(selectedLocations, setSelectedLocations, l.id)}
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
