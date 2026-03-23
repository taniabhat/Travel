import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, Eye, EyeOff, Facebook, User, ArrowRight, Plane } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { login, register } from '../services/api';

const RegSign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.pathname === '/register');
  const [showPassword, setShowPassword] = useState(false);

  // Check if redirected due to session expiry
  const searchParams = new URLSearchParams(location.search);
  const sessionExpired = searchParams.get('expired') === 'true';
  const [error, setError] = useState(sessionExpired ? 'Your session has expired. Please log in again.' : '');

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  // Refs for animations
  const slidingPanelRef = useRef(null);
  const loginContentRef = useRef(null);
  const registerContentRef = useRef(null);
  const containerRef = useRef(null);
  const leftImageRef = useRef(null);
  const leftOverlayRef = useRef(null);
  const rightOverlayRef = useRef(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  // Initial page load animation
  useEffect(() => {
    gsap.fromTo(containerRef.current,
      {
        scale: 0.9,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
        clearProps: "all"
      }
    );
  }, []);

  // Check if already logged in
  useEffect(() => {
    // Don't auto-redirect if user was just kicked out for expired session
    if (sessionExpired) return;
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate, sessionExpired]);

  const toggleMode = () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    if (!isRegister) {
      // Switching to Register - Move panel to LEFT (0%)
      tl.to(loginContentRef.current, {
        opacity: 0,
        x: 10,
        duration: 0.3,
        pointerEvents: 'none'
      })
        .to(leftOverlayRef.current, {
          opacity: 0.15,
          duration: 0.5
        }, "-=0.3")
        .to(slidingPanelRef.current, {
          xPercent: -100,
          duration: 0.7
        }, "-=0.5")
        .to(leftOverlayRef.current, {
          opacity: 0,
          duration: 0.4
        }, "-=0.4")
        .to(registerContentRef.current, {
          opacity: 1,
          x: 0,
          pointerEvents: 'auto',
          duration: 0.3
        }, "-=0.5")
        .from(registerContentRef.current?.children || [], {
          y: 15,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4
        }, "-=0.2");
    } else {
      // Switching to Login - Move panel to RIGHT (100%)
      tl.to(registerContentRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        pointerEvents: 'none'
      })
        .to(rightOverlayRef.current, {
          opacity: 0.15,
          duration: 0.5
        }, "-=0.3")
        .to(slidingPanelRef.current, {
          xPercent: 0,
          duration: 0.7
        }, "-=0.5")
        .to(rightOverlayRef.current, {
          opacity: 0,
          duration: 0.4
        }, "-=0.4")
        .to(loginContentRef.current, {
          opacity: 1,
          x: 0,
          pointerEvents: 'auto',
          duration: 0.3
        }, "-=0.5")
        .from(loginContentRef.current?.children || [], {
          y: 15,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4
        }, "-=0.2");
    }

    setIsRegister(!isRegister);
    setShowPassword(false);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginData.email, loginData.password);
      navigate('/profile'); // Redirect to profile or home
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(registerData.name, registerData.email, registerData.password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-playfair text-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#faf9f6]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-space text-sm">
        <ArrowRight className="rotate-180" size={16} />
        Back to Home
      </Link>

      <div ref={containerRef} className="max-w-5xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative min-h-[680px] flex flex-col md:block z-10 border border-slate-200">

        {/* --- MOBILE VIEW (Simple Stack) --- 
            Hidden on Desktop
        */}
        <div className="md:hidden w-full p-8 flex flex-col justify-center bg-white/80 backdrop-blur-md z-20">
          <div className="mb-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-slate-800 rounded-full">
                <Plane className="w-6 h-6 text-slate-900" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 font-playfair">
              {isRegister ? 'Join WayFarer' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600 font-space text-sm">
              {isRegister ? 'Start your journey with us today.' : 'Continue exploring the world.'}
            </p>
          </div>
          {isRegister ? (
            <RegisterForm
              data={registerData}
              onChange={handleRegisterChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              toggleMode={toggleMode}
              onSubmit={handleRegisterSubmit}
            />
          ) : (
            <LoginForm
              data={loginData}
              onChange={handleLoginChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              toggleMode={toggleMode}
              onSubmit={handleLoginSubmit}
              error={error}
            />
          )}
        </div>

        {/* --- DESKTOP VIEW --- */}

        {/* BACKGROUND IMAGES LAYER (Z-0) */}
        <div className="hidden md:block absolute inset-0 w-full h-full z-0">
          {/* Left Image (Visible during Login) */}
          <div ref={leftImageRef} className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
              <div ref={leftOverlayRef} className="absolute inset-0 bg-white z-20 pointer-events-none" style={{ opacity: 0 }}></div>
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop"
                alt="Mountain Lake"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-8 z-20 text-white max-w-md">
                <h2 className="text-2xl font-bold leading-snug font-playfair">
                  "The world is a book, and those who do not travel read only one page."
                </h2>
                <p className="text-sm text-white/80 mt-2 font-space">— Saint Augustine</p>
              </div>
            </div>
          </div>

          {/* Right Image (Visible during Register - Revealed when form moves Left) */}
          <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
              <div ref={rightOverlayRef} className="absolute inset-0 bg-white z-20 pointer-events-none" style={{ opacity: 0 }}></div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1470&auto=format&fit=crop"
                alt="Travel Adventure"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-12 right-8 z-20 text-white text-right max-w-md ml-auto">
                <h2 className="text-2xl font-bold leading-snug font-playfair">
                  "Travel is the only thing you buy that makes you richer."
                </h2>
                <p className="text-sm text-white/80 mt-2 font-space">— Anonymous</p>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDING FORM PANEL (Z-10) */}
        <div
          ref={slidingPanelRef}
          className="hidden md:flex flex-col justify-center absolute top-0 h-full w-1/2 z-10 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-slate-200"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="w-full h-full relative overflow-hidden flex items-center">

            {/* LOGIN CONTENT (Visible when form is on Right) */}
            <div
              ref={loginContentRef}
              className="absolute inset-0 px-8 py-8 lg:px-16 lg:py-12 flex flex-col justify-center overflow-y-auto"
              style={{ opacity: 1, transform: 'translateX(0)' }}
            >
              <div className="mb-8 text-left">
                <div className="mb-4">
                  <div className="inline-block p-2 bg-slate-800 rounded-full">
                    <Plane className="w-5 h-5 text-slate-900" />
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2 font-playfair">Welcome Back</h1>
                <p className="text-slate-600 text-base lg:text-lg font-space">Continue exploring the world.</p>
              </div>
              <LoginForm
                data={loginData}
                onChange={handleLoginChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                toggleMode={toggleMode}
                onSubmit={handleLoginSubmit}
                error={error}
              />
            </div>

            {/* REGISTER CONTENT (Visible when form is on Left) */}
            <div
              ref={registerContentRef}
              className="absolute inset-0 px-8 py-8 lg:px-16 lg:py-12 flex flex-col justify-center overflow-y-auto"
              style={{ opacity: 0, transform: 'translateX(-10px)', pointerEvents: 'none' }}
            >
              <div className="mb-6 text-left">
                <div className="mb-4">
                  <div className="inline-block p-2 bg-slate-800 rounded-full">
                    <Plane className="w-5 h-5 text-slate-900" />
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2 font-playfair">Join WayFarer</h1>
                <p className="text-slate-600 text-base lg:text-lg font-space">Start your journey with us today.</p>
              </div>
              <RegisterForm
                data={registerData}
                onChange={handleRegisterChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                toggleMode={toggleMode}
                onSubmit={handleRegisterSubmit}
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const LoginForm = ({ data, onChange, showPassword, setShowPassword, toggleMode, onSubmit, error }) => {
  const submitBtnRef = useRef(null);

  useEffect(() => {
    const btn = submitBtnRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        y: -2,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    btn?.addEventListener('mouseenter', handleMouseEnter);
    btn?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn?.removeEventListener('mouseenter', handleMouseEnter);
      btn?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <form onSubmit={onSubmit} className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-space">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-white transition-colors">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-0 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-900"
              value={data.email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-bold text-slate-700 tracking-wide font-space">Password</label>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-800 transition-colors">
              <Lock size={18} strokeWidth={1.5} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-0 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-900 font-space"
              value={data.password}
              onChange={onChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>
          <div className="flex justify-end pt-1">
            <a href="#" className="text-sm font-semibold text-slate-800 hover:text-slate-600 transition-colors font-space">
              Forgot password?
            </a>
          </div>
        </div>

        <button ref={submitBtnRef} type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg text-base tracking-wide font-space">
          Sign In
        </button>
      </div>

      <div className="text-center mt-5 mb-4">
        <p className="text-slate-600 text-sm font-space">
          Don't have an account?{' '}
          <button type="button" onClick={toggleMode} className="text-slate-800 font-bold hover:text-slate-600 transition-colors">
            Register Now
          </button>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-grow h-px bg-slate-200"></div>
        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest font-space">Or continue with</span>
        <div className="flex-grow h-px bg-slate-200"></div>
      </div>

      <SocialButtons />
    </form>
  );
};

const RegisterForm = ({ data, onChange, showPassword, setShowPassword, toggleMode, onSubmit }) => {
  const submitBtnRef = useRef(null);

  useEffect(() => {
    const btn = submitBtnRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        y: -2,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(37 99 235 / 0.3), 0 8px 10px -6px rgb(37 99 235 / 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    btn?.addEventListener('mouseenter', handleMouseEnter);
    btn?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn?.removeEventListener('mouseenter', handleMouseEnter);
      btn?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="space-y-4">

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide font-space">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-800 transition-colors">
              <User size={18} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-0 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-900 font-space"
              value={data.name}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-white transition-colors">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-0 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-900"
              value={data.email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1 tracking-wide font-space">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-800 transition-colors">
              <Lock size={18} strokeWidth={1.5} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-0 outline-none transition-all duration-200 placeholder:text-slate-400 font-medium text-slate-900 font-space"
              value={data.password}
              onChange={onChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <button ref={submitBtnRef} type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base tracking-wide font-space">
          Create Account <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="text-center mt-5 mb-4">
        <p className="text-slate-600 text-sm font-space">
          Already have an account?{' '}
          <button type="button" onClick={toggleMode} className="text-slate-800 font-bold hover:text-slate-600 transition-colors">
            Sign In
          </button>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-grow h-px bg-slate-200"></div>
        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest font-space">Or continue with</span>
        <div className="flex-grow h-px bg-slate-200"></div>
      </div>

      <SocialButtons />
    </form>
  );
};

const SocialButtons = () => {
  const googleBtnRef = useRef(null);
  const facebookBtnRef = useRef(null);

  useEffect(() => {
    [googleBtnRef.current, facebookBtnRef.current].forEach((btn) => {
      if (!btn) return;

      const handleMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          y: -2,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          y: 0,
          boxShadow: '0 0 0 0 rgb(0 0 0 / 0)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      btn.addEventListener('mouseenter', handleMouseEnter);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <button ref={googleBtnRef} type="button" className="flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 backdrop-blur-sm font-space">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Google
      </button>
      <button ref={facebookBtnRef} type="button" className="flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 backdrop-blur-sm font-space">
        <Facebook className="w-5 h-5 text-[#1877F2]" fill="#1877F2" color="white" />
        <span className="text-[#1877F2] font-semibold">Facebook</span>
      </button>
    </div>
  );
};

export default RegSign;