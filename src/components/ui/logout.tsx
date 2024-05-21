'use client';

import * as React from 'react';

import { cn } from '@/libraries/utils';
import { Slot } from '@radix-ui/react-slot';
import { signOut } from 'next-auth/react';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const LogOut = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const Comp = Slot;
    return (
      <Comp
        className={cn(className)}
        ref={ref}
        {...props}
        onClick={() =>
          signOut({
            redirect: false,
          }).then(() => (window.location.href = '/'))
        }
      />
    );
  }
);
LogOut.displayName = 'LogOut';

export { LogOut };
