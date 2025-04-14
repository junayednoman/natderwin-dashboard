import SingleReportDetails from "../SingleReportDetails";
export const metadata = {
  title: "Account Details",
  description: "Account details page",
};

export default async function AccountPage({ params }) {
  const id = await params?.id;

  return (
    <main className="bg-[#FE5858] p-6 rounded-lg mb-6">
      <SingleReportDetails id={id} />
    </main>
  );
}
