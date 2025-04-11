"use client";

import { useUpdateProfileMutation } from "../../../../redux/api/profileApi";
import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { editProfileSchema } from "../../../../schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import handleMutation from "../../../../utils/handleMutation";

export default function EditProfileForm({ admin }) {
  const [updateProfile] = useUpdateProfileMutation();
  const handleSubmit = (data) => {
    console.log("data2", data);
    handleMutation(data, updateProfile, "Updating profile...");
  };

  return (
    <section className="mt-5 w-[550px] mx-auto">
      <h4 className="font-semibold text-2xl text-white text-center mb-4">
        Edit Your Profile
      </h4>
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: admin?.name,
          email: admin?.email,
          phone: admin?.phone || "",
        }}
      >
        <div className="text-white edit-profile">
          <UInput name="name" label="Name" type="text" />

          <div className="!my-10">
            <UInput name="email" label="Email" type="email" disabled />
          </div>
          <UInput name="phone" label="Phone" type="text" />

          <button
            type="submit"
            className="text-base bg-white border border-primary-red text-primary-black rounded-lg py-3 px-5 mt-5 w-full font-semibold"
          >
            Save Changes
          </button>
        </div>
      </FormWrapper>
    </section>
  );
}
