'use client';

import * as React from 'react';

import { cn } from '@/libraries/utils';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { Button } from './button';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className='relative w-full'>
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute top-0 bottom-0 right-1 z-10 w-8 h-8 self-center'
            onClick={() => setShow((value) => !value)}
          >
            {!show && <LucideEye className='w-4 h-4 text-slate-500' />}
            {show && <LucideEyeOff className='w-4 h-4 text-slate-500' />}
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
