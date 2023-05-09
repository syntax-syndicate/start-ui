import React, { FC } from 'react';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { AuthProvider } from '@/app/auth-context';
import '@/config';
import { AVAILABLE_LANGUAGES } from '@/constants/i18n';
import theme from '@/theme';

const queryClient = new QueryClient();

export const Providers: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CacheProvider>
          <ChakraProvider
            theme={{
              ...theme,
              direction:
                AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)
                  ?.dir ?? 'ltr',
            }}
          >
            {children}
          </ChakraProvider>
        </CacheProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
