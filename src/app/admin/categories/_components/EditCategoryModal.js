"use client";
import { Modal } from "antd";
import UUpload from "../../../../components/Form/UUpload";
import UInput from "../../../../components/Form/UInput";
import FormWrapper from "../../../../components/Form/FormWrapper";
import USelect from "../../../../components/Form/USelect";
import { useState } from "react";
import Image from "next/image";
import { CircleX } from "lucide-react";
import CustomConfirm from "../../../../components/CustomConfirm/CustomConfirm";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../redux/api/categoryApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";
import handleMutation from "../../../../utils/handleMutation";

export default function EditCategoryModal({ open, setOpen, id }) {
  const [image, setImage] = useState(
    "https://assets.technologynetworks.com/production/dynamic/images/content/379495/parrots-have-a-unique-voice-print-379495-960x540.jpg?cb=12495383"
  );
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const { data, isLoading, error } = useGetSingleCategoryQuery(id, {
    skip: !open || !id,
  });
  const category = data?.data;

  // handle image uploading
  const handleImageUpload = (file) => {
    setImage(file.file.originFileObj);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const onSubmit = (data) => {
    const payload = new FormData();

    // Append the text data to FormData
    payload.append("payload", JSON.stringify(data));

    if (image && typeof image === "object") payload.append("image", image);

    handleMutation(
      { id, payload },
      updateCategory,
      "Updating category...",
      () => {
        setOpen(false);
        setImage(category?.image);
      }
    );
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
      {isLoading ? (
        <Spinner className="py-44" />
      ) : error ? (
        <ErrorMessage
          black
          className="py-44 text-center !text-black"
          showBtn
          message={error?.data?.message}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg py-4">
          <div className="mt-4 w-full relative">
            {image && typeof image === "string" ? (
              <div>
                <Image
                  src={category?.image || image}
                  alt="category image"
                  width={1000}
                  height={1000}
                  className="max-w-full rounded-lg"
                />
                <span
                  onClick={handleDeleteImage}
                  className="absolute top-3 right-3"
                >
                  <CircleX
                    size={25}
                    className="text-primary-red rounded- cursor-pointer"
                  />
                </span>
              </div>
            ) : (
              <UUpload onChange={handleImageUpload} name={"image"} />
            )}
          </div>
          <FormWrapper
            defaultValues={{ name: category?.name, status: category?.status }}
            onSubmit={onSubmit}
            className="!w-full"
          >
            <div className="space-y-10">
              <UInput
                name="name"
                label="Category Name"
                placeholder="Enter subscription plan name"
              />
              <USelect
                defaultValue={category?.status}
                name={"status"}
                label="Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
              <div className="flex items-center gap-4">
                <button
                  disabled={isUpdating}
                  className="text-sm disabled:opacity-60 bg-primary-red border border-primary-red text-white rounded-lg py-3 px-5 w-full font-semibold"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </FormWrapper>
        </div>
      )}
    </Modal>
  );
}
