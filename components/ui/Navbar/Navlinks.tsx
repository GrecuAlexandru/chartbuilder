'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import ChartBuilderLogo from '@/components/icons/ChartBuilderLogo';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <header className="sticky top-0 border-b border-opacity-0 bg-background/30 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl sm:px-16 lg:px-18">
        <div className="flex h-16 items-center justify-between">
          <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <ChartBuilderLogo className="h-9 w-9" />
              <span>ChartBuilder</span>
            </Link>
            {!user && (
              <Link
                href="/builder"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                Builder
              </Link>
            )}
            <Link
              href="/templates"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              Templates
            </Link>
            <Link
              href="/help"
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user && (
              <Link
                href="/settings"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
            )}
            {!user && (
              <>
                <Link href="/signin/password_signin" className="text-foreground/80 transition-colors hover:text-foreground text-lg font-medium md:text-sm mr-2">Sign In</Link>
                <Link href="/signin/signup" className="ml-4">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
