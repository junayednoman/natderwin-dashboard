import SingleAccountDetails from "../SingleAccountDetails";

export const metadata = {
  title: "Report Content Details",
  description: "Report content details page",
};

export default async function ReportContentPage({ params }) {
  const id = await params?.id;

  return (
    <main>
      <SingleAccountDetails id={id} />
    </main>
  );
}
