"use client";
import { Button, Modal } from "antd";
import UUpload from "@/components/Form/UUpload";
import UInput from "@/components/Form/UInput";
import FormWrapper from "@/components/Form/FormWrapper";
import USelect from "@/components/Form/USelect";
import { useState } from "react";
import Image from "next/image";
import { CircleX } from "lucide-react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { Trash2 } from "lucide-react";

export default function EditCategoryModal({ open, setOpen }) {
  const [image, setImage] = useState(
    "https://assets.technologynetworks.com/production/dynamic/images/content/379495/parrots-have-a-unique-voice-print-379495-960x540.jpg?cb=12495383"
  );
  console.log("Image", Image);
  // handle image uploading
  const handleImageUpload = (file) => {
    setImage(file.fileList[0]);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  // Block user handler
  const handleConfirm = () => {
    message.success("User blocked successfully");
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      className="bg-light-red w-[650px]"
    >
      <div className="flex flex-col items-center gap-4 rounded-lg py-4">
        <div className="mt-4 w-full relative">
          {image ? (
            <div>
              <Image
                src={image}
                alt="category image"
                width={1000}
                height={1000}
                className="max-w-full rounded-lg"
              />
              <span className="absolute top-3 right-3">
                <CircleX
                  size={25}
                  className="text-white rounded- cursor-pointer"
                />
              </span>
            </div>
          ) : (
            <UUpload onChange={handleImageUpload} name={"image"} />
          )}
        </div>
        <FormWrapper onSubmit={onSubmit} className="!w-full">
          <div className="space-y-10">
            <UInput
              name="name"
              label="Category Name"
              placeholder="Enter subscription plan name"
            />
            <USelect
              name={"status"}
              label="Status"
              defaultValue={"Select"}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
            <div className="flex items-center gap-4">
              <CustomConfirm
                title="Delete Category"
                description="Are you sure to delete this category?"
                onConfirm={handleConfirm}
              >
                <button className="text-sm bg-white text-primary-red border border-primary-red rounded-lg py-3 px-5 w-full font-semibold hover:bg-primary-red hover:text-white duration-200">
                  Delete
                </button>
              </CustomConfirm>
              <button className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full font-semibold">
                Save
              </button>
            </div>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
}
