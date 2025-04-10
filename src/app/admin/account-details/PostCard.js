import CustomConfirm from "../../../components/CustomConfirm/CustomConfirm";
import MiniProfile from "../../../components/MiniProfile/MiniProfile";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function PostCard() {
  const onPopConfirm = () => {
    console.log("deleted");
  };
  return (
    <div className="border p-2 rounded-lg border-primary-black">
      <div className="flex justify-between">
        <MiniProfile />
        <CustomConfirm
          description={"Are you sure you want to delete this post?"}
          onConfirm={onPopConfirm}
        >
          <Trash2 className="cursor-pointer" />
        </CustomConfirm>
      </div>
      <div className="my-3">
        <p>
          Forget Tarzan, meet this stray cat—the real jungle king! 🌴 Every time
          I step outside to bring home plants, this fearless furball appears out
          of nowhere, ready to explore like it’s a grand safari. 🐾✨ From
          climbing trees to sniffing every leaf, this little adventurer adds a
          wild touch to my gardening trips. Who knew a stray could have such a
          big personality?!
        </p>
      </div>
      <div className="space-x-2 font-medium text-primary-red">
        <a href="#">#eagle</a>
        <a href="#">#powerful_bird</a>
        <a href="#">#the_bird</a>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Image
          src={
            "https://img.freepik.com/premium-photo/closeup-shot-beautiful-bald-eagle-with-intense-gaze_1106493-46973.jpg"
          }
          className="rounded-lg"
          width={1000}
          height={1000}
          alt="parrot"
        />

        <Image
          src={
            "https://img.freepik.com/premium-photo/closeup-shot-beautiful-bald-eagle-with-intense-gaze_1106493-46973.jpg"
          }
          className="rounded-lg"
          width={1000}
          height={1000}
          alt="parrot"
        />

        <Image
          src={
            "https://aussieanimals.com/wp-content/uploads/2024/09/Aussie-Parrots.jpg"
          }
          className="rounded-lg"
          width={1000}
          height={1000}
          alt="parrot"
        />

        <Image
          src={
            "https://aussieanimals.com/wp-content/uploads/2024/09/Aussie-Parrots.jpg"
          }
          className="rounded-lg"
          width={1000}
          height={1000}
          alt="parrot"
        />
      </div>
    </div>
  );
}
