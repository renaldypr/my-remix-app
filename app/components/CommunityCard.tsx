import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { Community } from "db/schema";

export function CommunityCard({ community }: { community: Community }) {
  const {
    communityImage: image,
    name: title,
    description,
    platform,
    mainLanguage,
    geographicFocus,
    accessType,
    type,
    url,
  } = community;

  const tags = (
    <>
      <Badge variant="light" key={mainLanguage}>
        {mainLanguage}
      </Badge>
      <Badge variant="light" key={geographicFocus}>
        {geographicFocus}
      </Badge>
      <Badge variant="light" key={accessType}>
        {accessType}
      </Badge>
      <Badge variant="light" key={type}>
        {type}
      </Badge>
    </>
  );

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className="bg-white dark:bg-gray-800 max-w-xs"
    >
      <Card.Section>
        <Image src={image} alt={title} h={180} />
      </Card.Section>

      <Card.Section className="border-b border-gray-300 dark:border-gray-600 px-4 pb-4 mt-4 h-28">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {platform}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className="border-b border-gray-300 dark:border-gray-600 px-4 pb-4">
        <Text
          mt="md"
          className="uppercase text-xs font-bold text-gray-500 dark:text-gray-400"
        >
          Tags
        </Text>
        <Group gap={7} mt={5}>
          {tags}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            Show details
          </Link>
        </Button>
      </Group>
    </Card>
  );
}
