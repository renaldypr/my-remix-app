import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export function AddCommunityForm({ onSuccess }: { onSuccess: () => void }) {
  const fetcher = useFetcher();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      url: "",
      type: "",
      mainLanguage: "",
      platform: "",
      geographicFocus: "",
      accessType: "",
      moderationStyle: "",
      creationDate: "",
      communityImage: "",
    },
    validate: {
      // name: (value) => value.length > 0 || "Please enter your name",
      // url: (value) => value.length > 0 || "Please enter a url",
    },
  });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      form.reset();
      onSuccess();
    }
  }, [fetcher]);

  return (
    <fetcher.Form method="post" action="/dashboard">
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
      >
        Create New Community
      </Title>

      <SimpleGrid cols={1}>
        <TextInput
          name="name"
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <TextInput
          name="url"
          label="Url"
          placeholder="Url"
          {...form.getInputProps("url")}
        />
        <TextInput
          name="type"
          label="Type"
          placeholder="Type"
          {...form.getInputProps("type")}
        />
        <TextInput
          name="mainLanguage"
          label="Main Language"
          placeholder="Main Language"
          {...form.getInputProps("mainLanguage")}
        />
        <TextInput
          name="platform"
          label="Platform"
          placeholder="Platform"
          {...form.getInputProps("platform")}
        />
        <TextInput
          name="geographicFocus"
          label="Geographic Focus"
          placeholder="Geographic Focus"
          {...form.getInputProps("geographicFocus")}
        />
        <TextInput
          name="accessType"
          label="Access Type"
          placeholder="Access Type"
          {...form.getInputProps("accessType")}
        />
        <TextInput
          name="moderationStyle"
          label="Moderation Style"
          placeholder="Moderation Style"
          {...form.getInputProps("moderationStyle")}
        />
        <TextInput
          name="creationDate"
          label="Creation Date"
          placeholder="Creation Date"
          {...form.getInputProps("creationDate")}
        />
        <TextInput
          name="communityImage"
          label="Community Image"
          placeholder="Community Image"
          {...form.getInputProps("communityImage")}
        />
      </SimpleGrid>

      <Group justify="center" mt="xl">
        <Button type="submit" size="md" loading={fetcher.state !== "idle"}>
          Submit
        </Button>
      </Group>
    </fetcher.Form>
  );
}
