'use client';

import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Github,
  Globe,
  Sparkles,
  LayoutDashboard,
  Shield
} from 'lucide-react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  
  // Feedback state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/user/dashboard';

  // Handle OAuth Redirect
  const handleOAuth = async (provider: 'oauth_google' | 'oauth_github') => {
    if (!isSignInLoaded) return;
    try {
      setError(null);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: redirectUrl,
      });
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'OAuth authentication failed.');
    }
  };

  // Handle Log In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInLoaded) return;
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        router.push(redirectUrl);
      } else {
        console.log('SignIn requires further action:', result);
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpLoaded) return;
    setLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email Verification Code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpLoaded) return;
    setLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setSignUpActive({ session: completeSignUp.createdSessionId });
        router.push(redirectUrl);
      } else {
        setError('Verification incomplete. Please check code.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-brand-dark font-cairo">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sapphire-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sapphire-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sapphire-500/30 bg-sapphire-900/40 text-sapphire-300 text-xs font-medium tracking-wide mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-sapphire-300" />
          <span>Unified Enterprise Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-300 via-sapphire-400 to-indigo-300">DualAuth Portal</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
          One authentication window for both Normal User & Admin Dashboard access.
        </p>
      </motion.div>

      {/* Main Glass Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl z-10 relative border border-brand-border/60"
      >
        {/* Sliding Tab Switcher Header */}
        <div className="relative flex bg-brand-dark/80 p-1.5 rounded-xl border border-brand-border/80 mb-6">
          {/* Animated Highlight Slider */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 rounded-lg bg-gradient-to-r from-sapphire-600 to-sapphire-500 shadow-md"
            initial={false}
            animate={{
              left: activeTab === 'login' ? '0.375rem' : '50%',
              width: 'calc(50% - 0.375rem)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          />

          <button
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'login' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setActiveTab('signup'); setError(null); }}
            className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'signup' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Dynamic Window Shift (Login / Sign Up Forms) */}
        <AnimatePresence mode="wait">
          {pendingVerification ? (
            /* Email Verification Step for Signup */
            <motion.form
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyCode}
              className="space-y-4"
            >
              <div className="text-center py-2">
                <Mail className="w-10 h-10 text-sapphire-300 mx-auto mb-2 animate-bounce" />
                <h3 className="text-lg font-bold text-white">Check your email</h3>
                <p className="text-xs text-slate-400 mt-1">
                  We sent a 6-digit verification code to <span className="text-sapphire-300">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Verification Code</label>
                <input
                  type="text"
                  required
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full glass-input rounded-lg px-4 py-2.5 text-center text-lg tracking-widest font-mono text-white placeholder-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-sapphire-600 hover:bg-sapphire-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-sapphire-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : activeTab === 'login' ? (
            /* LOG IN FORM */
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Password</label>
                  <a href="#forgot" className="text-xs text-sapphire-300 hover:text-sapphire-200 transition-colors">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-sapphire-600 to-sapphire-500 hover:from-sapphire-500 hover:to-sapphire-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-sapphire-600/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In to Portal'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            /* SIGN UP FORM */
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full glass-input rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full glass-input rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-sapphire-600 to-sapphire-500 hover:from-sapphire-500 hover:to-sapphire-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-sapphire-600/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create New Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-border/80" />
          </div>
          <span className="relative bg-brand-card px-3 text-xs text-slate-500 font-medium">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuth('oauth_google')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-brand-border bg-brand-dark/50 hover:bg-brand-dark/90 text-slate-300 text-xs font-medium transition-colors"
          >
            <Globe className="w-4 h-4 text-red-400" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('oauth_github')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-brand-border bg-brand-dark/50 hover:bg-brand-dark/90 text-slate-300 text-xs font-medium transition-colors"
          >
            <Github className="w-4 h-4 text-slate-200" />
            <span>GitHub</span>
          </button>
        </div>

        {/* Dual Site Info Footer */}
        <div className="mt-6 pt-4 border-t border-brand-border/40 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <LayoutDashboard className="w-3.5 h-3.5 text-sapphire-400" />
              User Portal
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              Admin Dashboard
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
