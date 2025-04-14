"use client";
import Image from "next/image";
import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
} from "../../../../redux/api/profileApi";
import Spinner from "../../../../components/spinner/Spinner";
import ErrorMessage from "../../../../components/ErrorMessage/ShowError";
import { Upload } from "antd";
import { ImageUp } from "lucide-react";
import spinnerImg from "../../../../assets/images/spinner white.svg";
import handleMutation from "../../../../utils/handleMutation";
import { debounce } from "lodash";

const { TabPane } = Tabs;

export default function ProfileContainer() {
  const { data, isLoading, error } = useGetProfileQuery();
  const admin = data?.data;
  const [updateImage, { isLoading: isUploading }] =
    useUpdateProfileImageMutation();

  const handleImageUpload = async (file) => {
    // Debounced function to call the API
    const formData = new FormData();
    formData.append("image", file.file.originFileObj);
    console.log("file", file.file.originFileObj);

    handleMutation(formData, updateImage, "Updating Image...");
  };

  // Debounce the handleImageUpload to prevent multiple API calls
  const debouncedHandleImageUpload = debounce(handleImageUpload, 500);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      {isLoading ? (
        <Spinner className="py-44" />
      ) : error ? (
        <ErrorMessage
          showBtn
          className="text-center py-44 text-lg"
          message={error?.message}
        />
      ) : (
        <div className="bg-primary-red rounded-lg p-5 text-white">
          <section className="flex-center gap-x-3">
            <div className="relative w-max">
              {/* Profile pic */}
              <Image
                src={isUploading ? spinnerImg : admin.image}
                alt="Admin avatar"
                width={1200}
                height={1200}
                className="w-[130px] h-auto aspect-square rounded-full border-2 border-white p-1"
              />

              <Upload
                onChange={debouncedHandleImageUpload}
                listType="picture"
                maxCount={1}
                className="!w-[50px] profileUploader"
                style={{ width: "50px", overflow: "hidden" }}
              >
                {/* Edit button */}
                <button className="bg-white p-2 aspect-square rounded-full flex-center text-primary-black absolute bottom-8 right-0">
                  <ImageUp size={20} />
                </button>
              </Upload>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-semibold">{admin.name}</h3>
              <p className="font-medium text-white mt-1 text-lg">Admin</p>
            </div>
          </section>

          {/* Profile Information Forms */}
          <section className="my-16">
            <Tabs defaultActiveKey="editProfile" centered>
              <TabPane tab="Edit Profile" key="editProfile">
                <EditProfileForm admin={admin} />
              </TabPane>

              <TabPane tab="Change Password" key="changePassword">
                <ChangePassForm />
              </TabPane>
            </Tabs>
          </section>
        </div>
      )}
    </ConfigProvider>
  );
}
