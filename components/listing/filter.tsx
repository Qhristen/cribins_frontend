'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import qs from 'query-string';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { UseDebounce } from '@/hooks/use-debounce';
import { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Search } from 'lucide-react';

export default function ListingFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      location: '',
      priceRange: '',
      type: '',
      sortBy: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const { search, location, priceRange, sortBy, type } = form.getValues();
  const debounceValue = UseDebounce(search);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          location,
          priceRange,
          sortBy,
          type,
          q: debounceValue
        }
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debounceValue, location, priceRange, sortBy, type, router, pathname]);

  return (
    <div className="z-20">
      <Form {...form}>
        <form className="grid-col-1 grid gap-2 lg:grid-cols-2">
          {/* <Input type="text" placeholder="search" /> */}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <button
                      type="submit"
                      className="text-primary-300 dark:text-gm-white absolute left-4 top-3 flex h-[24px]  w-[24px] items-center justify-center rounded-full p-1 transition"
                    >
                      <Search className="" />
                    </button>
                    <Input
                      disabled={isLoading}
                      className="px-14 py-6 "
                      placeholder={`Search here`}
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* <div className="flex w-full flex-row items-center justify-between gap-1 lg:gap-3">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Location"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="1">smo</SelectItem>
                      <SelectItem value="2">3</SelectItem>
                      <SelectItem value="3">6</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Price"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="1">smo</SelectItem>
                      <SelectItem value="1">3</SelectItem>
                      <SelectItem value="1">6</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Type"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="1">smo</SelectItem>
                      <SelectItem value="1">3</SelectItem>
                      <SelectItem value="1">6</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Sortby"
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="1">smo</SelectItem>
                      <SelectItem value="1">3</SelectItem>
                      <SelectItem value="1">6</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div> */}
        </form>
      </Form>
    </div>
  );
}
