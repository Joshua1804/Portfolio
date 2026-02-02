import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, Github, Linkedin, ArrowDown, GraduationCap, Calendar, MapPin,
    Award, ExternalLink, ShieldCheck, Globe, Database, Terminal, Cpu,
    Gamepad2, Brain, Mountain, Camera, Mail, MessageSquare
} from 'lucide-react';
import GooeyNav from '../components/GooeyNav';
import BlurText from '../components/BlurText';
import ProfileCard from '../components/ProfileCard';

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Education', href: '#education' },
        { label: 'Certificates', href: '#certificates' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Interests', href: '#interests' },
        { label: 'Contact', href: '#contact' },
    ];

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
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />

                {/* Email Button */}
                <a
                    href="mailto:hello@joshua.dev"
                    className="ml-4 px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                    hello@joshua.dev
                </a>
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
                                    className="block w-full text-left px-6 py-3 text-sm font-medium text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="border-t border-white/5 mt-2 pt-2 px-4 pb-3">
                                <a
                                    href="mailto:hello@joshua.dev"
                                    className="block w-full text-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    hello@joshua.dev
                                </a>
                            </div>
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
                            <a
                                href="#projects"
                                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
                            >
                                View My Work
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 rounded-full bg-gray-900/60 hover:bg-gray-800/60 border border-white/10 text-white font-medium transition-all hover:scale-105 backdrop-blur-sm"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

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
    const [contentRef, contentVisible] = useScrollReveal();

    const educationData = [
        {
            degree: "Bachelor of Science in Computer Science",
            school: "University of Technology",
            location: "San Francisco, CA",
            period: "2023 - Present",
            description: "Focusing on Software Engineering and Artificial Intelligence. Active member of the CS Club and Hackathon organizer.",
            courses: ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
        },
        {
            degree: "High School Diploma",
            school: "Tech High School",
            location: "San Jose, CA",
            period: "2019 - 2023",
            description: "Graduated with Honors. Lead Developer for the school robotics team.",
            courses: ["AP Computer Science", "Calculus", "Physics"]
        }
    ];

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

                <div ref={contentRef} className="max-w-3xl mx-auto relative">
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50 hidden md:block"></div>

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} scroll-reveal ${contentVisible ? 'visible' : ''} stagger-${index + 1}`}
                            >
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 transform -translate-x-1/2 mt-1.5 z-10 hidden md:block"></div>

                                <div className="w-full md:w-[calc(50%-2rem)]">
                                    <div className="glass p-6 rounded-xl hover:bg-gray-900/60 transition-all duration-300 transform hover:-translate-y-1 relative group">
                                        <div className="absolute -left-3 top-6 w-6 h-0.5 bg-blue-500/50 hidden md:block"></div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                <GraduationCap size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                                                <p className="text-blue-400 font-medium">{item.school}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{item.period}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Coursework:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {item.courses.map((course, i) => (
                                                    <span key={i} className="px-2 py-1 text-xs rounded bg-gray-900/60 border border-white/5 text-gray-300">
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
        <section id="projects" className="py-20 bg-black/20">
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
                            className={`glass rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group scroll-reveal-rotate ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

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

    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={sectionRef}
                    className={`glass rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative scroll-reveal-scale ${sectionVisible ? 'visible' : ''}`}
                >

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 -z-10"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`scroll-reveal-left ${sectionVisible ? 'visible' : ''} stagger-1`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                Let's Work Together
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                I'm currently opening to new opportunities and collaborations.
                                Whether you have a question or just want to say hi, feel free to reach out!
                            </p>

                            <div className="space-y-4">
                                <a href="mailto:hello@joshua.dev" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                    <div className="bg-gray-900/60 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-lg">hello@joshua.dev</span>
                                </a>

                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                    <div className="bg-gray-900/60 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <Linkedin className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-lg">Connect on LinkedIn</span>
                                </a>

                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                    <div className="bg-gray-900/60 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <Github className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-lg">Follow on GitHub</span>
                                </a>
                            </div>
                        </div>

                        <form className={`space-y-4 scroll-reveal-right ${sectionVisible ? 'visible' : ''} stagger-2`} onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                                <MessageSquare size={20} />
                                Send Message
                            </button>
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
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Education />
                <Certificates />
                <Skills />
                <Projects />
                <Interests />
                <Contact />
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm glass border-t border-t-white/5">
                <p>© {new Date().getFullYear()} Joshua. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default Portfolio;
