import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { AddCommunityForm } from "./AddCommunityForm";
import { notifications } from "@mantine/notifications";

export function AddCommunityModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSuccess = () => {
    close();
    notifications.show({
      title: "Community Added",
      message: "Community added successfully",
      color: "green",
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered size="xl">
        <AddCommunityForm onSuccess={handleSuccess} />
      </Modal>

      <div className="fixed bottom-10 right-10 z-50">
        <Button onClick={open} className="rounded-full" size="lg">
          Add Community
        </Button>
      </div>
    </>
  );
}
