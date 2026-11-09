import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioApp = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x8B5CF6, 
      transparent: true, 
      opacity: 0.3 
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xA78BFA,
      transparent: true,
      opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      particlesMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    gsap.from(navRef.current, { y: -100, opacity: 0, duration: 1, delay: 0.2 });
    gsap.from(heroRef.current.children, { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.2, 
      delay: 0.5 
    });

    ScrollTrigger.batch(".project-card", {
      onEnter: (elements) => {
        gsap.from(elements, { 
          y: 100, 
          opacity: 0, 
          duration: 0.8, 
          stagger: 0.15 
        });
      }
    });

    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.from(".skill-card", { 
          scale: 0, 
          opacity: 0, 
          duration: 0.6, 
          stagger: 0.1 
        });
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-40"
      />
      
      <nav 
        ref={navRef}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            R. Mahalakshmi
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection(heroRef)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(aboutRef)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
            R. Mahalakshmi
          </h1>
          <h2 className="text-3xl md:text-4xl text-gray-700 mb-8 font-light">
            Future Innovator
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            2nd year CSE student passionate about Python and Full Stack Development, 
            creating innovative solutions for tomorrow's challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                I'm a dedicated Computer Science Engineering student with a passion for technology 
                and innovation. Currently in my 2nd year, I'm actively learning Python programming 
                and Full Stack Development to build a strong foundation for my future career.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My journey in tech has been exciting, from mastering HTML and CSS to diving deep 
                into Python. I believe in continuous learning and creating solutions that make 
                a difference.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="skill-card bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">HTML</span>
                </div>
                <h3 className="font-semibold text-gray-800">HTML</h3>
                <p className="text-sm text-gray-600">Semantic markup</p>
              </div>
              <div className="skill-card bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">CSS</span>
                </div>
                <h3 className="font-semibold text-gray-800">CSS</h3>
                <p className="text-sm text-gray-600">Modern styling</p>
              </div>
              <div className="skill-card bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">PY</span>
                </div>
                <h3 className="font-semibold text-gray-800">Python</h3>
                <p className="text-sm text-gray-600">Backend logic</p>
              </div>
              <div className="skill-card bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">FS</span>
                </div>
                <h3 className="font-semibold text-gray-800">Full Stack</h3>
                <p className="text-sm text-gray-600">Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 px-6 bg-white/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="project-card bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-purple-400 via-indigo-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-3 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Welcome Back</div>
                      <div className="text-sm font-semibold text-gray-800">Sign In</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Interactive Login Page</h3>
                <p className="text-gray-600 mb-4">
                  Modern authentication interface featuring glassmorphism design, smooth micro-interactions, 
                  and responsive form validation with elegant user experience.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">HTML5</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">CSS3</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">JavaScript</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Animations</span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  View Live Demo
                </button>
              </div>
            </div>

            <div className="project-card bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                <div className="text-white text-6xl">🐍</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Python Learning Projects</h3>
                <p className="text-gray-600 mb-4">
                  Collection of Python scripts and mini-projects showcasing fundamental programming concepts.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Algorithms</span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  View Code
                </button>
              </div>
            </div>

            <div className="project-card bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                <div className="text-white text-6xl">🎨</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">CSS Art Gallery</h3>
                <p className="text-gray-600 mb-4">
                  Creative CSS animations and designs demonstrating advanced styling techniques.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">CSS</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Animations</span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  Explore Art
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Let's Connect</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                I'm always excited to collaborate on new projects or discuss opportunities 
                in technology and innovation. Feel free to reach out!
              </p>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">✉</span>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <a 
                    href="mailto:meenamaha786@gmail.com" 
                    className="text-purple-600 hover:text-purple-800 transition-colors duration-300"
                  >
                    meenamaha786@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-800 text-center text-gray-400">
        <p>&copy; 2024 R. Mahalakshmi. Future Innovator in the making.</p>
      </footer>
    </div>
  );
};

export default PortfolioApp;