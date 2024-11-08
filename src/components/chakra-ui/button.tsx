'use client';

import { forwardRef } from 'react';

import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
  chakra,
} from '@chakra-ui/react';

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;

    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  }
);

const primaryStyle = {
  bg: 'colorPalette.solid',
  color: 'colorPalette.contrast',
  _hover: {
    bg: 'colorPalette.solid/90',
  },
  _expanded: {
    bg: 'colorPalette.solid/90',
  },
};

const secondaryStyle = {
  bg: 'colorPalette.subtle',
  color: 'colorPalette.fg',
  shadow: 'inset 0 0 0px 1px var(--shadow-color)',
  shadowColor: 'colorPalette.muted',
  _hover: {
    bg: 'colorPalette.muted',
  },
  _expanded: {
    bg: 'colorPalette.muted',
  },
};

export const Button = chakra(CustomButton, {
  base: {
    fontWeight: 'medium',
    colorPalette: 'gray',
  },
  defaultVariants: { variant: 'surface' },
  variants: {
    variant: {
      '@primary': {
        colorPalette: 'brand',
        ...primaryStyle,
      },
      '@secondary': {
        colorPalette: 'brand',
        ...secondaryStyle,
      },
      '@success': {
        colorPalette: 'green',
        ...primaryStyle,
      },
      '@successSecondary': {
        colorPalette: 'green',
        ...secondaryStyle,
      },
      '@danger': {
        colorPalette: 'red',
        ...primaryStyle,
      },
      '@dangerSecondary': {
        colorPalette: 'red',
        ...secondaryStyle,
      },
      // default Chakra variants
      solid: primaryStyle,
      surface: secondaryStyle,
      ghost: {
        color: 'colorPalette.fg',
        bg: 'colorPalette.500/05',
        _hover: {
          bg: 'colorPalette.500/15',
        },
        _expanded: {
          bg: 'colorPalette.500/15',
        },
      },
    },
  },
});
