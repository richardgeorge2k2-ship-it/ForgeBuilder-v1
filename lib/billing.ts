import { supabaseServer } from "./supabase/server";

export type UserTier = 'free' | 'starter' | 'pro' | 'elite';

/**
 * Server-side utility to get the current user's subscription tier.
 * Useful for protecting routes or features in Server Components.
 */
export async function getUserTier(): Promise<UserTier> {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return 'free';

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('price_id, status')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle();

  if (!sub || sub.status !== 'active') return 'free';

  const priceId = sub.price_id;

  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE) return 'elite';
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) return 'pro';
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) return 'starter';

  return 'free';
}

/**
 * Checks if a user has at least a certain tier.
 */
export async function hasTierAccess(requiredTier: UserTier): Promise<boolean> {
  const currentTier = await getUserTier();
  
  const tierWeights: Record<UserTier, number> = {
    'free': 0,
    'starter': 1,
    'pro': 2,
    'elite': 3
  };

  return tierWeights[currentTier] >= tierWeights[requiredTier];
}
