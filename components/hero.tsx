'use client';

import { AppStoreIcon, LogoDark, LogoLight, PlayStoreIcon } from '@/assets/icons';
import { AppIcon, AppIcon_dark, AppIcon_white, HomeAd } from '@/assets/images';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <Card className="flex flex-col-reverse items-center justify-center gap-2 border-none mb-60 mt-20 lg:flex-row lg:gap-10">
      <div className="flex w-full items-center justify-center lg:justify-end">
        <Image
          alt="app"
          src={theme === "light" ? AppIcon_white : AppIcon_dark}
          className="w-30 pt-10 lg:p-0 lg:w-50"
          width={400}
          height={400}
        />
      </div>

      <div className="w-full">
        <div className="flex items-center pb-4">
          {/* <Image
              src={theme === "light" ? <LogoDark /> : <LogoLight />}
              width={30}
              height={30}
              alt="cribins_logo"
            /> */}
          {/* {theme === 'light' ? (
            <LogoDark className="scale-75 lg:scale-90" />
          ) : (
            <LogoLight className="scale-75 lg:scale-90" />
          )} */}
          {/* <span className="font-bold text-4xl">Cribins</span> */}
        </div>
        <h1 className="text-wrap text-2xl font-black lg:text-4xl">
          Buy, rent, or sell your <br /> property easily.
        </h1>

        <p className="text-wrap pt-6 text-sm">
          A great platform to buy, sell, or even rent  your <br />properties without
          any commisions.
        </p>
        <div className='flex items-center flex-col gap-3 pt-6 lg:flex-row'>
          <Button size={`lg`} variant={`secondary`} className='flex w-full items-center lg:w-auto'><PlayStoreIcon className="scale-50" />Play store</Button>
          <Button size={`lg`} variant={`secondary`} className='flex w-full items-center lg:w-auto'><AppStoreIcon className="scale-50 fill-black dark:fill-white" />App store</Button>
        </div>
      </div>
    </Card>
  );
};

export default Hero;
