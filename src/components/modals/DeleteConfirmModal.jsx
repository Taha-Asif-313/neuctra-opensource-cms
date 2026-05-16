import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  Button,
} from "@neuctra/ui";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} disableOverlayClose={loading}>
      <ModalContent onClose={onClose}>
        <ModalHeader
          icon={
            <div className="p-2 rounded-lg bg-destructive/5 text-destructive">
              <Trash2 size={18} />
            </div>
          }
          title={title}
          onClose={onClose}
        />

        <ModalBody className="py-6!">
          <p className="text-sm">{description}</p>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <ModalButton
            loading={loading}
            closeOnClick={false}
            action={async () => {
              await onConfirm?.();
              onClose();
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
