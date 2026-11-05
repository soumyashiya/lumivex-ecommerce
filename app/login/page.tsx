'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/';
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-ag flex min-h-[60vh] items-center justify-center section-y">
      <div className="w-full max-w-md">
        
        <h1 className="text-h2 text-black">
          Sign in
        </h1>
        <p className="mt-3 text-sm text-grey-500">
          Sign in to track your orders.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <label className="flex flex-col gap-2">
            <span className="label-mono">
              Email address
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="label-mono">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
          </label>

          {error && (
            <p className="rounded-card border border-danger/30 bg-danger-bg px-md py-smd text-sm text-black">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-grey-500">
          No account?{' '}
          <Link
            href={`/register?next=${encodeURIComponent(next)}`}
            className="underline-offset-4 hover:underline font-medium text-black"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
