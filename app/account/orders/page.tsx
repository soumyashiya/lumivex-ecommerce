'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { orders } from '@/lib/api';
import { formatPrice } from '@/components/providers/CartProvider';

type OrderRow = Record<string, unknown>;

const STATUS_STYLES: Record<string, string> = {
  paid: 'bg-mint text-green',
  received: 'bg-mint text-green',
  pending: 'bg-amber-500/10 text-amber-600',
  rejected: 'bg-red-600/10 text-red-600',
};

export default function MyOrdersPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login?next=/account/orders');
      return;
    }
    orders
      .byEmail(user.email)
      .then((res) => setRows(res.orders))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="container-ag flex min-h-[60vh] items-center justify-center py-24">
        <span className="h-6 w-6 animate-spin rounded-pill border-2 border-grey-100 border-t-green" />
      </div>
    );
  }

  return (
    <div className="container-ag py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="label-mono">Account</span>
          <h1 className="mt-3 text-h2 tracking-tighter text-black">
            My orders
          </h1>
          {user && (
            <p className="mt-2 text-sm text-grey-500">
              Signed in as {user.email}
            </p>
          )}
        </div>
        <button
          onClick={logout}
          className="underline-offset-4 hover:underline text-[13px] font-medium text-grey-500 hover:text-black"
        >
          Sign out
        </button>
      </div>

      {error && (
        <p className="rounded-sm border border-red-600/20 bg-red-600/5 px-4 py-3 text-[13px] text-red-600/90">
          {error}
        </p>
      )}

      {!error && rows.length === 0 ? (
        <p className="text-sm text-grey-500">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <ul className="divide-y divide-[color:var(--border-soft)] border-t border-[color:var(--border-soft)]">
          {rows.map((row, i) => {
            const orderNumber = String(row.order_number ?? '—');
            const total = Number(row.total ?? 0);
            const createdAt = row.created_at ? new Date(String(row.created_at)) : null;
            const status = String(row.payment_status ?? 'pending').toLowerCase();
            return (
              <li key={orderNumber || i} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="min-w-0">
                  <Link
                    href={`/account/track?order=${encodeURIComponent(orderNumber)}`}
                    className="underline-offset-4 hover:underline font-mono text-[13px] font-medium tracking-wide text-black"
                  >
                    {orderNumber}
                  </Link>
                  <p className="mt-1 text-[12px] text-grey-500">
                    {createdAt && !isNaN(createdAt.getTime())
                      ? createdAt.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-pill px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
                      STATUS_STYLES[status] ?? 'bg-green-deep text-grey-500'
                    }`}
                  >
                    {status}
                  </span>
                  <span className="text-[15px] text-black">
                    {formatPrice(total)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
