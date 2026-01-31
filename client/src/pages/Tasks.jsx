import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Plus, Trash2, Check,
    MoreVertical, Filter, ClipboardList,
    AlertCircle, Clock, CheckCircle2,
    Calendar as CalendarIcon
} from 'lucide-react';

const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('myTasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState('all');
    const [showAddPanel, setShowAddPanel] = useState(false);

    // New Task Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'Academics',
        priority: 'Medium',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (tasks.length === 0) {
            initializePersonalizedTasks();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }, [tasks]);

    const initializePersonalizedTasks = () => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const role = userProfile.identity?.role?.toLowerCase() || 'student';

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 3);

        let initialTasks = [];
        if (role.includes('student') || role.includes('learning')) {
            initialTasks = [
                { id: 1, title: 'Complete Mathematics-II Assignment', category: 'Academics', date: tomorrow.toISOString().split('T')[0], priority: 'High', status: 'pending' },
                { id: 2, title: 'Revise Data Structures notes', category: 'Skills', date: today.toISOString().split('T')[0], priority: 'Medium', status: 'in-progress' },
                { id: 3, title: 'Update Resume with new project', category: 'Placement', date: dayAfter.toISOString().split('T')[0], priority: 'High', status: 'pending' }
            ];
        } else {
            initialTasks = [
                { id: 1, title: 'Research new market trends', category: 'Work', date: tomorrow.toISOString().split('T')[0], priority: 'High', status: 'pending' },
                { id: 2, title: 'Complete System Design course', category: 'Skills', date: today.toISOString().split('T')[0], priority: 'Medium', status: 'in-progress' },
                { id: 3, title: 'Networking call with mentor', category: 'Personal', date: dayAfter.toISOString().split('T')[0], priority: 'Medium', status: 'pending' }
            ];
        }
        setTasks(initialTasks);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const newTask = {
            id: Date.now(),
            ...formData,
            status: 'pending'
        };

        setTasks([newTask, ...tasks]);
        setFormData({ ...formData, title: '' });
        setShowAddPanel(false);
    };

    const toggleStatus = (id) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
                return { ...task, status: nextStatus };
            }
            return task;
        }));
    };

    const deleteTask = (id) => {
        if (window.confirm('Delete this task?')) {
            setTasks(prev => prev.filter(t => t.id !== id));
        }
    };

    const filteredTasks = tasks.filter(t =>
        filter === 'all' ? true : t.status === filter
    );

    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const totalCount = tasks.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Medium': return 'bg-[#F2B42D]/10 text-[#F2B42D] border-[#F2B42D]/20';
            case 'Low': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="bg-[#00002E] min-h-screen font-display text-white relative overflow-x-hidden p-6 md:p-10 flex flex-col items-center selection:bg-[#F2B42D] selection:text-black">
            {/* MATCHING GRADIENTS FROM DASHBOARD */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F2B42D] rounded-full opacity-10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D7425E] rounded-full opacity-10 blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-5xl relative z-10 space-y-8 pb-20">
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
                        <h1 className="text-4xl font-black tracking-tight text-white">Tasks</h1>
                        <p className="text-gray-400 font-medium">Your personalized action plan for progress.</p>
                    </div>

                    {/* Completion Pill */}
                    <div className="bg-[#00002E]/80 backdrop-blur-xl border border-[#ffffff14] px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Completion</span>
                            <span className="text-[#F2B42D] font-black text-xl">{completedCount}/{totalCount}</span>
                        </div>
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    className="text-[#F2B42D] transition-all duration-1000 ease-out"
                                    strokeDasharray="125.6"
                                    strokeDashoffset={125.6 - (125.6 * progress) / 100}
                                />
                            </svg>
                            <span className="absolute text-[10px] font-black text-white">{progress}%</span>
                        </div>
                    </div>
                </div>

                {/* Filters & Add Button */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="bg-[#00002E]/60 backdrop-blur-xl border border-[#ffffff14] p-1.5 rounded-xl flex overflow-x-auto no-scrollbar gap-1 flex-1 shadow-lg">
                        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filter === status
                                        ? 'bg-[#F2B42D] text-[#00002E] shadow-lg shadow-[#F2B42D]/20'
                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {status.replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAddPanel(!showAddPanel)}
                        className="bg-[#F2B42D] hover:bg-[#D99E1F] text-[#00002E] font-black px-8 py-3 rounded-xl shadow-xl shadow-[#F2B42D]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
                    >
                        <Plus size={20} />
                        Add New Task
                    </button>
                </div>

                {/* Add Task Panel */}
                {showAddPanel && (
                    <div className="bg-[#00002E]/80 backdrop-blur-xl border border-[#ffffff14] rounded-2xl p-8 shadow-2xl border-l-[6px] border-l-[#F2B42D] animate-in slide-in-from-top-4 duration-300">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Create New Task</h3>
                        <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-4 space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Task Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl px-4 py-3 text-white outline-none focus:border-[#F2B42D] transition-all"
                                    placeholder="e.g. Finish Python module"
                                />
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl px-4 py-3 text-white outline-none appearance-none cursor-pointer"
                                >
                                    {['Academics', 'Skills', 'Placement', 'Work', 'Personal'].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl px-4 py-3 text-white outline-none appearance-none cursor-pointer"
                                >
                                    {['High', 'Medium', 'Low'].map(prio => (
                                        <option key={prio} value={prio}>{prio}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Due Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-black/40 border border-[#ffffff14] rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
                                />
                            </div>
                            <div className="md:col-span-12 flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddPanel(false)} className="px-6 py-2 text-gray-500 font-bold hover:text-white transition-all text-sm">Cancel</button>
                                <button type="submit" className="bg-[#F2B42D]/10 hover:bg-[#F2B42D]/20 text-[#F2B42D] border border-[#F2B42D]/30 font-black px-8 py-2 rounded-xl transition-all text-sm">Save Task</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tasks List */}
                <div className="bg-[#00002E]/60 backdrop-blur-xl border border-[#ffffff14] rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black border-b border-[#ffffff14]">
                                <tr>
                                    <th className="px-8 py-5 w-16 text-center">Done?</th>
                                    <th className="px-8 py-5">Task Name</th>
                                    <th className="px-8 py-5 hidden md:table-cell">Category</th>
                                    <th className="px-8 py-5 hidden sm:table-cell">Due Date</th>
                                    <th className="px-8 py-5">Priority</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#ffffff14]">
                                {filteredTasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                                                    <ClipboardList size={32} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-white font-bold text-lg">All caught up!</h3>
                                                    <p className="text-gray-500 text-sm">No tasks found matching your filters.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTasks.map((task) => {
                                        const isDone = task.status === 'completed';
                                        const dateLabel = new Date(task.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

                                        return (
                                            <tr key={task.id} className="group hover:bg-white/[0.02] transition-colors relative">
                                                <td className="px-8 py-5 relative z-10">
                                                    <div
                                                        onClick={() => toggleStatus(task.id)}
                                                        className={`w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all duration-300 mx-auto ${isDone
                                                                ? 'bg-[#F2B42D] border-[#F2B42D] shadow-[0_0_10px_rgba(242,180,45,0.4)]'
                                                                : 'bg-black/20 border-gray-600 hover:border-[#F2B42D]'
                                                            }`}
                                                    >
                                                        <Check size={14} className={`text-[#00002E] font-black transition-all ${isDone ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`font-bold block transition-all ${isDone ? 'line-through text-gray-600 opacity-60' : 'text-white'}`}>
                                                        {task.title}
                                                    </span>
                                                    <span className="md:hidden text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1.5 block">
                                                        {task.category} • {dateLabel}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 hidden md:table-cell">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-[#ffffff14]">
                                                        {task.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 hidden sm:table-cell">
                                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                                                        <CalendarIcon size={14} className="text-gray-600" />
                                                        {dateLabel}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded border ${getPriorityStyles(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button
                                                        onClick={() => deleteTask(task.id)}
                                                        className="text-gray-600 hover:text-[#D7425E] transition-colors p-2 opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
