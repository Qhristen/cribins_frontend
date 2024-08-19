'use client';

import { AppStoreIcon, LogoDark, LogoLight, PlayStoreIcon } from '@/assets/icons';
import { HomeAd } from '@/assets/images';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';

const TLSection = () => {
  const { theme } = useTheme();

  return (
    <Card className="flex flex-col-reverse items-center justify-center gap-2 bg-black/5 rounded-none p-4  border-none mb-20 dark:bg-zinc-900 lg:flex-row lg:gap-10 lg:p-10">
      <div className='w-full'>

      <Image
        alt="app"
        src={HomeAd}
        // className="w-50 h-50"
        width={800}
        height={800}
        />
        </div>
      <div className='w-full'>
        <h1 className="text-2xl font-black lg:text-4xl">
          We make it easy for <br /> tenants and landlords.
        </h1>

        <p className="pt-4 text-sm text-wrap">
          Whether it’s selling your current home, gettingfinancing, or
          buying a new home, we make it easy andefficient. The best
          part? you’ll save a bunch of moneyand time with our services.
        </p>
        <div className='flex items-center flex-col gap-3 pt-6 lg:flex-row'>
          <Button size={`lg`} variant={`secondary`} className='flex w-full items-center lg:w-auto'><PlayStoreIcon className="scale-50" />Play store</Button>
          <Button size={`lg`} variant={`secondary`} className='flex w-full items-center lg:w-auto'><AppStoreIcon className="scale-50 fill-black dark:fill-white" />App store</Button>
        </div>
      </div>
    </Card>
  );
};

export default TLSection;
