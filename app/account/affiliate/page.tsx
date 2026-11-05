'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { affiliate } from '@/lib/api';
import { formatPrice } from '@/components/providers/CartProvider';

type Dashboard = Awaited<ReturnType<typeof affiliate.dashboard>>;

export default function AffiliatePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    affiliate
      .dashboard()
      .then((d) => setData(d))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login?next=/account/affiliate');
      return;
    }
    refresh();
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
      <div className="mb-10">
        <span className="label-mono">Account</span>
        <h1 className="mt-3 text-h2 tracking-tighter text-black">
          Affiliate program
        </h1>
      </div>

      {error && (
        <p className="mb-6 rounded-sm border border-red-600/20 bg-red-600/5 px-4 py-3 text-[13px] text-red-600/90">
          {error}
        </p>
      )}

      {data && data.is_affiliate ? (
        <AffiliateDashboard data={data} />
      ) : (
        <AffiliateRequest onJoined={refresh} />
      )}
    </div>
  );
}

function AffiliateRequest({ onJoined }: { onJoined: () => void }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', tiktok_link: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await affiliate.request(form);
      onJoined();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <p className="text-sm text-grey-700">
        Apply for an affiliate code. Approval is automatic — you’ll receive a
        promo code that earns wallet credit on every referred order.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <Input label="First name" value={form.first_name} onChange={onChange('first_name')} required maxLength={64} />
        <Input label="Last name" value={form.last_name} onChange={onChange('last_name')} required maxLength={64} />
        <Input label="TikTok handle or link" value={form.tiktok_link} onChange={onChange('tiktok_link')} required maxLength={255} placeholder="@yourhandle" />

        {error && (
          <p className="rounded-sm border border-red-600/20 bg-red-600/5 px-4 py-3 text-[13px] text-red-600/90">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-pill bg-green py-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Submitting…' : 'Apply for affiliate'}
        </button>
      </form>
    </div>
  );
}

function AffiliateDashboard({
  data,
}: {
  data: Extract<Dashboard, { is_affiliate: true }>;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-smd bg-off-white p-8">
          <p className="text-[11px] uppercase tracking-label text-grey-500">
            Your promo code
          </p>
          <p className="mt-3 font-mono text-3xl tracking-wide text-black">
            {data.promo_code}
          </p>
          <p className="mt-2 text-sm text-grey-500">
            {data.promo_percent}% off for customers · {formatPrice(data.reward_amount)} per order to you
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Balance" value={formatPrice(data.wallet_balance)} />
          <Stat label="Total earned" value={formatPrice(data.total_earned)} />
          <Stat label="Customers" value={String(data.unique_customers)} />
          <Stat label="Status" value={data.status} />
        </div>
      </div>

      <div className="lg:col-span-8">
        <h2 className="text-[11px] uppercase tracking-label text-grey-500">
          Recent redemptions
        </h2>
        {data.recent_redemptions.length === 0 ? (
          <p className="mt-6 text-sm text-grey-500">
            No redemptions yet.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-[color:var(--border-soft)]">
            {data.recent_redemptions.map((r) => (
              <li key={r.order_number} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-black">
                    {r.order_number}
                  </p>
                  <p className="text-[12px] text-grey-500">
                    {r.customer_email_masked} · {new Date(r.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <span className="text-[14px] font-medium text-green">
                  +{formatPrice(r.reward_amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-smd border border-[color:var(--border-soft)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-grey-500">{label}</p>
      <p className="mt-1 text-base font-medium text-black">{value}</p>
    </div>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-medium text-grey-500">{label}</span>
      <input
        {...props}
        className="rounded-sm border border-[color:var(--border-soft)] bg-white px-4 py-3 text-sm text-black outline-none focus:border-green"
      />
    </label>
  );
}
