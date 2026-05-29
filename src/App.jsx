import React, { useState, useEffect, useRef } from 'react';
import VLSIChip from './components/VLSIChip';
import { 
    Cpu, BookOpen, Layers, Mail, ExternalLink, 
    ArrowRight, ChevronLeft, ChevronRight, 
    Zap, Eye
} from 'lucide-react';

export default function App() {
    // 3D Canvas Raycast state connection
    const [selectedBlock, setSelectedBlock] = useState(null);

    // Navigation and Menu states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Typed text effect states
    const [typedText, setTypedText] = useState('');
    const typingPhrases = [
        'RTL Design Engineer (Verilog)',
        'VLSI Engineer & Hardware Designer',
        'Digital System Designer',
        'Silicon & Hardware Enthusiast'
    ];
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Custom Cursor position state
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Swipeable Flip Card Carousel state
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [flippedCards, setFlippedCards] = useState({ email: false, linkedin: false, github: false });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const carouselTrackRef = useRef(null);

    // Ref pointers
    const prj1Ref = useRef(null);
    const prj2Ref = useRef(null);
    const prj3Ref = useRef(null);

    // Skills data — paragraph cards, no percentage bars
    const skills = [
        {
            id: 'core',
            icon: <Cpu size={22} />,
            title: 'Core HDL & Digital Design',
            desc: 'Deep hands-on expertise in Verilog HDL for RTL and behavioural modelling. Proficient in designing finite state machines, arithmetic logic units, and multi-cycle datapaths from specification to synthesis.',
            tags: ['Verilog HDL', 'RTL Design', 'FSM Design', 'Digital Systems', 'Arithmetic Circuits']
        },
        {
            id: 'eda',
            icon: <Layers size={22} />,
            title: 'EDA Tools & Flows',
            desc: 'Experienced with industry-standard EDA toolchains for simulation, synthesis, and functional verification. Comfortable navigating complete digital design flows from RTL to gate-level netlist.',
            tags: ['Xilinx Vivado', 'ModelSim', 'Cadence Virtuoso', 'EDA Tool Flow', 'Logic Synthesis']
        },
        {
            id: 'power',
            icon: <Zap size={22} />,
            title: 'Power & Verification',
            desc: 'Applied clock-gating and power-aware design techniques to reduce dynamic power dissipation in sequential circuits. Skilled at writing structured testbenches for functional and coverage-driven verification.',
            tags: ['Clock Gating', 'Power Optimisation', 'Testbench Writing', 'Functional Verification', 'Simulation']
        },
        {
            id: 'prog',
            icon: <BookOpen size={22} />,
            title: 'Programming & Scripting',
            desc: 'Solid foundation in Python and C for algorithmic problem-solving and hardware automation scripts. Familiar with Tcl for Vivado/ModelSim automation and Linux CLI workflows.',
            tags: ['Python', 'C Programming', 'Tcl Scripting', 'Linux CLI', 'Shell Scripting']
        },
        {
            id: 'emerging',
            icon: <Eye size={22} />,
            title: 'Emerging & Learning',
            desc: 'Actively expanding into SystemVerilog for advanced verification methodologies and UVM-based testbench architecture. Exploring MATLAB for signal processing and hardware modelling exercises.',
            tags: ['SystemVerilog', 'UVM Basics', 'MATLAB', 'Constraint-Random Verification']
        }
    ];

    // Card data (using inline SVGs for LinkedIn and GitHub since Lucide has removed them)
    const cards = [
        {
            id: 'email',
            title: 'Email',
            value: 'smtharan52@gmail.com',
            qrData: 'mailto:smtharan52@gmail.com',
            icon: <Mail size={24} />,
            frontLabel: 'smtharan52@gmail.com',
            backTitle: 'Scan to Email',
            backDesc: 'smtharan52@gmail.com'
        },
        {
            id: 'linkedin',
            title: 'LinkedIn',
            value: 'in/tharansm',
            qrData: 'https://linkedin.com/in/tharansm',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            ),
            frontLabel: 'linkedin.com/in/tharansm',
            backTitle: 'Scan to Connect',
            backDesc: 'linkedin.com/in/tharansm'
        },
        {
            id: 'github',
            title: 'GitHub',
            value: 'github.com/THARAN16',
            qrData: 'https://github.com/THARAN16',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            ),
            frontLabel: 'github.com/THARAN16',
            backTitle: 'Scan to Visit',
            backDesc: 'github.com/THARAN16'
        }
    ];

    // Scroll, mouse, interactions
    useEffect(() => {
        // ── Navbar scroll + active section ──
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = ['home','about','education','projects','skills','certifications','contact'];
            const scrollPos = window.scrollY + 160;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPos) { setActiveSection(sections[i]); break; }
            }
        };

        // ── Mouse position ──
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

        // ── Scroll-reveal: animate elements into view ──
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        const revealEls = document.querySelectorAll(
            '.glass-card, .timeline-item, .section-title, .hero-availability, .hero-name, .hero-description, .hero-cta, .about-stat'
        );
        revealEls.forEach((el, i) => {
            el.classList.add('reveal-ready');
            el.style.transitionDelay = `${(i % 6) * 0.08}s`;
            revealObserver.observe(el);
        });

        // ── Ocean burst on click ──
        const handleClick = (e) => {
            const burst = 8;
            for (let i = 0; i < burst; i++) {
                const spark = document.createElement('div');
                spark.className = 'click-spark';
                const angle = (i / burst) * 360;
                const dist  = 40 + Math.random() * 50;
                const size  = 6 + Math.random() * 8;
                spark.style.cssText = `
                    left:${e.clientX}px; top:${e.clientY}px;
                    width:${size}px; height:${size}px;
                    --angle:${angle}deg; --dist:${dist}px;
                `;
                document.body.appendChild(spark);
                setTimeout(() => spark.remove(), 900);
            }
        };

        // ── Magnetic hover on buttons ──
        const magneticEls = document.querySelectorAll('.btn');
        const magnetHandlers = [];
        magneticEls.forEach(el => {
            const onMove = (e) => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * 0.3;
                const dy = (e.clientY - cy) * 0.3;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            };
            const onLeave = () => { el.style.transform = ''; };
            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);
            magnetHandlers.push({ el, onMove, onLeave });
        });

        // ── Hover listeners for Luffy cursor ──
        const addHoverListeners = () => {
            const elms = document.querySelectorAll(
                'a, button, .project-card, .skill-para-card, .flip-card, .cert-card, .timeline-content'
            );
            elms.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };
        addHoverListeners();
        const mutObs = new MutationObserver(addHoverListeners);
        mutObs.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            revealObserver.disconnect();
            mutObs.disconnect();
            magnetHandlers.forEach(({ el, onMove, onLeave }) => {
                el.removeEventListener('mousemove', onMove);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);


    // Custom Cursor trail damping
    useEffect(() => {
        let frameId;
        const animateTrail = () => {
            setTrailPos((prev) => {
                const dx = mousePos.x - prev.x;
                const dy = mousePos.y - prev.y;
                return {
                    x: prev.x + dx * 0.12,
                    y: prev.y + dy * 0.12
                };
            });
            frameId = requestAnimationFrame(animateTrail);
        };
        animateTrail();
        return () => cancelAnimationFrame(frameId);
    }, [mousePos]);

    // Typist logic loop
    useEffect(() => {
        let timer;
        const phrase = typingPhrases[phraseIndex];
        
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === phrase.length) {
            speed = 2000; // Hold full sentence
        } else if (isDeleting && charIndex === 0) {
            speed = 500; // Delay before typing next sentence
        }

        timer = setTimeout(() => {
            if (isDeleting) {
                setTypedText(phrase.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            } else {
                setTypedText(phrase.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }

            if (!isDeleting && charIndex === phrase.length) {
                setIsDeleting(true);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex]);

    // ── Ocean spark canvas animation ──────────────────────────────────
    useEffect(() => {
        const canvas = document.getElementById('particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Draw one glowing electric cyan spark / droplet
        const drawSpark = (x, y, size, rot, alpha) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.translate(x, y);
            ctx.rotate(rot);

            // Inner core
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Glow aura
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            const g = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size);
            g.addColorStop(0,   'rgba(125, 211, 252, 0.9)'); // sky blue
            g.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');  // cyan
            g.addColorStop(1,   'rgba(2, 132, 199, 0)');     // dark blue fade
            ctx.fillStyle = g;
            ctx.fill();

            // Tiny vertical spark line
            ctx.beginPath();
            ctx.moveTo(0, -size * 1.5);
            ctx.lineTo(0, size * 1.5);
            ctx.strokeStyle = 'rgba(125, 211, 252, 0.6)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        };

        const W = () => canvas.width;
        const H = () => canvas.height;

        // Create 55 sparks
        const sparks = Array.from({ length: 55 }, () => ({
            x:    Math.random() * window.innerWidth,
            y:    Math.random() * window.innerHeight,       // spread initially
            size: Math.random() * 6 + 3,                   // 3–9px
            vy:   Math.random() * 0.55 + 0.2,              // fall speed
            vx:   (Math.random() - 0.5) * 0.3,             // horizontal drift
            rot:  Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.022,           // spin
            wobble: Math.random() * Math.PI * 2,           // pendulum phase
            wobbleS: Math.random() * 0.012 + 0.004,        // wobble speed
            alpha: Math.random() * 0.55 + 0.3,
        }));

        let raf;
        const animate = () => {
            ctx.clearRect(0, 0, W(), H());

            sparks.forEach(p => {
                p.wobble += p.wobbleS;
                p.x += p.vx + Math.sin(p.wobble) * 0.8;
                p.y += p.vy;
                p.rot += p.rotV;

                // Fade near bottom 15%
                const fadeY = H() * 0.85;
                const alpha = p.y > fadeY
                    ? p.alpha * (1 - (p.y - fadeY) / (H() * 0.15))
                    : p.alpha;

                drawSpark(p.x, p.y, p.size, p.rot, alpha);

                // Reset when off-screen
                if (p.y > H() + 20) {
                    p.y = -12;
                    p.x = Math.random() * W();
                    p.size = Math.random() * 6 + 3;
                    p.alpha = Math.random() * 0.55 + 0.3;
                }
                if (p.x < -20) p.x = W() + 10;
                if (p.x > W() + 20) p.x = -10;
            });

            raf = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Listen to 3D Chip blocks raycast selection
    useEffect(() => {
        if (!selectedBlock) return;
        
        // Scroll to projects section smoothly
        const prjSec = document.getElementById('projects');
        if (prjSec) {
            prjSec.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedBlock]);

    // Carousel calculations
    const goToCard = (index) => {
        if (index < 0 || index >= cards.length) return;
        setCarouselIndex(index);
        
        // Translate track inside carousel
        if (carouselTrackRef.current) {
            const gap = 24;
            const cardWidth = 280;
            const containerWidth = carouselTrackRef.current.parentElement.offsetWidth;
            
            // Centering active card math
            const offset = index * (cardWidth + gap);
            const centerOffset = (containerWidth - cardWidth) / 2;
            const translate = -(offset - centerOffset);
            
            currentTranslate.current = translate;
            prevTranslate.current = translate;
            carouselTrackRef.current.style.transform = `translateX(${translate}px)`;
        }
    };

    // Handle drag/swipe events
    const handleDragStart = (e) => {
        setIsDragging(true);
        dragStartX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        if (carouselTrackRef.current) {
            carouselTrackRef.current.classList.add('dragging');
        }
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diff = currentX - dragStartX.current;
        const translate = prevTranslate.current + diff;
        currentTranslate.current = translate;
        if (carouselTrackRef.current) {
            carouselTrackRef.current.style.transform = `translateX(${translate}px)`;
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (carouselTrackRef.current) {
            carouselTrackRef.current.classList.remove('dragging');
        }
        
        const diff = currentTranslate.current - prevTranslate.current;
        const threshold = 60;
        
        let newIndex = carouselIndex;
        if (diff < -threshold && carouselIndex < cards.length - 1) {
            newIndex++;
        } else if (diff > threshold && carouselIndex > 0) {
            newIndex--;
        }
        
        goToCard(newIndex);
    };

    // Toggle flip 3D animation
    const toggleFlipCard = (id, e) => {
        // Prevent flip during swipe drag
        const diffX = Math.abs(currentTranslate.current - prevTranslate.current);
        if (diffX > 5) return;

        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            {/* Luffy Cursor */}
            <div
                className={`luffy-cursor ${isHovering ? 'hovering' : ''}`}
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
            >
                <img className="luffy-normal" src="/luffy_normal.png" alt="" draggable={false} />
                <img className="luffy-smile"  src="/luffy_smile.png"  alt="" draggable={false} />
            </div>
            {/* Wave trail */}
            <div
                className="cursor-trail"
                style={{ left: `${trailPos.x}px`, top: `${trailPos.y}px` }}
            />

            {/* Video Background — ocean blue particles */}
            <div className="video-bg-container">
                <video className="video-bg" autoPlay loop muted playsInline id="bgVideo">
                    <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=23cd4d34a41f6261559868f00dbbe4ffdb08c3ba&profile_id=165" type="video/mp4" />
                </video>
                <div className="video-overlay" />
            </div>

            {/* Canvas Ambient particles */}
            <canvas id="particles" />

            {/* Navigation Header */}
            <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <a href="#hero" className="nav-logo">// TSM</a>
                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {['about', 'education', 'projects', 'skills', 'certifications', 'contact'].map((item) => (
                        <a 
                            key={item}
                            href={`#${item}`} 
                            className={`nav-link ${activeSection === item ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    ))}
                </nav>
                <button 
                    className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {/* HERO SECTION */}
            <section className="hero section" id="home">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-availability">
                                <span className="avail-dot" />
                                <span>Available for Internships</span>
                            </div>
                            <h1 className="hero-name">
                                <span className="hero-name-line" data-text="Tharan S M">Tharan S M</span>
                            </h1>
                            <div className="hero-title-wrapper">
                                <span className="hero-title-prefix">//</span>
                                <span className="hero-title-typed">{typedText}</span>
                                <span className="hero-cursor-blink">|</span>
                            </div>
                            <p className="hero-description">
                                Electronics & Communication Engineering student specializing in VLSI and hardware design, 
                                crafting high-performance digital logic with Verilog HDL and modern EDA flows.
                            </p>
                            <div className="hero-cta">
                                <a href="#projects" className="btn btn-primary">
                                    <span>View Projects</span>
                                    <ArrowRight size={18} />
                                </a>
                                <a href="resume.pdf" className="btn btn-secondary" target="_blank">
                                    <span>Download Resume</span>
                                </a>
                            </div>
                        </div>

                        {/* Interactive 3D Canvas Showcase */}
                        <div className="hero-canvas-container">
                            <VLSIChip onSelectBlock={setSelectedBlock} selectedBlock={selectedBlock} />
                            <div className="canvas-overlay-tip">
                                <Eye size={12} className="avail-dot" />
                                Click blocks to interact · Drag to rotate
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="section about" id="about">
                <div className="container">
                    <h2 className="section-title">
                        About Me
                    </h2>
                    <div className="about-grid">
                        <div className="about-image">
                            <div className="about-image-wrapper">
                                <div className="about-image-placeholder">
                                    <img 
                                        src="/waveform_sim.png" 
                                        alt="Simulation Waveform" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
                                        draggable="false" 
                                    />
                                </div>
                                <div className="about-image-border" />
                            </div>
                            <div className="about-stats">
                                <div className="about-stat">
                                    <span className="about-stat-number">2027</span>
                                    <span className="about-stat-label">B.E Graduation</span>
                                </div>
                                <div className="about-stat">
                                    <span className="about-stat-number">6</span>
                                    <span className="about-stat-label">Core RTL Projects</span>
                                </div>
                                <div className="about-stat">
                                    <span className="about-stat-number">8.83</span>
                                    <span className="about-stat-label">CGPA</span>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <div className="glass-card about-text-card">
                                <p>
                                    I am a motivated <em>Electronics and Communication Engineering</em> student with a strong academic foundation in <strong>Digital Electronics</strong>, Analog Communication, and Semiconductor fundamentals.
                                </p>
                                <p>
                                    Developing expertise in <em>VLSI and chip design</em> with hands-on knowledge of Verilog HDL, Digital System Design, and EDA tools. Strong analytical thinking and disciplined work ethic drive my pursuit of high-performance hardware solutions.
                                </p>
                                <p>
                                    Seeking opportunities in the <em>semiconductor industry</em> to apply technical knowledge, contribute to high-performance design environments, and grow as a hardware engineer.
                                </p>
                                <div className="about-tags">
                                    <span className="tag">RTL Design</span>
                                    <span className="tag">Verilog HDL</span>
                                    <span className="tag">Digital Systems</span>
                                    <span className="tag">VLSI Design</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EDUCATION SECTION */}
            <section className="section education" id="education">
                <div className="container">
                    <h2 className="section-title">
                        Education
                    </h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-marker" />
                            <div className="timeline-content glass-card">
                                <div className="timeline-header">
                                    <h3>B.E Electronics & Communication Engineering</h3>
                                    <span className="timeline-company">SRM Valliammai Engineering College</span>
                                </div>
                                <span className="timeline-date">2023 — 2027</span>
                                <p>Specializing in digital microelectronics, semiconductor devices, and logic synthesis. Actively working on hardware projects and hardware description languages.</p>
                                <div className="timeline-tags">
                                    <span>CGPA: 8.94</span>
                                    <span>Digital Systems</span>
                                    <span>VLSI Design</span>
                                    <span>Analog Circuits</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-marker" />
                            <div className="timeline-content glass-card">
                                <div className="timeline-header">
                                    <h3>HSC — Higher Secondary Certificate</h3>
                                    <span className="timeline-company">Shree Niketan Matric Hr. Sec School</span>
                                </div>
                                <span className="timeline-date">Completed 2023</span>
                                <p>Completed higher secondary education with a strong emphasis on physics, chemistry, and mathematics.</p>
                                <div className="timeline-tags">
                                    <span>Percentage: 90%</span>
                                    <span>Mathematics</span>
                                    <span>Physics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section className="section projects" id="projects">
                <div className="container">
                    <h2 className="section-title">
                        Featured Projects
                    </h2>
                    <div className="projects-grid">
                        
                        {/* Project 1 — ALU block highlight connection */}
                        <article 
                            ref={prj1Ref}
                            className={`project-card glass-card ${selectedBlock === 'ALU' ? 'highlighted' : ''}`}
                        >
                            <div className="project-image">
                                <div className="project-image-placeholder">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                        <rect x="3" y="3" width="8" height="6" rx="1" />
                                        <rect x="13" y="3" width="8" height="6" rx="1" />
                                        <rect x="3" y="13" width="18" height="8" rx="1" />
                                        <path d="M7 9v4M17 9v4M12 3v10" strokeDasharray="1,1" />
                                        <text x="4.5" y="7" fontFamily="monospace" fontSize="2" fontWeight="bold" fill="currentColor">ALU</text>
                                        <text x="14.5" y="7" fontFamily="monospace" fontSize="2" fontWeight="bold" fill="currentColor">REG</text>
                                        <text x="8.5" y="18" fontFamily="monospace" fontSize="3" fontWeight="bold" fill="currentColor">FSM_CONTROL</text>
                                    </svg>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-highlight">
                                    <Zap size={10} />
                                    <span>⚡ 40% Power Reduction Achieved</span>
                                </div>
                                <div className="project-label">RTL Design · 16-Bit</div>
                                <h3 className="project-title">16-Bit Multicycle Processor</h3>
                                <p className="project-description">
                                    Developed a 16-bit multi-cycle RISC processor with Adaptive ALU and Radix-4 Booth MAC unit in Verilog HDL. Implemented a five-stage FSM control unit with clock gating to minimize dynamic power dissipation. Synthesized at 25 MHz.
                                </p>
                                <div className="project-tech">
                                    <span>Verilog HDL</span>
                                    <span>RISC</span>
                                    <span>FSM</span>
                                    <span>Radix-4 Booth</span>
                                    <span>Clock Gating</span>
                                    <span>ModelSim</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/THARAN16/16bit-multicycle-processor" target="_blank" rel="noopener" className="project-link" aria-label="View Github code">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* Project 2 — GATED_BUS block highlight connection */}
                        <article 
                            ref={prj2Ref}
                            className={`project-card glass-card ${selectedBlock === 'GATED_BUS' ? 'highlighted' : ''}`}
                        >
                            <div className="project-image">
                                <div className="project-image-placeholder">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                                        <rect x="3" y="4" width="6" height="6" rx="1" />
                                        <rect x="15" y="4" width="6" height="6" rx="1" />
                                        <circle cx="12" cy="17" r="3" />
                                        <path d="M9 7h6M12 10v4M6 10v4" strokeLinecap="round" />
                                        <text x="11.5" y="18" fontFamily="monospace" fontSize="3" fontWeight="bold" fill="currentColor">G</text>
                                    </svg>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-label">Power Optimization · RTL</div>
                                <h3 className="project-title">Low-Power Clock Gating</h3>
                                <p className="project-description">
                                    Implemented clock gating methods in sequential digital circuits using Verilog HDL to minimize unnecessary switching transitions. Developed gated clock logic for flip-flop and register modules. Conducted functional verification via structured testbenches.
                                </p>
                                <div className="project-tech">
                                    <span>Verilog HDL</span>
                                    <span>Sequential Logic</span>
                                    <span>Flip-Flops</span>
                                    <span>Registers</span>
                                    <span>Power Optimization</span>
                                    <span>Testbench</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/THARAN16/clock-gating-sequential" target="_blank" rel="noopener" className="project-link" aria-label="View Github code">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* Project 3 — INTERFACE block highlight connection */}
                        <article 
                            ref={prj3Ref}
                            className={`project-card glass-card ${selectedBlock === 'INTERFACE' ? 'highlighted' : ''}`}
                        >
                            <div className="project-image">
                                <div className="project-image-placeholder">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                        <polyline points="2 17 12 22 22 17" />
                                        <polyline points="2 12 12 17 22 12" />
                                    </svg>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-label">Digital Design · Vivado</div>
                                <h3 className="project-title">FSM based ASCII Display</h3>
                                <p className="project-description">
                                    Developed a Finite State Machine implemented in Verilog HDL to control and drive characters to an ASCII display. Features robust state transitions, debouncing logic, and precise timing control for character rendering on hardware.
                                </p>
                                <div className="project-tech">
                                    <span>Verilog HDL</span>
                                    <span>FSM Design</span>
                                    <span>Digital Logic</span>
                                    <span>Overflow Detection</span>
                                    <span>Xilinx Vivado</span>
                                    <span>Simulation</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/THARAN16/FSM-ASCII-display" target="_blank" rel="noopener" className="project-link" aria-label="View Github code">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION — paragraph cards */}
            <section className="section skills" id="skills">
                <div className="container">
                    <h2 className="section-title">
                        Skills &amp; Expertise
                    </h2>
                    <div className="skills-para-grid">
                        {skills.map((skill) => (
                            <div className="skill-para-card glass-card" key={skill.id}>
                                <div className="skill-para-header">
                                    <div className="skill-category-icon">{skill.icon}</div>
                                    <h3 className="skill-para-title">{skill.title}</h3>
                                </div>
                                <p className="skill-para-desc">{skill.desc}</p>
                                <div className="skill-para-tags">
                                    {skill.tags.map((t) => (
                                        <span className="skill-tag" key={t}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <section className="section certifications" id="certifications">
                <div className="container">
                    <h2 className="section-title">
                        Certifications
                    </h2>
                    <div className="cert-grid">
                        <div className="cert-card glass-card">
                            <div className="cert-org">NIELIT</div>
                            <h3 className="cert-name">VLSI For Beginners</h3>
                            <div className="cert-date">JULY 2025</div>
                        </div>
                        <div className="cert-card glass-card">
                            <div className="cert-org">SRM VALLIAMMAI ENGINEERING COLLEGE — VAC</div>
                            <h3 className="cert-name">VLSI Design and Verification: Integrating Analog and Digital Systems with Vivado and Cadence</h3>
                            <div className="cert-date">APRIL 2025</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION — QR Flip Carousel */}
            <section className="section contact" id="contact">
                <div className="container">
                    <h2 className="section-title">
                        Get In Touch
                    </h2>
                    <p className="contact-intro">
                        Scan a QR code to connect instantly. Tap any card to reveal the code, 
                        then swipe/drag to browse other methods.
                    </p>
                    <div className="contact-grid">
                        {cards.map((card, i) => (
                            <div 
                                className={`flip-card ${flippedCards[card.id] ? 'flipped' : ''}`} 
                                id={`card-${card.id}`}
                                key={card.id}
                                onClick={(e) => toggleFlipCard(card.id, e)}
                                onTouchStart={(e) => {
                                    window.cardTouchX = e.touches[0].clientX;
                                }}
                                onTouchEnd={(e) => {
                                    if (window.cardTouchX && Math.abs(e.changedTouches[0].clientX - window.cardTouchX) > 30) {
                                        toggleFlipCard(card.id, e);
                                    }
                                }}
                            >
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="flip-card-icon">
                                            {card.icon}
                                        </div>
                                        <h3>{card.title}</h3>
                                        <p className="flip-card-value">{card.value}</p>
                                        <span className="flip-hint">
                                            Tap or Swipe to reveal QR
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="flip-card-qr">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=080c14&bgcolor=f0f8ff&data=${encodeURIComponent(card.qrData)}`} 
                                                alt={`${card.title} QR Code`} 
                                                loading="lazy" 
                                            />
                                        </div>
                                        <h4>{card.backTitle}</h4>
                                        <p>{card.backDesc}</p>
                                        <span className="flip-back-hint">Tap or Swipe to flip back</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-socials">
                            <a href="https://github.com/THARAN16" target="_blank" rel="noreferrer" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com/in/tharansm" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                        <p className="footer-copy">&copy; 2026 Tharan S M. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
