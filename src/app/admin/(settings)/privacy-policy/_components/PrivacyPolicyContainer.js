"use client";

import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../../../redux/api/settingApi";
import FormWrapper from "../../../../../components/Form/FormWrapper";
import UTextEditor from "../../../../../components/Form/UTextEditor";
import handleMutation from "../../../../../utils/handleMutation";

export default function PrivacyPolicyContainer() {
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const { data } = useGetSettingsQuery();
  const privacy_policy = data?.data?.privacy_policy;

  const handleSubmit = (data) => {
    handleMutation(data, updateSettings, "Updating privacy policy...");
  };

  return (
    <section className="bg-primary-red rounded-lg p-5">
      <h3 className="text-2xl font-semibold mb-6 text-white">Privacy Policy</h3>
      <FormWrapper defaultValues={{ privacy_policy }} onSubmit={handleSubmit}>
        <UTextEditor
          name="privacy_policy"
          placeholder="Note: Enter details about your privacy policy here."
        />

        <button
          disabled={isLoading}
          className="text-base disabled:opacity-60 bg-white border border-primary-red text-primary-black rounded-lg py-3 px-5 w-full mt-5 font-semibold"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </FormWrapper>
    </section>
  );
}
