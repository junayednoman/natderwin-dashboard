import RecentUserTable from "../dashboard/_components/RecentUserTable";

export const metadata = {
  title: "Account Details",
  description: "Account Details page",
};

export default function AccountDetailsPage() {
  return (
    <div className="bg-[#FE5858] p-4 py-6 rounded-lg">
      <RecentUserTable
        title={
          <h1 className="capitalize text-3xl font-semibold text-white mb-6">
            Account Details
          </h1>
        }
      />
    </div>
  );
}
