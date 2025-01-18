"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { editProfileSchema } from "@/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";

export default function EditProfileForm() {
  const handleSubmit = (data) => {
    console.log(data);
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
          name: "Justina Ojuyluv",
          email: "justina.ojuyluv@gmail.com",
          contact: "+1234567890",
        }}
      >
        <div className="text-white edit-profile">
          <UInput name="name" label="Name" type="text" />

          <div className="!my-10">
            <UInput
              name="email"
              label="Email"
              type="email"
              disabled
            />
          </div>
          <UInput name="contact" label="Contact" type="contact" />

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
