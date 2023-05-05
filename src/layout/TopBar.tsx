import React from 'react';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Flex,
  IconButton,
  IconButtonProps,
  SlideFade,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import { Logo } from '@/components/Logo';
import { AccountMenu } from '@/layout/AccountMenu';
import { useLayoutContext } from '@/layout/LayoutContext';
import { MainMenu } from '@/layout/MainMenu';
import { NavDrawer } from '@/layout/NavDrawer';

const MenuButton = (props: Partial<IconButtonProps>) => {
  const { navOnOpen } = useLayoutContext();
  return (
    <IconButton
      aria-label="Navigation"
      icon={<FiMenu size="1.5em" />}
      onClick={navOnOpen}
      bg="transparent"
      _active={{ bg: 'gray.700' }}
      _hover={{ bg: 'gray.900' }}
      {...props}
    />
  );
};

export const TopBar = () => {
  const theme = useTheme();

  const showDrawer = useBreakpointValue({
    base: true,
    [theme.layout.breakpoints.desktop]: false,
  });

  return (
    <>
      <SlideFade in offsetY={-40} style={{ zIndex: 2 }}>
        <Flex
          position="fixed"
          top="0"
          insetStart="0"
          insetEnd="0"
          color="gray.50"
          align="center"
          pt="safe-top"
          px="4"
          h={theme.layout.topBar.height}
          bg="gray.800"
          _dark={{ bg: 'gray.900' }}
        >
          <MenuButton display={{ base: 'flex', md: 'none' }} ms="-0.5rem" />
          <Link
            href="/"
            mx={{ base: 'auto', [theme.layout.breakpoints.desktop]: 0 }}
          >
            <Logo />
          </Link>
          <MainMenu me="auto" ms="4" display={{ base: 'none', md: 'flex' }} />
          <AccountMenu />
        </Flex>
      </SlideFade>
      <Box h={theme.layout.topBar.height} />
      {showDrawer && <NavDrawer />}
    </>
  );
};
