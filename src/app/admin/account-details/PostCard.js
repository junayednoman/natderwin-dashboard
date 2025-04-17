import CustomConfirm from "../../../components/CustomConfirm/CustomConfirm";
import MiniProfile from "../../../components/MiniProfile/MiniProfile";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function PostCard({ post }) {
  const onPopConfirm = () => {
    console.log("deleted");
  };

  const profileData = {
    name: post?.author?.name,
    location: post?.author?.location,
    image: post?.author?.profile_image,
  };

  // for images
  const getGridClass = () => {
    if (post?.images?.length === 1) return "grid-cols-1";
    if (post?.images?.length === 2) return "grid-cols-2";
    if (post?.images?.length === 3) return "grid-cols-2";
    return "grid-cols-2"; // For 4 or more
  };

  const imageClass = (index) => {
    if (post?.images?.length === 3 && index === 0) {
      return "col-span-2"; // Make first image span full width in 2 cols
    }
    return "";
  };

  return (
    <div className="border p-2 rounded-lg border-primary-black">
      <div className="flex justify-between">
        <MiniProfile data={profileData} />
        <CustomConfirm
          description={"Are you sure you want to delete this post?"}
          onConfirm={onPopConfirm}
        >
          <Trash2 className="cursor-pointer" />
        </CustomConfirm>
      </div>
      <div className="my-3">
        <p>{post?.caption}</p>
      </div>
      <div className={`grid gap-2 mt-4 ${getGridClass()}`}>
        {post?.images?.map((image, index) => (
          <div key={index} className={imageClass(index)}>
            <Image
              src={image}
              alt={`post-image-${index}`}
              width={1000}
              height={1000}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
