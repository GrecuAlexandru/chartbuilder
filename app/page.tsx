import Pricing from '@/components/ui/Pricing/Pricing';
import ChartBuilder from '@/components/ui/ChartBuilder/ChartBuilder';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import LandingPage from '@/components/ui/LandingPage/LandindPage';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <div>
      {
        user ?
          <ChartBuilder />
          :
          <LandingPage />
        // <Pricing
        //   user={user}
        //   products={products ?? []}
        //   subscription={subscription}
        // />
      }
    </div>
  );
}
