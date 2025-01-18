"use client";
import { Button, Modal } from "antd";
import UUpload from "@/components/Form/UUpload";
import UInput from "@/components/Form/UInput";
import FormWrapper from "@/components/Form/FormWrapper";
import USelect from "@/components/Form/USelect";
import { useState } from "react";

export default function CreateCategoryModal({ open, setOpen }) {
  const [thumbnail, setThumbnail] = useState(undefined);
  console.log("thumbnail", thumbnail);
  // handle image uploading
  const handleThumbnailUpload = (file) => {
    setThumbnail(file.fileList[0]);
  };
  const onSubmit = (data) => {
    console.log(data);
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
        <div className="mt-4 w-full">
          <UUpload onChange={handleThumbnailUpload} name={"teamLogo"} />
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
            <Button
              htmlType="submit"
              className="common-btn w-full !mt-8"
              size="large"
            >
              Submit
            </Button>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
}
