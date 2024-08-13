
'use client';

import { LogoDark, LogoLight } from '@/assets/icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

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
          <div className='flex items-center pb-4'>
            {/* <Image
              src={theme === "light" ? <Logo_Dark /> : <Logo_light />}
              width={30}
              height={30}
              alt="cribins_logo"
            /> */}
            {theme === "light" ? <LogoDark className="scale-90" /> : <LogoLight  className="scale-90" />}
            <span className="font-bold text-4xl">Cribins</span>
          </div>
          <h1 className="text-6xl font-black">
            Buy, rent, or sell <br /> your property <br /> easily.
          </h1>

          <p className='pt-4 text-sm'>A great platform to buy, sell, or even <br /> rent your properties without any commisions.</p>
        </div>
      </div>
    );
};

export default Hero;