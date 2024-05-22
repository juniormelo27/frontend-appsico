'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/libraries/utils';
import { ChevronDown, XIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from './button';
import { useFormField } from './form';
import { Separator } from './separator';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverValue = React.forwardRef<
  HTMLButtonElement,
  {
    placeholder: string;
  }
>(({ placeholder, ...props }, ref) => {
  const { name } = useFormField();
  const context = useFormContext();
  const value = context.watch(name);

  return (
    <Button
      ref={ref}
      {...props}
      className='flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-card'
    >
      {!!value ? (
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-wrap items-center font-normal capitalize text-gray-500 pl-2'>
            {value}
          </div>
          <div className='flex items-center justify-between'>
            <XIcon
              className='h-4 mx-2 cursor-pointer text-muted-foreground'
              onClick={(event) => {
                context.resetField(name);

                event.stopPropagation();
              }}
            />
            <Separator orientation='vertical' className='flex min-h-6 h-full' />
            <ChevronDown className='h-4 mx-2 cursor-pointer text-muted-foreground' />
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between w-full mx-auto'>
          <span className='text-sm text-muted-foreground font-normal mx-2'>
            {placeholder}
          </span>
          <ChevronDown className='h-4 cursor-pointer text-muted-foreground mx-2' />
        </div>
      )}
    </Button>
  );
});
PopoverValue.displayName = 'PopoverValue';

export { Popover, PopoverContent, PopoverTrigger, PopoverValue };
