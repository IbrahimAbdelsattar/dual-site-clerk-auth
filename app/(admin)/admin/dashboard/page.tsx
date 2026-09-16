import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Activity, 
  Settings, 
  UserPlus, 
  ArrowLeft,
  Key,
  Shield,
  Layers,
  Database
} from 'lucide-react';

export default async function AdminDashboard() {
  const user = await currentUser();
  const userRole = (user?.publicMetadata as { role?: string })?.role || 'admin';

  return (
    <div className="min-h-screen bg-brand-dark font-cairo text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="border-b border-indigo-900/40 bg-brand-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">Admin Console</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                Elevated Privileges
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/user/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>User Site</span>
            </Link>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-200">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">ROLE: {userRole}</p>
            </div>
            <UserButton afterSignOutUrl="/auth" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header Banner */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden border border-indigo-900/30">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 text-xs font-medium mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Restricted System Domain</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Administrative Control Center
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              You are authenticated as an Administrator. Server middleware has validated your session claims against <code className="text-indigo-300 font-mono">publicMetadata.role === 'admin'</code>.
            </p>
          </div>
        </div>

        {/* System Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="glass-panel rounded-xl p-4 border border-brand-border/60 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Users</p>
              <p className="text-xl font-bold text-white mt-0.5">1,420</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 border border-brand-border/60 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Active Admins</p>
              <p className="text-xl font-bold text-white mt-0.5">12</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 border border-brand-border/60 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/40">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Auth Requests/hr</p>
              <p className="text-xl font-bold text-white mt-0.5">485</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 border border-brand-border/60 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-sapphire-950/80 text-sapphire-400 border border-sapphire-800/40">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Clerk Instances</p>
              <p className="text-xl font-bold text-white mt-0.5">1 Unified</p>
            </div>
          </div>
        </div>

        {/* User Role Provisioning Guide Card */}
        <div className="glass-panel rounded-2xl p-6 border border-brand-border/60 mb-8">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <span>How Admin Roles are Assigned via Clerk Backend</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Because all sign-ups default to <code className="text-slate-200 font-mono">role: "user"</code>, elevate a user to admin using Clerk Backend SDK or Clerk Dashboard:
          </p>

          <div className="bg-brand-dark/90 p-4 rounded-xl border border-brand-border/80 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-indigo-300">
{`// Example: Setting Admin Role via Clerk Node / Next.js Server API
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: {
    role: 'admin'
  }
});`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
