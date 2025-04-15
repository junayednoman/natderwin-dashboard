import RecentUserTable from "../dashboard/_components/RecentUserTable";

export const metadata = {
  title: "Account Details",
  description: "Account Details page",
};

export default function AccountDetailsPage() {
  return (
    <div className="bg-[#FE5858] p-4 py-6 rounded-lg">
      <RecentUserTable
      limit={16}
        title={
          <h1 className="capitalize text-3xl font-semibold text-white">
            Account Details
          </h1>
        }
      />
    </div>
  );
}
