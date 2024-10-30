/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react';
import React, { forwardRef } from 'react';

import { Link as TanStackLink } from '@tanstack/react-router';
import { type ComponentProps } from 'react';

type BaseProps = ComponentProps<typeof TanStackLink>;

interface LinkProps extends Omit<BaseProps, 'to'> {
  href: BaseProps['to'];
  children: React.ReactNode;
}

export const Link = forwardRef(function Link(
  props: LinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <TanStackLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  );
});
