import { createSystem, defaultConfig } from '@chakra-ui/react';

import semanticTokens from '@/theme/semanticTokens';
import tokens from '@/theme/tokens';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens,
    semanticTokens,
  },
  globalCss: {},
});
