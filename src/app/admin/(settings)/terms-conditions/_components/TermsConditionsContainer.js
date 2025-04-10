"use client";

import FormWrapper from "../../../../../components/Form/FormWrapper";
import UTextEditor from "../../../../../components/Form/UTextEditor";

export default function TermsConditionsContainer() {
  return (
    <section className="bg-primary-red rounded-lg p-5">
      <h3 className="text-2xl font-semibold mb-6 text-white">
        Terms and Conditions
      </h3>

      <FormWrapper>
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your terms and conditions here."
        />

        <button className="text-base bg-white border border-primary-red text-primary-black rounded-lg py-3 px-5 w-full mt-5 font-semibold">
          Save Changes
        </button>
      </FormWrapper>
    </section>
  );
}
