import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, Github, Linkedin, ArrowDown, GraduationCap, Calendar, MapPin,
    Award, ExternalLink, ShieldCheck, Globe, Database, Terminal, Cpu,
    Gamepad2, Brain, Mountain, Camera, Mail, MessageSquare
} from 'lucide-react';
import GooeyNav from '../components/GooeyNav';
import BlurText from '../components/BlurText';
import ProfileCard from '../components/ProfileCard';
import SideElements from '../components/SideElements';
import TiltedCard from '../components/TiltedCard';
import Particles from '../components/Particles';
import StarBorder from '../components/StarBorder';

// ============================================================================
// SCROLL REVEAL HOOK
// ============================================================================
const useScrollReveal = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, isVisible];
};

// ============================================================================
// NAVBAR SECTION - Floating Pill Design with GooeyNav
// ============================================================================
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Education', href: '#education' },
        { label: 'Certificates', href: '#certificates' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll spy using IntersectionObserver
    useEffect(() => {
        const sectionIds = navLinks.map(link => link.href.replace('#', ''));
        const observers = [];

        sectionIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setActiveSection(index);
                            }
                        });
                    },
                    {
                        rootMargin: '-20% 0px -60% 0px',
                        threshold: 0
                    }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'top-4' : 'top-6'}`}>
            {/* Desktop Floating Pill Navbar with GooeyNav */}
            <div className="hidden md:flex items-center bg-gray-950 px-3 py-2 rounded-full shadow-2xl shadow-black/50 border border-white/5">
                {/* Logo */}
                <div className="pl-2 pr-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">J</span>
                    </div>
                </div>

                {/* GooeyNav with particle effects */}
                <GooeyNav
                    items={navLinks}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    activeIndex={activeSection}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <div className="flex items-center gap-2 bg-gray-950 px-4 py-3 rounded-full shadow-2xl shadow-black/50 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">J</span>
                    </div>
                    <span className="text-white font-medium">Joshua</span>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="ml-2 text-gray-300 hover:text-white p-2"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-950 rounded-2xl shadow-2xl shadow-black/50 border border-white/5 overflow-hidden">
                        <div className="py-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors ${activeSection === index
                                        ? 'text-white bg-gray-900'
                                        : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};


// ============================================================================
// HERO SECTION
// ============================================================================
const Hero = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center relative pt-20 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Profile Card */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-center animate-fade-in-left">
                        <ProfileCard
                            name="Joshua"
                            title="CS Student & Developer"
                            handle="joshua.dev"
                            avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                            miniAvatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            contactText="Contact Me"
                            onContactClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        />
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="animate-fade-in mb-6">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                                Welcome to my portfolio
                            </span>
                        </div>

                        <div className="mb-6">
                            <BlurText
                                text="Hi, I'm Joshua"
                                delay={100}
                                animateBy="words"
                                direction="top"
                                className="text-5xl md:text-7xl font-bold tracking-tight text-blue-400"
                            />
                            <BlurText
                                text="CS Student & Developer"
                                delay={80}
                                animateBy="words"
                                direction="bottom"
                                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mt-2"
                            />
                        </div>

                        <BlurText
                            text="Passionate about building software that makes a difference. Exploring the world of technology one line of code at a time."
                            delay={50}
                            animateBy="words"
                            direction="bottom"
                            className="max-w-xl text-xl text-gray-400 mb-10 leading-relaxed"
                        />

                        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
                            <StarBorder
                                as="a"
                                href="#projects"
                                color="#3b82f6"
                                speed="5s"
                            >
                                View My Work
                            </StarBorder>
                            <StarBorder
                                as="a"
                                href="#contact"
                                color="#8b5cf6"
                                speed="5s"
                            >
                                Get in Touch
                            </StarBorder>
                            <StarBorder
                                as="a"
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="#22c55e"
                                speed="5s"
                            >
                                View Resume
                            </StarBorder>
                        </div>
                    </div>
                </div>
            </div>


            <a
                href="#skills"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors animate-bounce hidden lg:block"
            >
                <ArrowDown size={24} />
            </a>
        </section>
    );
};

// ============================================================================
// EDUCATION SECTION
// ============================================================================
const Education = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const timelineRef = useRef(null);
    const [lineHeight, setLineHeight] = useState(0);
    const [visibleCards, setVisibleCards] = useState([]);
    const animationFrameRef = useRef(null);
    const currentLineHeight = useRef(0);

    const educationData = [
        {
            degree: "Bachelor of Science in Computer Science",
            school: "University of Technology",
            location: "San Francisco, CA",
            period: "2023 - Present",
            description: "Focusing on Software Engineering and Artificial Intelligence. Active member of the CS Club and Hackathon organizer.",
            courses: ["Data Structures", "Algorithms", "Web Development", "Database Systems"],
            current: true
        },
        {
            degree: "High School Diploma",
            school: "Tech High School",
            location: "San Jose, CA",
            period: "2019 - 2023",
            description: "Graduated with Honors. Lead Developer for the school robotics team.",
            courses: ["AP Computer Science", "Calculus", "Physics"],
            current: false
        }
    ];

    // Smooth scroll-based timeline animation
    useEffect(() => {
        let targetHeight = 0;

        const smoothAnimate = () => {
            // Smooth interpolation (easing)
            const diff = targetHeight - currentLineHeight.current;
            currentLineHeight.current += diff * 0.08; // Smooth easing factor

            setLineHeight(currentLineHeight.current);

            // Update visible cards based on timeline progress
            const totalItems = educationData.length;
            const progressPerItem = 100 / totalItems;
            const newVisibleCards = [];

            for (let i = 0; i < totalItems; i++) {
                // Card becomes visible when timeline reaches its position (with some offset)
                const cardThreshold = (i * progressPerItem) + (progressPerItem * 0.3);
                if (currentLineHeight.current >= cardThreshold) {
                    newVisibleCards.push(i);
                }
            }

            setVisibleCards(prev => {
                if (prev.length !== newVisibleCards.length) {
                    return newVisibleCards;
                }
                return prev;
            });

            animationFrameRef.current = requestAnimationFrame(smoothAnimate);
        };

        const handleScroll = () => {
            if (!timelineRef.current) return;

            const timeline = timelineRef.current;
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const timelineTop = rect.top;
            const timelineHeight = rect.height;

            if (timelineTop < windowHeight && rect.bottom > 0) {
                const scrolledIntoView = windowHeight - timelineTop;
                const progress = Math.min(Math.max(scrolledIntoView / (timelineHeight + windowHeight * 0.2), 0), 1);
                targetHeight = progress * 100;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        animationFrameRef.current = requestAnimationFrame(smoothAnimate);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <section id="education" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My academic journey and milestones.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Timeline Container */}
                    <div
                        ref={timelineRef}
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2"
                    >
                        {/* Background line (unfilled) */}
                        <div className="absolute inset-0 bg-gray-800/30 rounded-full" />

                        {/* Animated fill line */}
                        <div
                            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                            style={{
                                height: `${lineHeight}%`,
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)',
                                transition: 'box-shadow 0.3s ease'
                            }}
                        />

                        {/* Glowing tip */}
                        {lineHeight > 0 && lineHeight < 100 && (
                            <div
                                className="absolute left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-white"
                                style={{
                                    top: `${lineHeight}%`,
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.6)'
                                }}
                            />
                        )}
                    </div>

                    <div className="space-y-16">
                        {educationData.map((item, index) => {
                            const isVisible = visibleCards.includes(index);

                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline Dot with Animation */}
                                    <div
                                        className={`absolute left-4 md:left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 z-10 transition-all duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                                        style={{ top: '2rem' }}
                                    >
                                        {/* Outer ring with pulse */}
                                        <div className={`absolute inset-0 rounded-full ${item.current ? 'bg-blue-500' : 'bg-purple-500'} ${isVisible ? 'animate-ping' : ''} opacity-30`} />
                                        {/* Inner dot */}
                                        <div className={`absolute inset-1 rounded-full ${item.current ? 'bg-blue-500' : 'bg-purple-500'} border-4 border-gray-950`} />
                                        {/* Glow effect */}
                                        <div className={`absolute inset-0 rounded-full ${item.current ? 'bg-blue-500' : 'bg-purple-500'} blur-md opacity-60`} />
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className={`w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-0' : 'md:pl-0'} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                        style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
                                    >
                                        <div className="glass p-6 rounded-2xl hover:bg-gray-900/70 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 group relative overflow-hidden">
                                            {/* Gradient hover effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Current badge */}
                                            {item.current && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse">
                                                        Current
                                                    </span>
                                                </div>
                                            )}

                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-5 relative">
                                                <div className={`p-3 rounded-xl ${item.current ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'} group-hover:scale-110 transition-transform duration-300`}>
                                                    <GraduationCap size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">{item.degree}</h3>
                                                    <p className={`${item.current ? 'text-blue-400' : 'text-purple-400'} font-medium`}>{item.school}</p>
                                                </div>
                                            </div>

                                            {/* Meta info */}
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/50 border border-white/5">
                                                    <Calendar size={14} className={item.current ? 'text-blue-400' : 'text-purple-400'} />
                                                    <span>{item.period}</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/50 border border-white/5">
                                                    <MapPin size={14} className={item.current ? 'text-blue-400' : 'text-purple-400'} />
                                                    <span>{item.location}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-300 mb-5 text-sm leading-relaxed relative">
                                                {item.description}
                                            </p>

                                            {/* Courses */}
                                            <div className="relative">
                                                <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.current ? 'bg-blue-400' : 'bg-purple-400'}`} />
                                                    Key Coursework
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.courses.map((course, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 hover:scale-105 cursor-default ${item.current
                                                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20'
                                                                : 'bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20'
                                                                }`}
                                                        >
                                                            {course}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CSS for timeline animation */}
            <style>{`
                @keyframes timeline-glow {
                    0%, 100% { background-position: 0% 0%; }
                    50% { background-position: 0% 100%; }
                }
            `}</style>
        </section>
    );
};


// ============================================================================
// CERTIFICATES SECTION
// ============================================================================
const Certificates = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    const certificates = [
        {
            name: "Advanced React Patterns",
            issuer: "Frontend Masters",
            date: "Jan 2024",
            link: "https://frontendmasters.com",
            color: "from-blue-500 to-cyan-500"
        },
        {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "Nov 2023",
            link: "https://aws.amazon.com/certification/",
            color: "from-orange-500 to-yellow-500"
        },
        {
            name: "Google Data Analytics Professional",
            issuer: "Google",
            date: "Aug 2023",
            link: "https://grow.google/certificates",
            color: "from-green-500 to-emerald-500"
        },
        {
            name: "Full Stack Web Development",
            issuer: "Udemy",
            date: "May 2023",
            link: "https://udemy.com",
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <section id="certificates" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Certifications</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Validating my skills and commitment to continuous learning.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            className={`glass p-6 rounded-xl hover:bg-gray-900/60 transition-all duration-300 group hover:-translate-y-1 scroll-reveal-scale ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${cert.color} bg-opacity-10 opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <Award className="w-6 h-6 text-white" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                        {cert.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                        <ShieldCheck size={14} />
                                        <span>{cert.issuer}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <span>{cert.date}</span>
                                    </div>

                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        View Credential <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// SKILLS SECTION
// ============================================================================
const Skills = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    const skills = [
        {
            category: "Frontend Development",
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            items: ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Vite"]
        },
        {
            category: "Backend Development",
            icon: <Database className="w-8 h-8 text-green-400" />,
            items: ["Node.js", "Express", "Python", "SQL", "REST APIs"]
        },
        {
            category: "Tools & DevOps",
            icon: <Terminal className="w-8 h-8 text-purple-400" />,
            items: ["Git", "GitHub", "VS Code", "Command Line", "npm/yarn"]
        },
        {
            category: "Other Skills",
            icon: <Cpu className="w-8 h-8 text-red-400" />,
            items: ["Data Structures", "Algorithms", "Problem Solving", "Object-Oriented Programming"]
        }
    ];

    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Technical Skills</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My technical toolbox. I'm always learning and adding new technologies to my repertoire.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={`glass p-6 rounded-2xl hover:bg-gray-900/60 transition-all duration-300 hover:-translate-y-2 group scroll-reveal ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
                        >
                            <div className="bg-gray-900/60 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">{skill.category}</h3>
                            <ul className="space-y-2">
                                {skill.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center text-gray-400 group-hover:text-gray-200 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// PROJECTS SECTION
// ============================================================================
const Projects = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    const projects = [
        {
            title: "Project One",
            description: "A comprehensive web application built with React and Node.js. Features real-time data updates and a modern user interface.",
            tags: ["React", "Node.js", "Tailwind", "MongoDB"],
            github: "https://github.com",
            demo: "https://demo.com",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Project Two",
            description: "Mobile-first responsive website designed for seamless user experience across all devices with high performance scores.",
            tags: ["Javascript", "HTML/CSS", "API"],
            github: "https://github.com",
            demo: "https://demo.com",
            image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Project Three",
            description: "Data visualization dashboard processing large datasets into actionable insights with interactive charts.",
            tags: ["Python", "React", "D3.js"],
            github: "https://github.com",
            demo: "https://demo.com",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Featured Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Some of my recent work. Each project is a unique piece of development.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`scroll-reveal-rotate ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
                        >
                            <TiltedCard
                                imageSrc={project.image}
                                altText={project.title}
                                captionText={project.title}
                                containerHeight="380px"
                                containerWidth="100%"
                                imageHeight="280px"
                                imageWidth="100%"
                                scaleOnHover={1.05}
                                rotateAmplitude={12}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="flex flex-col h-full justify-end">
                                        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={18} />
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// ============================================================================
// INTERESTS SECTION
// ============================================================================
const Interests = () => {
    const [headerRef, headerVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    const interests = [
        {
            title: "Artificial Intelligence",
            icon: <Brain className="w-10 h-10 text-pink-500" />,
            description: "Deeply interested in Machine Learning and Neural Networks. Exploring how AI can solve real-world problems."
        },
        {
            title: "Game Development",
            icon: <Gamepad2 className="w-10 h-10 text-purple-500" />,
            description: "Creating immersive worlds and interactive experiences. Unity and Unreal Engine enthusiast."
        },
        {
            title: "Photography",
            icon: <Camera className="w-10 h-10 text-blue-500" />,
            description: "Capturing moments and exploring visual storytelling through the lens."
        },
        {
            title: "Hiking & Outdoors",
            icon: <Mountain className="w-10 h-10 text-green-500" />,
            description: "Finding peace and inspiration in nature. Always ready for the next adventure."
        }
    ];

    return (
        <section id="interests" className="py-20 relative overflow-hidden">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={headerRef}
                    className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Personal Interests</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Beyond the code. Here's what keeps me curious and inspired.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {interests.map((interest, index) => (
                        <div
                            key={index}
                            className={`glass p-8 rounded-2xl flex items-start gap-4 hover:bg-gray-900/60 transition-all duration-300 ${index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right'} ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
                        >
                            <div className="bg-gray-900/60 p-3 rounded-xl shrink-0">
                                {interest.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{interest.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {interest.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// CONTACT SECTION
// ============================================================================
const Contact = () => {
    const [sectionRef, sectionVisible] = useScrollReveal();
    const [formFocus, setFormFocus] = useState(null);

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: "hello@joshua.dev",
            href: "mailto:hello@joshua.dev",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "Connect with me",
            href: "https://linkedin.com",
            color: "from-blue-600 to-blue-400"
        },
        {
            icon: <Github className="w-6 h-6" />,
            label: "GitHub",
            value: "See my work",
            href: "https://github.com",
            color: "from-gray-600 to-gray-400"
        }
    ];

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div
                    ref={sectionRef}
                    className={`text-center mb-16 scroll-reveal ${sectionVisible ? 'visible' : ''}`}
                >
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Let's Create </span>
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                            Something Amazing
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Have a project in mind? I'd love to hear about it. Drop me a message and let's bring your ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Cards */}
                    <div className={`lg:col-span-2 space-y-4 scroll-reveal ${sectionVisible ? 'visible' : ''} stagger-1`}>
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.href}
                                target={method.href.startsWith('http') ? '_blank' : undefined}
                                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="group block p-5 rounded-2xl bg-gray-900/40 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                            >
                                {/* Gradient hover background */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-0.5">{method.label}</p>
                                        <p className="text-white font-medium group-hover:text-blue-400 transition-colors">{method.value}</p>
                                    </div>
                                    <div className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </a>
                        ))}

                        {/* Quick response badge */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                            </div>
                            <p className="text-green-400 text-sm font-medium">Usually responds within 24 hours</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={`lg:col-span-3 scroll-reveal ${sectionVisible ? 'visible' : ''} stagger-2`}>
                        <form
                            className="p-6 md:p-8 rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-sm relative overflow-hidden"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* Form decorative element */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />

                            <div className="relative space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            Name
                                            <span className="text-red-400">*</span>
                                        </label>
                                        <div className={`relative transition-all duration-300 ${formFocus === 'name' ? 'transform scale-[1.02]' : ''}`}>
                                            <input
                                                type="text"
                                                className="w-full bg-black/30 border-2 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-black/50 transition-all duration-300"
                                                placeholder="Your name"
                                                onFocus={() => setFormFocus('name')}
                                                onBlur={() => setFormFocus(null)}
                                            />
                                            {formFocus === 'name' && (
                                                <div className="absolute inset-0 -z-10 bg-blue-500/20 rounded-xl blur-xl" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            Email
                                            <span className="text-red-400">*</span>
                                        </label>
                                        <div className={`relative transition-all duration-300 ${formFocus === 'email' ? 'transform scale-[1.02]' : ''}`}>
                                            <input
                                                type="email"
                                                className="w-full bg-black/30 border-2 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-black/50 transition-all duration-300"
                                                placeholder="your@email.com"
                                                onFocus={() => setFormFocus('email')}
                                                onBlur={() => setFormFocus(null)}
                                            />
                                            {formFocus === 'email' && (
                                                <div className="absolute inset-0 -z-10 bg-blue-500/20 rounded-xl blur-xl" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        Subject
                                    </label>
                                    <div className={`relative transition-all duration-300 ${formFocus === 'subject' ? 'transform scale-[1.02]' : ''}`}>
                                        <input
                                            type="text"
                                            className="w-full bg-black/30 border-2 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-black/50 transition-all duration-300"
                                            placeholder="What's this about?"
                                            onFocus={() => setFormFocus('subject')}
                                            onBlur={() => setFormFocus(null)}
                                        />
                                        {formFocus === 'subject' && (
                                            <div className="absolute inset-0 -z-10 bg-purple-500/20 rounded-xl blur-xl" />
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        Message
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${formFocus === 'message' ? 'transform scale-[1.02]' : ''}`}>
                                        <textarea
                                            rows="5"
                                            className="w-full bg-black/30 border-2 border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:bg-black/50 transition-all duration-300 resize-none"
                                            placeholder="Tell me about your project, idea, or just say hello..."
                                            onFocus={() => setFormFocus('message')}
                                            onBlur={() => setFormFocus(null)}
                                        />
                                        {formFocus === 'message' && (
                                            <div className="absolute inset-0 -z-10 bg-pink-500/20 rounded-xl blur-xl" />
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-0.5"
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <MessageSquare size={20} />
                                        Send Message
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


// ============================================================================
// MAIN PORTFOLIO PAGE
// ============================================================================
const Portfolio = () => {
    return (
        <div className="min-h-screen relative">
            {/* Particles Background */}
            <Particles
                particleCount={150}
                particleSpread={12}
                speed={0.08}
                particleColors={['#3b82f6', '#8b5cf6', '#60a5fa', '#a78bfa']}
                moveParticlesOnHover={true}
                particleHoverFactor={0.5}
                alphaParticles={true}
                particleBaseSize={120}
                sizeRandomness={0.8}
                cameraDistance={25}
                disableRotation={false}
            />

            <Navbar />
            <SideElements />
            <main className="relative z-10">
                <Hero />
                <Education />
                <Certificates />
                <Skills />
                <Projects />
                <Contact />
            </main>

            <footer className="relative z-10 py-8 text-center text-gray-400 text-sm border-t border-t-white/5">
                <p>© {new Date().getFullYear()} Joshua. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default Portfolio;
