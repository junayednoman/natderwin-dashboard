import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";

const { TabPane } = Tabs;

export default function ProfileContainer() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="bg-primary-red rounded-lg p-5 text-white">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={"https://africageographic.com/wp-content/uploads/2024/04/Team.png"}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="w-[130px] h-auto aspect-square rounded-full border-2 border-white p-1"
            />

            {/* Edit button */}
            <button className="bg-white p-2 aspect-square rounded-full flex-center text-primary-black absolute bottom-2 right-2">
              <ImagePlus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-semibold">Justina Ojuyluv</h3>
            <p className="font-medium text-white mt-1 text-lg">Admin</p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered>
            <TabPane tab="Edit Profile" key="editProfile">
              <EditProfileForm />
            </TabPane>

            <TabPane tab="Change Password" key="changePassword">
              <ChangePassForm />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </ConfigProvider>
  );
}
