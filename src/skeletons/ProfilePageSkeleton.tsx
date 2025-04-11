import { Skeleton } from "antd";

const ProfileSkeleton = () => {
  return (
    <section className="flex-center gap-x-3">
      <div className="relative w-max">
        {/* Profile Skeleton */}
        <Skeleton.Avatar 
          active 
          size={130} 
          className="rounded-full bg-gray-300" 
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <Skeleton.Input 
          active 
          size="large" 
          className="w-40 bg-gray-300" 
        />
        <Skeleton.Input 
          active 
          size="small" 
          className="w-28 bg-gray-300" 
        />
      </div>
    </section>
  );
};

export default ProfileSkeleton;
