import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  Button,
  Input,
} from "@neuctra/ui";

import { ImagePlus } from "lucide-react";

const CoverImageModal = ({ isOpen, onClose, formData, setFormData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent onClose={onClose} className="max-w-xl">
        <ModalHeader
          icon={
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ImagePlus size={18} />
            </div>
          }
          title="Add Cover Image"
          onClose={onClose}
        />

        <ModalBody className="space-y-5 py-6!">
          {/* IMAGE URL */}
          <Input
            label="Image URL"
            placeholder="https://example.com/cover.jpg"
            value={formData.coverImage || ""}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                coverImage: e.target.value,
              }))
            }
          />

          {/* PREVIEW */}
          {formData.coverImage ? (
            <div className="rounded-2xl overflow-hidden border border-zinc-800">
              <img
                src={formData.coverImage}
                alt="Cover Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          ) : (
            <div className="h-64 rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-sm text-zinc-400">
              No image selected
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <ModalButton onClick={onClose} className="rounded-xl">
            Save Cover
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoverImageModal;
