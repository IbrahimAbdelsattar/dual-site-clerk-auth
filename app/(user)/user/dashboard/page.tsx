import React from 'react';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  LayoutDashboard, 
  Sparkles, 
  ArrowUpRight,
  LogOut,
  Shield,
  KeyRound
} from 'lucide-react';

export default async function UserDashboard() {
  const user = await currentUser();
  const userRole = (user?.publicMetadata as { role?: string })?.role || 'user';

  return (
    <div className="min-h-screen bg-brand-dark font-cairo text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-brand-border/80 bg-brand-card/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sapphire-600 to-sapphire-400 flex items-center justify-center shadow-md shadow-sapphire-600/30">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">DualAuth Portal</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-sapphire-900/60 text-sapphire-300 border border-sapphire-500/30">
                User Site
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-200">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-[10px] text-slate-400 capitalize">Role: <span className="text-sapphire-300 font-bold">{userRole}</span></p>
            </div>
            <UserButton afterSignOutUrl="/auth" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Hero */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sapphire-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sapphire-900/50 text-sapphire-300 border border-sapphire-500/30 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Normal User Environment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Hello, {user?.firstName || 'User'}! 👋
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              You are signed in to the user portal. Your access level is governed by Clerk metadata role-based access control.
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Account & Metadata Overview */}
          <div className="glass-panel rounded-xl p-5 border border-brand-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sapphire-900/60 text-sapphire-300 border border-sapphire-500/30">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white">Session Profile</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-medium">
                Active Session
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-brand-border/40">
                <span className="text-slate-400">User ID</span>
                <span className="font-mono text-slate-200 truncate max-w-[160px]">{user?.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-brand-border/40">
                <span className="text-slate-400">Primary Email</span>
                <span className="text-slate-200 truncate max-w-[160px]">{user?.emailAddresses[0]?.emailAddress}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-brand-border/40">
                <span className="text-slate-400">Assigned Role</span>
                <span className="font-semibold text-sapphire-300 capitalize">{userRole}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Admin Site Authorization Test */}
          <div className="glass-panel rounded-xl p-5 border border-brand-border/60">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-lg bg-indigo-900/60 text-indigo-300 border border-indigo-500/30">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Admin Site Gatekeeper</h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Navigating to the Admin Dashboard (`/admin/dashboard`) is protected by server middleware. Only users with <code className="text-sapphire-300">publicMetadata.role === 'admin'</code> are permitted.
            </p>

            <Link
              href="/admin/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-brand-dark/90 hover:bg-sapphire-900/40 text-slate-200 border border-brand-border hover:border-sapphire-500/40 text-xs font-semibold transition-all duration-200 group"
            >
              <span>Test Admin Access Gate</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          </div>

          {/* Card 3: Security & RBAC Specs */}
          <div className="glass-panel rounded-xl p-5 border border-brand-border/60">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-lg bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">RBAC Status</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Next.js App Router route group isolation active.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Clerk custom publicMetadata role claims synchronized.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
