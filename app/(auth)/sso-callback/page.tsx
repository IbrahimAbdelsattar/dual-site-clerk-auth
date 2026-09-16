import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark text-slate-200 font-cairo">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-sapphire-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-slate-400">Completing secure authentication...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
