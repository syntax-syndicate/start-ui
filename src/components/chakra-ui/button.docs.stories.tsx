import { HStack } from '@chakra-ui/react';

import { Button } from '@/components/chakra-ui/button';

export default {
  title: 'ui/Button',
};

export const Default = () => {
  return <Button>Trigger</Button>;
};

export const Primary = () => {
  return <Button variant="@primary">Trigger</Button>;
};

export const Secondary = () => {
  return <Button variant="@secondary">Trigger</Button>;
};

export const Success = () => {
  return (
    <HStack>
      <Button variant="@success">Trigger</Button>
      <Button variant="@successSecondary">Trigger</Button>
    </HStack>
  );
};

export const Danger = () => {
  return (
    <HStack>
      <Button variant="@danger">Trigger</Button>
      <Button variant="@dangerSecondary">Trigger</Button>
    </HStack>
  );
};

export const Ghost = () => {
  return <Button variant="ghost">Trigger</Button>;
};

export const ColorPalette = () => {
  return (
    <HStack>
      <Button colorPalette="orange">Trigger</Button>
      <Button colorPalette="pink">Trigger</Button>
      <Button colorPalette="cyan">Trigger</Button>
      <Button colorPalette="red">Trigger</Button>
      <Button colorPalette="green">Trigger</Button>
    </HStack>
  );
};
