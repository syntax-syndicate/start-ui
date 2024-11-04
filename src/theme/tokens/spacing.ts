import { defineTokens } from '@chakra-ui/react';

export default defineTokens.spacing({
  'safe-top': { value: 'env(safe-area-inset-top)' },
  'safe-bottom': { value: 'env(safe-area-inset-bottom)' },
  'safe-left': { value: 'env(safe-area-inset-left)' },
  'safe-right': { value: 'env(safe-area-inset-right)' },
});
