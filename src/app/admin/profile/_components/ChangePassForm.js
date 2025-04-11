"use client";

import FormWrapper from "../../../../components/Form/FormWrapper";
import UInput from "../../../../components/Form/UInput";
import { useChangePasswordMutation } from "../../../../redux/api/authApi";
import { changePasswordSchema } from "../../../../schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import handleMutation from "../../../../utils/handleMutation";

export default function ChangePassForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleSubmit = (data) => {
    handleMutation(data, changePassword, "Updating password...");
  };

  return (
    <section className="px-10 mt-5">
      <h4 className="font-semibold text-2xl text-white text-center mb-4">
        Change Password
      </h4>
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
      >
        <div className="change-password-form">
          <UInput
            name="oldPassword"
            label="Old Password"
            type="password"
            placeholder="***********"
          />
          <div className="!my-10">
            <UInput
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="***********"
            />
          </div>
          <UInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="***********"
          />

          <button
            disabled={isLoading}
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
