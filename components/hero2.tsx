'use client';

import {
  AppStoreIcon,
  LogoDark,
  LogoLight,
  PlayStoreIcon
} from '@/assets/icons';
import {
  AppIcon,
  AppIcon_dark,
  AppIcon_white,
  HomeAd,
  House1
} from '@/assets/images';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Container from './container';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <Card className="mb-60 flex h-screen flex-col-reverse items-center justify-center gap-2 border-none lg:flex-row lg:gap-10">
        <div className="flex w-full items-center justify-center lg:justify-end">
          <Image
            alt="app"
            src={House1}
            className="w-30 lg:w-50 pt-10 lg:p-0"
            width={800}
            height={800}
            style={{
              clipPath:
                'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)'
            }}
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
          <h1 className="text-wrap  text-2xl font-black text-primary lg:text-4xl">
            Seamlessly Connecting <br /> You to Your Next Home.
          </h1>

          <p className="text-md text-wrap pt-4">
            Discover Your Perfect Home Without the Hassle <br />
            Explore, Compare, and Connect with Ease.
          </p>
          <div className="flex items-center gap-3 pt-6">
            <Link href={`/#property`}>
              <Button
                size={`lg`}
                variant={`secondary`}
                className="flex w-full items-center lg:w-auto"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Hero;
