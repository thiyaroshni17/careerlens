import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Compass, ArrowLeft, LayoutDashboard, AlertCircle, Loader2, FileText, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import BackgroundShapes from '../components/BackgroundShapes';

const HubStyles = () => (
    <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
        }
        .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
    `}</style>
);

const CareerGuide = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [hubStatus, setHubStatus] = useState(null);
    const [activeModule, setActiveModule] = useState(null); // 'career', 'skill', 'social', 'resume'

    const fetchStatus = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        if (!user._id) {
            setError("Session expired. Please login again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/careerlens/analysis/get-status?userID=${user._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setHubStatus(data);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleGenerate = async (moduleType) => {
        setGenerating(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/careerlens/analysis/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userID: user._id, module: moduleType })
            });

            const data = await response.json();
            if (data.success) {
                await fetchStatus();
                setActiveModule(moduleType);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setGenerating(false);
        }
    };

    const modules = [
        {
            id: 'career',
            title: 'Career Analysis',
            desc: 'AI-driven trajectory based on your profile details.',
            icon: Sparkles,
            color: '#F2B42D',
            status: hubStatus?.status?.career,
            hasContent: !!hubStatus?.data?.career
        },
        {
            id: 'skill',
            title: 'Skill Analysis',
            desc: 'Extracted from your Skill Analyzer assessments.',
            icon: Brain,
            color: '#48A8E2',
            status: hubStatus?.status?.skill,
            hasContent: !!hubStatus?.data?.skill,
            link: '/skill-analysis'
        },
        {
            id: 'social',
            title: 'Social Presence',
            desc: 'GitHub & LinkedIn branding strategy.',
            icon: Linkedin,
            color: '#D7425E',
            status: hubStatus?.status?.social,
            hasContent: !!hubStatus?.data?.social
        },
        {
            id: 'resume',
            title: 'Resume Insights',
            desc: 'ATS score and feedback from your latest upload.',
            icon: FileText,
            color: '#59ABA9',
            status: hubStatus?.status?.resume,
            hasContent: !!hubStatus?.data?.resume,
            link: '/resume-analyzer'
        }
    ];

    const renderReport = () => {
        if (activeModule === 'skill') {
            const data = hubStatus?.data?.skill;
            return (
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white">Skill Insight Report</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-xs text-gray-400 font-bold uppercase">Overall Score</p>
                            <p className="text-2xl font-black text-[#48A8E2]">{data.overallScore}%</p>
                        </div>
                        <div className="col-span-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-xs text-gray-400 font-bold uppercase">Target Role</p>
                            <p className="text-lg font-black text-white">{data.targetRole}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#F2B42D]">Key Strengths</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            );
        }

        if (activeModule === 'resume') {
            const data = hubStatus?.data?.resume;
            return (
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white">Resume Analysis Report</h2>
                    <div className="flex items-center gap-6">
                        <div className="size-24 rounded-3xl border-4 border-[#59ABA9]/50 flex items-center justify-center bg-[#59ABA9]/10">
                            <span className="text-3xl font-black text-white">{data.score}</span>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">ATS Compatibility: <span className="text-[#59ABA9] font-black">{data.ats_compatibility}</span></p>
                            <p className="text-white text-sm mt-2 leading-relaxed max-w-lg">{data.summary}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-[#D7425E] mb-4">Key Issues</h3>
                            <ul className="space-y-2">
                                {data.key_issues.map((s, i) => <li key={i} className="flex gap-2 text-sm text-gray-300"><AlertCircle size={16} className="text-[#D7425E] shrink-0" /> {s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#59ABA9] mb-4">Missing Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.missing_keywords.map((s, i) => <span key={i} className="px-3 py-1 bg-[#59ABA9]/10 border border-[#59ABA9]/20 rounded-full text-xs font-bold text-[#59ABA9]">{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const html = activeModule === 'social' ? hubStatus?.data?.social?.html : hubStatus?.data?.career?.html;
        return <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: html }} />;
    };

    if (loading) return (
        <div className="bg-[#00002E] min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-[#F2B42D]" size={64} />
        </div>
    );

    return (
        <div className="bg-[#00002E] font-display text-white min-h-screen relative overflow-x-hidden selection:bg-[#F2B42D]/30">
            <HubStyles />
            <BackgroundShapes />

            <div className="relative z-10 flex h-full flex-col">
                <header className="flex items-center justify-between border-b border-white/5 px-6 md:px-20 py-6 sticky top-0 z-50 bg-[#00002E]/80 backdrop-blur-md">
                    <Logo />
                    <button onClick={() => navigate('/dashboard')} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                </header>

                <main className="relative flex flex-1 flex-col items-center px-6 py-12 pb-32">
                    <div className="max-w-6xl w-full">
                        <div className="mb-2 w-full flex flex-col items-center relative z-20">
                            <h1 className="text-5xl md:text-6xl font-black mb-4 text-center">Career Intelligence Hub</h1>
                            <p className="text-gray-400 max-w-2xl font-medium text-center">Your 360° professional analysis. Click a module to explore your trajectory, skills, and market visibility.</p>
                        </div>

                        {/* Circular Orbit Hub */}
                        <div className="relative w-full max-w-7xl mx-auto min-h-[600px] flex items-center justify-center py-20 my-12">

                            {/* Central Neural Node (Darker/Higher Contrast) */}
                            <div className="relative size-64 md:size-80 flex items-center justify-center z-10 scale-90 md:scale-100">
                                <div className="absolute size-[500px] bg-[#48A8E2]/20 rounded-full blur-[120px] animate-pulse"></div>
                                <div className="absolute size-[400px] bg-[#D7425E]/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                                <div className="absolute size-[350px] bg-[#F2B42D]/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>

                                <div className="relative size-full flex items-center justify-center">
                                    <div className="absolute inset-0 border-[4px] border-transparent border-t-[#48A8E2] rounded-full animate-spin duration-[10s] linear infinite opacity-40"></div>
                                    <div className="absolute inset-6 border-[3px] border-transparent border-b-[#D7425E] rounded-full animate-spin duration-[15s] linear infinite reverse opacity-40"></div>
                                    <div className="absolute inset-12 border-[3px] border-transparent border-l-[#F2B42D] rounded-full animate-spin duration-[7s] linear infinite opacity-40"></div>

                                    <div className="size-40 rounded-full bg-[#00001A] border-2 border-white/20 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.1)] relative z-20 group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                                        <Sparkles className="relative z-10 text-white group-hover:scale-125 transition-transform duration-500 animate-pulse" size={64} />
                                        <div className="absolute inset-0 rounded-full bg-[#F2B42D]/10 animate-ping opacity-30"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Orbiting Modules (Precision Bottom Semi-Circle Arc) */}
                            <div className="absolute inset-x-0 bottom-0 top-[10%] z-20 pointer-events-none">
                                {modules.map((mod, i) => {
                                    // Calculate slots for a balanced bottom-heavy arc
                                    // Social (L), Skill (LC), Career (RC), Resume (R)
                                    const slotOrder = ['social', 'skill', 'career', 'resume'];
                                    const index = slotOrder.indexOf(mod.id);

                                    const positions = [
                                        "left-[2%] top-[40%]",   // Social (Outer Left)
                                        "left-[23%] top-[72%]",  // Skill (Inner Left)
                                        "right-[23%] top-[72%]", // Career (Inner Right)
                                        "right-[2%] top-[40%]",  // Resume (Outer Right)
                                    ];

                                    return (
                                        <div
                                            key={mod.id}
                                            onClick={() => mod.hasContent ? setActiveModule(mod.id) : (mod.link ? navigate(mod.link) : handleGenerate(mod.id))}
                                            className={`absolute pointer-events-auto group bg-[#00002E]/95 border backdrop-blur-3xl p-6 rounded-[32px] cursor-pointer transition-all duration-700 shadow-3xl w-60
                                                ${positions[index]}
                                                ${activeModule === mod.id ? 'border-white/60 ring-8 ring-white/5 scale-110 z-30' : 'border-white/10 hover:border-white/30 hover:-translate-y-4'}
                                            `}
                                        >
                                            <div className="relative z-10">
                                                <div className="size-12 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-500 group-hover:scale-110"
                                                    style={{ backgroundColor: `${mod.color}20`, borderColor: `${mod.color}40` }}>
                                                    <mod.icon style={{ color: mod.color }} size={24} />
                                                </div>
                                                <h3 className="text-lg font-black mb-1 text-white">{mod.title}</h3>
                                                <p className="text-gray-500 text-[10px] font-bold leading-tight mb-4">{mod.desc}</p>

                                                <div className="flex items-center justify-between">
                                                    {mod.status === 'completed' ? (
                                                        <span className="flex items-center gap-1.5 text-[#46EAB3] text-[9px] font-black uppercase tracking-widest">
                                                            <CheckCircle2 size={12} /> Ready
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest opacity-40">Pending</span>
                                                    )}

                                                    <div className={`size-7 rounded-full flex items-center justify-center transition-all ${mod.hasContent ? 'bg-white/10 text-white' : `bg-[${mod.color}]/20 text-[${mod.color}]`}`}>
                                                        <Compass size={14} className={mod.hasContent ? '' : 'animate-spin-slow'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Connecting Lines (SVG - Arc Optimized Width) */}
                            <svg className="absolute inset-0 size-full pointer-events-none opacity-20" viewBox="0 0 1000 1000">
                                <path d="M 50 450 Q 500 950 950 450" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 20" />
                            </svg>
                        </div>

                        {error && (
                            <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-200 z-50 relative">
                                <AlertCircle size={24} className="text-red-500" />
                                <p className="font-medium text-sm">{error}</p>
                            </div>
                        )}

                        {/* Module Detail Display */}
                        {activeModule && (
                            <div className="animate-in zoom-in-95 duration-700 bg-[#00003E]/60 backdrop-blur-3xl border border-white/5 rounded-[48px] p-10 md:p-14 relative overflow-hidden shadow-3xl">
                                <div className="absolute top-8 right-8 flex gap-2">
                                    <button
                                        onClick={() => setActiveModule(null)}
                                        className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>
                                </div>
                                <div className="relative z-10">
                                    {renderReport()}
                                </div>

                                {/* Background Accents */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent blur-[120px] -z-10 pointer-events-none opacity-50"></div>
                            </div>
                        )}

                        {!activeModule && !loading && !generating && (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="size-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4 animate-pulse">
                                    <Brain size={40} className="opacity-20" />
                                </div>
                                <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs">Awaiting Matrix Selection</p>
                            </div>
                        )}

                        {generating && (
                            <div className="fixed inset-0 z-[100] bg-[#00002E]/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
                                <div className="relative size-40">
                                    <div className="absolute inset-0 border-t-2 border-[#F2B42D] rounded-full animate-spin"></div>
                                    <Sparkles className="absolute inset-0 m-auto text-[#F2B42D] animate-pulse" size={48} />
                                </div>
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-black tracking-widest uppercase">Consulting Neural Network</h2>
                                    <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Processing global market data & profile DNA</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CareerGuide;
