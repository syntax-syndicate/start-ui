import { defineSemanticTokens } from '@chakra-ui/react';

export default defineSemanticTokens.colors({
  brand: {
    contrast: {
      value: {
        _light: 'white',
        _dark: 'white',
      },
    },
    fg: {
      value: {
        _light: '{colors.brand.700}',
        _dark: '{colors.brand.300}',
      },
    },
    subtle: {
      value: {
        _light: '{colors.brand.100}',
        _dark: '{colors.brand.900}',
      },
    },
    muted: {
      value: {
        _light: '{colors.brand.200}',
        _dark: '{colors.brand.800}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.brand.300}',
        _dark: '{colors.brand.700}',
      },
    },
    solid: {
      value: {
        _light: '{colors.brand.600}',
        _dark: '{colors.brand.600}',
      },
    },
    focusRing: {
      value: {
        _light: '{colors.brand.600}',
        _dark: '{colors.brand.600}',
      },
    },
  },
});
