"use client";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../../../redux/api/settingApi";
import FormWrapper from "../../../../../components/Form/FormWrapper";
import UTextEditor from "../../../../../components/Form/UTextEditor";
import handleMutation from "../../../../../utils/handleMutation";

export default function TermsConditionsContainer() {
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const { data } = useGetSettingsQuery();
  const terms_conditions = data?.data?.terms_conditions;

  const handleSubmit = (data) => {
    handleMutation(data, updateSettings, "Updating privacy policy...");
  };

  return (
    <section className="bg-primary-red rounded-lg p-5">
      <h3 className="text-2xl font-semibold mb-6 text-white">
        Terms and Conditions
      </h3>

      <FormWrapper defaultValues={{ terms_conditions }} onSubmit={handleSubmit}>
        <UTextEditor
          name="terms_conditions"
          placeholder="Note: Enter details about your terms and conditions here."
        />

        <button
          disabled={isLoading}
          className="text-base bg-white border border-primary-red text-primary-black rounded-lg py-3 px-5 w-full mt-5 font-semibold"
        >
          Save Changes
        </button>
      </FormWrapper>
    </section>
  );
}
