import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, User, BookOpen, Settings,
    LogOut, Bell, Search, Briefcase, FileText,
    CheckSquare, Activity, Calendar, Menu, MoreVertical, ChevronLeft, ChevronRight,
    Check, Edit, Zap
} from 'lucide-react';
import Logo from '../components/Logo';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const response = await fetch('http://localhost:3000/careerlens/data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.userdata);
                    localStorage.setItem('user', JSON.stringify(data.userdata));

                    // Redirect if profile is not completed
                    if (data.userdata.status === 'User') {
                        navigate('/path');
                    }
                }
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(storedUser);
            }
        };

        fetchUserData();

        // Animate
        setTimeout(() => {
            const target = 78;
            setProgress(target);
            let start = 0;
            const timer = setInterval(() => {
                start += target / 75;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                setScore(Math.round(start));
            }, 20);
        }, 500);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const SidebarLink = ({ icon: Icon, label, onClick, isActive, badge }) => (
        <a
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300 group ${isActive ? 'bg-[#F2B42D]/20 text-[#F2B42D] border border-[#F2B42D]/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
            <Icon size={20} className={`group-hover:text-[#F2B42D] transition-colors ${isActive ? 'text-[#F2B42D]' : ''}`} />
            <span className="font-medium">{label}</span>
            {badge && (
                <span className="ml-auto bg-[#D7425E] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">{badge}</span>
            )}
        </a>
    );

    return (
        <div className="bg-[#00002E] min-h-screen font-display text-white flex overflow-hidden relative selection:bg-[#F2B42D] selection:text-black">
            {/* MATCHING GRADIENTS FROM RESUME ANALYZER */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F2B42D] rounded-full opacity-20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D7425E] rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            {/* Sidebar with Glass Effect */}
            <aside className="w-64 h-full bg-[#00002E]/80 backdrop-blur-xl border-r border-[#ffffff14] flex-shrink-0 flex flex-col hidden md:flex z-20 shadow-2xl">
                <div className="h-16 flex items-center px-6 border-b border-[#ffffff14]">
                    <Logo />
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    <SidebarLink icon={LayoutDashboard} label="Dashboard" isActive={true} />

                    <div className="pt-4 pb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider opacity-70">Growth</div>

                    <SidebarLink icon={FileText} label="Resume Analyzer" onClick={() => navigate('/resume-analyzer')} />
                    <SidebarLink icon={Briefcase} label="Openings" badge="12" />
                    <SidebarLink icon={Activity} label="Skill Analyzer" onClick={() => navigate('/skill-analysis')} />
                    <SidebarLink icon={BookOpen} label="Profile Guide" onClick={() => navigate('/career-guide')} />

                    <div className="pt-4 pb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider opacity-70">Daily</div>

                    <SidebarLink icon={Calendar} label="Habit Tracker" onClick={() => navigate('/habit-tracker')} />
                    <SidebarLink icon={CheckSquare} label="Tasks" onClick={() => navigate('/tasks')} />
                </nav>
                <div className="p-4 border-t border-[#ffffff14]">
                    <SidebarLink icon={Settings} label="Settings" />
                    <SidebarLink icon={LogOut} label="Logout" onClick={handleLogout} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                {/* Header with Glass Effect */}
                <header className="h-16 flex items-center justify-between px-6 md:px-10 border-b border-[#ffffff14] bg-[#00002E]/60 backdrop-blur-md z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-400 hover:text-white">
                            <Menu />
                        </button>
                        <div className="hidden md:flex flex-col">
                            <h2 className="text-white text-lg font-bold leading-none">Dashboard</h2>
                            <p className="text-xs text-gray-400 mt-1">Welcome back, <span className="font-semibold text-[#F2B42D]">{user.Name?.split(' ')[0] || 'User'}</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block w-64 lg:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Search size={18} />
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2 border border-[#ffffff14] rounded-lg leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#00002E]/60 focus:border-[#F2B42D] focus:ring-1 focus:ring-[#F2B42D] sm:text-sm transition-all"
                                placeholder="Search jobs, skills, or tasks..."
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-[#D7425E] ring-2 ring-[#00002E]"></span>
                            </button>
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#F2B42D] to-[#DD785E] border border-[#ffffff14] flex items-center justify-center text-[#00002E] font-bold cursor-pointer hover:ring-2 hover:ring-[#F2B42D] transition-all overflow-hidden">
                                {user.profilePhoto ? (
                                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    user.Name ? user.Name.charAt(0) : 'U'
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 relative scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto space-y-8 pb-20">
                        {/* Welcome Check-in */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
                            <h1 className="text-3xl font-bold text-white tracking-tight max-w-2xl">
                                Good morning, <span className="bg-gradient-to-r from-[#F2B42D] to-[#DD785E] bg-clip-text text-transparent">{user.Name?.split(' ')[0] || 'User'}</span>.<br />
                                <span className="text-gray-400 font-medium text-xl">Let's make some progress today.</span>
                            </h1>
                        </div>

                        {/* Animated Progress Bar - USES GLASS CARD */}
                        <div className="glass-card p-6 shadow-2xl relative overflow-hidden group">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Readiness Score</h3>
                                    <p className="text-gray-400 text-sm">Based on your activity & skills</p>
                                </div>
                                <span className="text-[#F2B42D] font-bold text-3xl">{score}%</span>
                            </div>
                            <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-[#F2B42D] to-[#DD785E] relative transition-all duration-[1500ms] ease-out flex items-center justify-end pr-2"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Column */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Profile Card - USES GLASS CARD */}
                                <div className="glass-card p-6 relative overflow-hidden group hover:border-[#F2B42D]/30 transition-all">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                        <User size={120} className="text-white" />
                                    </div>
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-[#F2B42D] to-[#DD785E] mb-4 shadow-lg shadow-[#F2B42D]/20 overflow-hidden">
                                            <div className="h-full w-full rounded-full bg-[#00002E] flex items-center justify-center text-3xl font-bold text-white border-2 border-transparent overflow-hidden">
                                                {user.profilePhoto ? (
                                                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    user.Name ? user.Name.charAt(0) : 'U'
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{user.Name || 'Guest User'}</h3>
                                        <p className="text-gray-400 text-sm mb-4">Target: {user.targetRole || user.status || 'Career Explorer'}</p>
                                        <span className="px-3 py-1 rounded-full bg-[#59ABA9]/10 text-[#59ABA9] text-xs font-bold border border-[#59ABA9]/30">
                                            Status: Active Learner
                                        </span>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-[#ffffff14] grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-white">12</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Interviews</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">45</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Applications</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Card - USES GLASS CARD */}
                                <div className="glass-card p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-white">Skill Gap Analysis</h3>
                                        <button className="text-xs text-[#F2B42D] hover:text-white transition-colors font-semibold">View Details</button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mb-6">
                                        <div className="relative h-40 w-40 flex items-center justify-center">
                                            <div className="w-full h-full rounded-full border-[10px] border-white/5 flex items-center justify-center relative">
                                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[10px] border-[#F2B42D] border-t-transparent border-l-transparent rotate-45 shadow-[0_0_15px_rgba(242,180,45,0.3)]"></div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl font-bold text-white">78%</span>
                                                    <span className="text-xs text-gray-400">Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Technical Assessment', val: 92, col: 'bg-[#48A8E2]' },
                                            { label: 'Aptitude Test', val: 85, col: 'bg-[#D7425E]' },
                                            { label: 'Communication Scan', val: 64, col: 'bg-[#DD785E]' }
                                        ].map((skill, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-300">{skill.label}</span>
                                                    <span className="text-white font-medium">{skill.val}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full ${skill.col} rounded-full shadow-[0_0_10px_${skill.col.replace('bg-', '')}]`} style={{ width: `${skill.val}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-8 space-y-6">
                                {/* Tasks - USES GLASS CARD */}
                                <div className="glass-card overflow-hidden">
                                    <div className="p-6 border-b border-[#ffffff14] flex justify-between items-center">
                                        <h3 className="font-bold text-white">Priority Tasks</h3>
                                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full text-left text-sm text-gray-400">
                                            <thead className="bg-white/5 text-xs uppercase font-semibold text-gray-300">
                                                <tr>
                                                    <th className="px-6 py-4">Task Name</th>
                                                    <th className="px-6 py-4">Category</th>
                                                    <th className="px-6 py-4">Due Date</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#ffffff14]">
                                                {[
                                                    { name: 'Update Portfolio Case Study', cat: 'Profile', date: 'Today', status: 'In Progress', statusCol: 'text-[#F2B42D] bg-[#F2B42D]/10 border-[#F2B42D]/20', dot: 'bg-[#D7425E]' },
                                                    { name: 'Complete Python Assessment', cat: 'Skills', date: 'Tomorrow', status: 'Pending', statusCol: 'text-gray-300 bg-white/10 border-white/10', dot: 'bg-[#48A8E2]' },
                                                    { name: 'Reach out to 5 Recruiters', cat: 'Networking', date: 'Oct 24', status: 'Done', statusCol: 'text-[#59ABA9] bg-[#59ABA9]/10 border-[#59ABA9]/20', dot: 'bg-[#59ABA9]' },
                                                ].map((task, i) => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                                            <div className={`h-2 w-2 rounded-full ${task.dot} shadow-[0_0_6px_rgba(255,255,255,0.4)]`}></div>
                                                            <span className="group-hover:text-[#F2B42D] transition-colors">{task.name}</span>
                                                        </td>
                                                        <td className="px-6 py-4">{task.cat}</td>
                                                        <td className="px-6 py-4 text-[#D7425E]">{task.date}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${task.statusCol}`}>{task.status}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="text-gray-400 hover:text-white"><MoreVertical size={16} /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Habits - USES GLASS CARD */}
                                <div className="glass-card p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                        <div>
                                            <h3 className="font-bold text-white">Daily Habits</h3>
                                            <p className="text-sm text-gray-400">Current Streak: <span className="text-[#F2B42D] font-bold drop-shadow-[0_0_5px_rgba(242,180,45,0.4)]">14 Days</span> 🔥</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-1 text-gray-400 hover:text-white"><ChevronLeft size={20} /></button>
                                            <button className="p-1 text-gray-400 hover:text-white"><ChevronRight size={20} /></button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {['Mon', 'Tue', 'Wed'].map((day, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                <span className="text-xs text-gray-500 uppercase">{day}</span>
                                                <div className="h-10 w-10 rounded-lg bg-[#59ABA9]/10 border border-[#59ABA9]/30 flex items-center justify-center text-[#59ABA9]">
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs text-gray-500 uppercase">Thu</span>
                                            <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                                                <span className="text-xs font-bold">-</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs text-[#F2B42D] font-bold uppercase">Today</span>
                                            <div className="h-10 w-10 rounded-lg bg-[#F2B42D] text-black shadow-[0_0_15px_rgba(242,180,45,0.4)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                                                <Edit size={16} strokeWidth={3} />
                                            </div>
                                        </div>
                                        {['Sat', 'Sun'].map((day, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 opacity-40">
                                                <span className="text-xs text-gray-500 uppercase">{day}</span>
                                                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Widget */}
                <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end group">
                    <div className="mb-4 glass-card p-4 rounded-2xl rounded-tr-none shadow-[0_0_20px_rgba(242,180,45,0.15)] w-72 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#00002E]/90">
                        <p className="text-sm text-white font-medium mb-2">👋 Hi {user.Name?.split(' ')[0] || 'there'}!</p>
                        <p className="text-sm text-gray-400">I noticed you haven't completed your daily mock interview. Need help preparing?</p>
                        <div className="mt-3 flex gap-2">
                            <button className="flex-1 bg-white/10 hover:bg-white/20 text-xs text-white py-2 rounded-lg transition-colors border border-white/5">Not now</button>
                            <button className="flex-1 bg-[#F2B42D] hover:bg-[#D99E1F] text-xs text-black font-bold py-2 rounded-lg transition-colors shadow-lg shadow-[#F2B42D]/20">Let's start</button>
                        </div>
                    </div>
                    <div className="h-14 w-14 rounded-full bg-[#F2B42D] text-black shadow-[0_0_20px_rgba(242,180,45,0.5)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all relative border-2 border-[#D99E1F]">
                        <Zap size={24} fill="currentColor" />
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DD785E] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#DD785E] border-2 border-[#00002E]"></span>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
