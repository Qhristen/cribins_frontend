
'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';
import Logo_light from '@/assets/images/logo_light.png'
import Logo_Dark from '@/assets/images/logo.png'

const Hero = () => {
    const { theme } = useTheme();

    return (
        <div className="flex items-center justify-center gap-10 space-y-4 p-4 pt-10">
        <Image
          alt="app"
          src={`/images/app.png`}
          className="w-50 h-50 scale-90"
          width={400}
          height={400}
        />
        <div>
          <div className='flex items-center gap-2 pb-4'>
            <Image
              src={theme === "light" ? Logo_Dark : Logo_light}
              width={30}
              height={30}
              alt="cribins_logo"
            />
            <span className="font-bold text-2xl">Cribins</span>
          </div>
          <h1 className="text-4xl font-black">
            Buy, rent, or sell <br /> your property easily
          </h1>

          <p className='pt-4 text-sm'>A great platform to buy, sell, or even <br /> rent your properties without any commisions.</p>
        </div>
      </div>
    );
};

export default Hero;