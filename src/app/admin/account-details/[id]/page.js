import SingleAccountDetails from "../SingleAccountDetails";

export const metadata = {
  title: "Account Details",
  description: "Account details page",
};

export default async function ReportContentPage({ params }) {
  const id = await params?.id;

  return (
    <main>
      <SingleAccountDetails id={id} />
    </main>
  );
}
