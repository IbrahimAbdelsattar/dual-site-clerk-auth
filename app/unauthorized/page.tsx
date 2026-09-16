import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark font-cairo text-slate-100">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 text-center border border-red-900/40 relative overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-800/50 flex items-center justify-center mx-auto mb-4 text-red-400">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight">403 — Access Denied</h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          You do not have administrative privileges to access the Admin Console. Your user role lacks <code className="text-red-300 font-mono">publicMetadata.role === 'admin'</code>.
        </p>

        <div className="mt-6 pt-6 border-t border-brand-border/60 flex flex-col gap-2.5">
          <Link
            href="/user/dashboard"
            className="w-full py-2.5 px-4 rounded-lg bg-sapphire-600 hover:bg-sapphire-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to User Portal</span>
          </Link>
          <Link
            href="/auth"
            className="w-full py-2 px-4 rounded-lg bg-brand-dark hover:bg-brand-card text-slate-400 text-xs font-medium transition-colors"
          >
            Sign in with a different account
          </Link>
        </div>
      </div>
    </div>
  );
}
