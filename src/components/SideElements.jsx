import React from 'react';
import { Github, Linkedin, Instagram, Twitter, Download } from 'lucide-react';

const SideElements = () => {
    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com", label: "Github" },
        { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram" },
        { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
        { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
    ];

    return (
        <>
            {/* Top Right - Resume */}
            <div className="fixed top-0 right-6 md:right-10 hidden md:block z-50">
                <div className="flex flex-col items-center gap-6">
                    {/* Animated line going down from top */}
                    <div className="side-line-top" />
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="side-text-top flex items-center gap-1 text-gray-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 tracking-widest text-sm group"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        Resume <Download size={12} className="inline group-hover:translate-y-0.5 transition-transform duration-300" />
                    </a>
                </div>
            </div>

            {/* Left Side - Socials */}
            <div className="fixed bottom-0 left-6 md:left-10 hidden md:block z-50">
                <div className="flex flex-col items-center gap-6">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="side-icon text-gray-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
                            style={{ animationDelay: `${1.2 - index * 0.15}s` }}
                        >
                            {link.icon}
                        </a>
                    ))}
                    {/* Animated line going up from bottom */}
                    <div className="side-line-bottom" />
                </div>
            </div>

            {/* Right Side - Email */}
            <div className="fixed bottom-0 right-6 md:right-10 hidden md:block z-50">
                <div className="flex flex-col items-center gap-6">
                    <a
                        href="mailto:hello@joshua.dev"
                        className="side-text-bottom text-gray-400 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 tracking-widest text-sm"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        hello@joshua.dev
                    </a>
                    {/* Animated line going up from bottom */}
                    <div className="side-line-bottom" style={{ animationDelay: '0.3s' }} />
                </div>
            </div>

            {/* Animation styles */}
            <style>{`
                /* Line animation - Bottom to Top (for bottom elements) */
                @keyframes grow-up {
                    0% {
                        height: 0;
                        opacity: 0;
                    }
                    60% {
                        height: 6rem;
                        opacity: 1;
                    }
                    100% {
                        height: 6rem;
                        opacity: 1;
                        box-shadow: 0 0 10px rgba(96, 165, 250, 0.5), 0 0 20px rgba(96, 165, 250, 0.3);
                    }
                }
                
                /* Line animation - Top to Bottom (for top elements) */
                @keyframes grow-down {
                    0% {
                        height: 0;
                        opacity: 0;
                    }
                    60% {
                        height: 6rem;
                        opacity: 1;
                    }
                    100% {
                        height: 6rem;
                        opacity: 1;
                        box-shadow: 0 0 10px rgba(96, 165, 250, 0.5), 0 0 20px rgba(96, 165, 250, 0.3);
                    }
                }
                
                /* Text/Icon fade in from bottom */
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Text fade in from top */
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Glow pulse after animation */
                @keyframes glow-pulse {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(96, 165, 250, 0.4), 0 0 20px rgba(96, 165, 250, 0.2);
                    }
                    50% {
                        box-shadow: 0 0 15px rgba(96, 165, 250, 0.6), 0 0 30px rgba(96, 165, 250, 0.4);
                    }
                }
                
                /* Bottom line styles */
                .side-line-bottom {
                    width: 1px;
                    height: 0;
                    background: linear-gradient(to bottom, rgba(156, 163, 175, 0.8), transparent);
                    animation: grow-up 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    transform-origin: bottom;
                }
                
                .side-line-bottom::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1px;
                    height: 100%;
                    animation: glow-pulse 2s ease-in-out infinite;
                    animation-delay: 1.5s;
                }
                
                /* Top line styles */
                .side-line-top {
                    width: 1px;
                    height: 0;
                    background: linear-gradient(to top, rgba(156, 163, 175, 0.8), transparent);
                    animation: grow-down 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    animation-delay: 0.2s;
                    transform-origin: top;
                }
                
                .side-line-top::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1px;
                    height: 100%;
                    animation: glow-pulse 2s ease-in-out infinite;
                    animation-delay: 1.7s;
                }
                
                /* Icon animation - from bottom */
                .side-icon {
                    opacity: 0;
                    animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                /* Text animation - bottom elements (from bottom) */
                .side-text-bottom {
                    opacity: 0;
                    animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    animation-delay: 0.5s;
                }
                
                /* Text animation - top elements (from top) */
                .side-text-top {
                    opacity: 0;
                    animation: fade-in-down 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    animation-delay: 0.8s;
                }
            `}</style>
        </>
    );
};

export default SideElements;
