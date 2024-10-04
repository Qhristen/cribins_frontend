'use client';

import '@dialectlabs/blinks/index.css';
import { Blink, useAction } from '@dialectlabs/blinks';
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana';
import { useState } from 'react';
import { NETWORK } from '@/lib/constant';
import SkeletonCard from './skeleton-card';
import { useTheme } from 'next-themes';

interface Props {
  actionApiUrl: string;
}
const BlinkComponent = ({ actionApiUrl }: Props) => {
  // const [action, setAction] = useState<Action | null>(null);
  // useAction initiates registry, adapter and fetches the action.
  const { adapter } = useActionSolanaWalletAdapter(
    'https://api.devnet.solana.com'
  );
  const { action } = useAction({ url: actionApiUrl, adapter });
  const { theme } = useTheme();

  return (
    <div className="h-10 w-full p-4">
      {action ? (
        <Blink
          stylePreset={theme === 'dark' ? 'x-dark' : 'x-light'}
          action={action}
          websiteText={new URL(actionApiUrl).hostname}
          securityLevel={'all'}
        />
      ) : (
        <SkeletonCard />
      )}
    </div>
  );
};

export default BlinkComponent;
