import SingleReportDetails from "../SingleReportDetails";
export const metadata = {
  title: "Single report",
  description: "Single report",
};

export default async function SingleReportPage({ params }) {
  const id = await params?.id;

  return (
    <main className="bg-[#FE5858] p-6 rounded-lg mb-6">
      <SingleReportDetails id={id} />
    </main>
  );
}
