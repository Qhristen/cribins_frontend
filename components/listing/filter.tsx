'use client';

import React from 'react';
import { Input } from '../ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

export default function ListingFilter() {
  return (
    <div className="z-20 flex flex-col items-center justify-between gap-3 lg:flex-row">
      <Input type="text" placeholder="search" />

      <div className="flex w-full flex-row items-center justify-between gap-1 lg:gap-3">
        <Select
        // disabled={loading}
        // onValueChange={field.onChange}
        // value={field.value}
        // defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue
              // defaultValue={field.value}
              placeholder="Location"
            />
          </SelectTrigger>

          <SelectContent>
            {/* @ts-ignore  */}

            <SelectItem value="1">smo</SelectItem>
            <SelectItem value="2">3</SelectItem>
            <SelectItem value="3">6</SelectItem>
          </SelectContent>
        </Select>

        <Select
        // disabled={loading}
        // onValueChange={field.onChange}
        // value={field.value}
        // defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue
              // defaultValue={field.value}
              placeholder="Price"
            />
          </SelectTrigger>

          <SelectContent>
            {/* @ts-ignore  */}

            <SelectItem value="1">smo</SelectItem>
            <SelectItem value="1">3</SelectItem>
            <SelectItem value="1">6</SelectItem>
          </SelectContent>
        </Select>
        <Select
        // disabled={loading}
        // onValueChange={field.onChange}
        // value={field.value}
        // defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue
              // defaultValue={field.value}
              placeholder="Type"
            />
          </SelectTrigger>

          <SelectContent>
            {/* @ts-ignore  */}

            <SelectItem value="1">smo</SelectItem>
            <SelectItem value="1">3</SelectItem>
            <SelectItem value="1">6</SelectItem>
          </SelectContent>
        </Select>
        <Select
        // disabled={loading}
        // onValueChange={field.onChange}
        // value={field.value}
        // defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue
              // defaultValue={field.value}
              placeholder="Sortby"
            />
          </SelectTrigger>

          <SelectContent>
            {/* @ts-ignore  */}

            <SelectItem value="1">smo</SelectItem>
            <SelectItem value="1">3</SelectItem>
            <SelectItem value="1">6</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
