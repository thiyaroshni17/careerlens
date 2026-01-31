import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Plus, Trash2, Check,
    Calendar, Flame, Activity
} from 'lucide-react';

const HabitTracker = () => {
    const navigate = useNavigate();
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('myHabits');
        return saved ? JSON.parse(saved) : [];
    });
    const [habitName, setHabitName] = useState('');
    const [frequency, setFrequency] = useState('daily');

    useEffect(() => {
        checkAndResetHabits();
    }, []);

    useEffect(() => {
        localStorage.setItem('myHabits', JSON.stringify(habits));
    }, [habits]);

    const checkAndResetHabits = () => {
        const today = new Date().toDateString();
        const lastCheck = localStorage.getItem('lastHabitCheck');

        if (lastCheck !== today) {
            setHabits(prev => prev.map(habit =>
                habit.freq === 'daily' ? { ...habit, completed: false } : habit
            ));
            localStorage.setItem('lastHabitCheck', today);
        }
    };

    const addHabit = (e) => {
        e.preventDefault();
        if (!habitName.trim()) return;

        const newHabit = {
            id: Date.now(),
            name: habitName,
            freq: frequency,
            completed: false,
            streak: 0
        };

        setHabits([...habits, newHabit]);
        setHabitName('');
    };

    const toggleHabit = (id) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id === id) {
                const completed = !habit.completed;
                return {
                    ...habit,
                    completed,
                    streak: completed ? habit.streak + 1 : Math.max(0, habit.streak - 1)
                };
            }
            return habit;
        }));
    };

    const deleteHabit = (id) => {
        if (window.confirm('Delete this habit?')) {
            setHabits(prev => prev.filter(h => h.id !== id));
        }
    };

    const completedCount = habits.filter(h => h.completed).length;
    const progress = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

    return (
        <div className="bg-[#00002E] min-h-screen font-display text-white relative overflow-x-hidden p-6 md:p-10 flex flex-col items-center selection:bg-[#F2B42D] selection:text-black">
            {/* MATCHING GRADIENTS FROM DASHBOARD */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F2B42D] rounded-full opacity-20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D7425E] rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-4xl relative z-10 space-y-8 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-sm font-medium text-gray-400 hover:text-[#F2B42D] transition-all flex items-center gap-2 group"
                        >
                            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-sm">Habit Tracker</h1>
                        <p className="text-gray-400 italic font-medium">Build consistency, master your routine.</p>
                    </div>
                </div>

                {/* Weekly Momentum Card */}
                <div className="bg-[#00002E]/80 backdrop-blur-xl border border-[#ffffff14] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Calendar size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-4">
                            <p className="text-white text-xs font-black leading-normal uppercase tracking-[0.2em] opacity-70">Weekly Momentum</p>
                            <p className="text-[#F2B42D] text-4xl font-black leading-normal drop-shadow-[0_0_15px_rgba(242,179,44,0.3)]">{progress}%</p>
                        </div>
                        <div className="rounded-full bg-white/5 h-4 overflow-hidden shadow-inner border border-[#ffffff14]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#F2B42D] to-[#DD785E] transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Habit Input Form */}
                <div className="bg-[#00002E]/60 backdrop-blur-xl border border-[#ffffff14] rounded-3xl p-8 shadow-2xl space-y-8 animate-fade-in transition-all">
                    <div className="p-6 bg-white/5 rounded-2xl border border-[#ffffff14]">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Initialize New Habit</h2>
                        <form onSubmit={addHabit} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={habitName}
                                    onChange={(e) => setHabitName(e.target.value)}
                                    placeholder="E.g., Read technical docs, 5km Run, Meditation..."
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl p-4 text-white placeholder-gray-600 focus:border-[#F2B42D] focus:ring-1 focus:ring-[#F2B42D] transition-all outline-none"
                                />
                            </div>
                            <div className="w-full md:w-48 relative">
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl p-4 text-white focus:border-[#F2B42D] focus:ring-1 focus:ring-[#F2B42D] transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#F2B42D] hover:bg-[#D99E1F] text-[#00002E] font-black py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(242,180,45,0.3)] flex items-center justify-center gap-2"
                            >
                                <Plus size={20} />
                                Deploy Habit
                            </button>
                        </form>
                    </div>

                    {/* Habits List */}
                    <div className="space-y-4">
                        {habits.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-[#ffffff14] rounded-3xl group hover:border-[#F2B42D]/20 transition-all">
                                <Activity className="mx-auto text-gray-700 mb-4 group-hover:text-[#F2B42D]/40 transition-all" size={64} />
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No active habits. Time to grow!</p>
                            </div>
                        ) : (
                            habits.map((habit) => (
                                <div
                                    key={habit.id}
                                    className={`p-6 flex items-center gap-6 bg-[#00002E]/40 border border-[#ffffff14] rounded-2xl transition-all duration-300 hover:border-[#F2B42D]/30 group relative overflow-hidden`}
                                >
                                    {/* Selection Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2B42D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                    {/* Custom Checkbox */}
                                    <div
                                        onClick={() => toggleHabit(habit.id)}
                                        className={`w-9 h-9 rounded-xl border-2 cursor-pointer flex items-center justify-center transition-all duration-500 z-10 shrink-0 ${habit.completed
                                                ? 'bg-[#F2B42D] border-[#F2B42D] shadow-[0_0_15px_rgba(242,180,45,0.4)]'
                                                : 'bg-black/40 border-gray-600 hover:border-[#F2B42D]'
                                            }`}
                                    >
                                        <Check size={22} className={`text-[#00002E] font-black transition-all ${habit.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                                    </div>

                                    <div className="flex-1 min-w-0 z-10">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="space-y-1">
                                                <h3 className={`font-black text-xl transition-all truncate ${habit.completed ? 'line-through text-gray-500 opacity-60' : 'text-white'}`}>
                                                    {habit.name}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-[#F2B42D] uppercase tracking-[0.2em] bg-[#F2B42D]/10 px-2 py-0.5 rounded border border-[#F2B42D]/20">
                                                        {habit.freq}
                                                    </span>
                                                    <span className="text-[10px] font-black text-[#D7425E] uppercase tracking-[0.2em] bg-[#D7425E]/10 px-2 py-0.5 rounded border border-[#D7425E]/20 flex items-center gap-1.5">
                                                        <Flame size={12} className="fill-[#D7425E]" />
                                                        {habit.streak} Day Streak
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteHabit(habit.id)}
                                                className="text-gray-600 hover:text-[#D7425E] transition-colors p-2 shrink-0 group-hover:opacity-100 opacity-0 md:opacity-0"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>

                                        {/* Mini Progress Bar */}
                                        <div className="rounded-full bg-black/40 h-2 overflow-hidden w-full shadow-inner border border-white/5">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-[#F2B42D] to-[#DD785E] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                                style={{ width: habit.completed ? '100%' : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitTracker;
