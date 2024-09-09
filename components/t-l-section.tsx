'use client';

import {
  AppStoreIcon,
  LogoDark,
  LogoLight,
  PlayStoreIcon
} from '@/assets/icons';
import { HomeAd } from '@/assets/images';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';

const TLSection = () => {
  const { theme } = useTheme();

  return (
    <Card className="mb-20 flex flex-col-reverse items-center justify-center gap-2 rounded-none border-none  bg-black/5 p-4 lg:flex-row lg:gap-10 lg:p-10 dark:bg-zinc-900">
      <div className="w-full">
        <Image
          alt="app"
          src={HomeAd}
          // className="w-50 h-50"
          width={800}
          height={800}
        />
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-black text-primary lg:text-4xl">
          Cribins makes it easy for tenants, property owners, and real estate
          professionals.
        </h1>

        <p className="text-wrap pt-4 text-sm">
          Whether you’re selling your current home, buying or renting a new one,
          Cribins makes it easy and efficient. The best part? You'll save time
          and money with our seamless platform and innovative virtual property
          inspections.
        </p>
        <div className="flex flex-col items-center gap-3 pt-6 lg:flex-row">
          <Button
            size={`lg`}
            variant={`secondary`}
            className="flex w-full items-center lg:w-auto"
          >
            <PlayStoreIcon className="scale-50" />
            Play store
          </Button>
          <Button
            size={`lg`}
            variant={`secondary`}
            className="flex w-full items-center lg:w-auto"
          >
            <AppStoreIcon className="scale-50 fill-black dark:fill-white" />
            App store
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TLSection;
