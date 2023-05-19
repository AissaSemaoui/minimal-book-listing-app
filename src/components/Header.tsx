import { Stack, Title } from "@mantine/core";

function Header({ className }: { className: string }) {
  return (
    <Stack spacing="xs" className={className}>
      <img className="logo-lg" src="./logo.png" alt="Buy local books network" />
      <Title order={1} size="h2" color="gray.8" align="center">
        Book Listing Application
      </Title>
    </Stack>
  );
}

export default Header;
