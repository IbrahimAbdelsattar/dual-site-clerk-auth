// Simulate Next.js Middleware Auth & Authorization Check
function simulateMiddleware(path: string, session: { userId: string | null; role?: string }) {
  const publicRoutes = ['/auth', '/unauthorized', '/api/public'];
  const isAdminRoute = path.startsWith('/admin');
  const isPublicRoute = publicRoutes.some((r) => path.startsWith(r));

  // 1. Unauthenticated check
  if (!session.userId && !isPublicRoute) {
    return { status: 307, redirect: `/auth?redirect_url=${encodeURIComponent(path)}` };
  }

  // 2. Admin authorization check
  if (isAdminRoute) {
    if (session.role !== 'admin') {
      return { status: 307, redirect: '/unauthorized' };
    }
  }

  return { status: 200, allowed: true };
}

console.log('--- RUNNING DUAL-SITE AUTH & AUTHORIZATION SUITE ---');

// Test 1: Unauthenticated user accesses public /auth page
const t1 = simulateMiddleware('/auth', { userId: null });
console.log('Test 1 (Public Auth Page):', t1.status === 200 ? 'PASS ✅' : 'FAIL ❌');

// Test 2: Unauthenticated user tries to access /user/dashboard
const t2 = simulateMiddleware('/user/dashboard', { userId: null });
console.log('Test 2 (Unauthenticated Protected User Access):', t2.redirect.startsWith('/auth') ? 'PASS ✅' : 'FAIL ❌');

// Test 3: Normal User tries to access /admin/dashboard
const t3 = simulateMiddleware('/admin/dashboard', { userId: 'user_123', role: 'user' });
console.log('Test 3 (Normal User Admin Block):', t3.redirect === '/unauthorized' ? 'PASS ✅' : 'FAIL ❌');

// Test 4: Admin User accesses /admin/dashboard
const t4 = simulateMiddleware('/admin/dashboard', { userId: 'admin_456', role: 'admin' });
console.log('Test 4 (Admin Access Granted):', t4.allowed === true ? 'PASS ✅' : 'FAIL ❌');

// Test 5: Normal User accesses /user/dashboard
const t5 = simulateMiddleware('/user/dashboard', { userId: 'user_123', role: 'user' });
console.log('Test 5 (User Access Granted):', t5.allowed === true ? 'PASS ✅' : 'FAIL ❌');
