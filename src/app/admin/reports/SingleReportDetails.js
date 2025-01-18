"use client";
import MiniProfile from "@/components/MiniProfile/MiniProfile";
import { Button, Checkbox } from "antd";
import Image from "next/image";

const optionsWithDisabled = [
  {
    label: "Resolved",
    value: "resolved",
  },
  {
    label: "Block User",
    value: "block_user",
  },
  {
    label: "Remove Post",
    value: "remove_post",
    disabled: false,
  },
];

export default function SingleReportDetails() {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 items-center">
      <div className="xl:col-span-1 border border-primary-black rounded-lg p-3 bg-light-red h-fit">
        <div className="relative flex items-center flex-col">
          <Image
            src={
              "https://worldbirds.com/wp-content/uploads/2020/07/color5.webp"
            }
            className="rounded-lg"
            width={1000}
            height={1000}
            alt="parrot"
          />
          <div className=" absolute -bottom-[70px]">
            <div
              style={{
                backgroundImage:
                  "url('https://africageographic.com/wp-content/uploads/2024/04/Team.png')",
              }}
              className="w-[150px] h-[150px] rounded-full bg-center bg-cover bg-no-repeat mx-auto"
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-24 gap-5">
          <div>
            <h6 className="text-base font-semibold">Reported By</h6>
            <p>Kallu_Man</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">User Reporting</h6>
            <p>Kallu_Man</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">Post Link</h6>
            <p>
              <a
                href="#"
                className="text-primary-blue hover:text-primary-blue/85 underline"
              >
                Cute pet post
              </a>
            </p>
          </div>
          <div>
            <h6 className="text-base font-semibold">Reason For Report</h6>
            <p>Kallu_Man</p>
          </div>
          <div>
            <h6 className="text-base font-semibold">Date</h6>
            <p>11 Dec, 2025</p>
          </div>
        </div>
        <div className="mt-5">
          <h6 className="text-base font-semibold">Status</h6>
          <Checkbox.Group
            options={optionsWithDisabled}
            defaultValue={["Apple"]}
            onChange={onChange}
          />
        </div>
        <div className="mt-4">
          <Button className="w-full !bg-primary-black !text-white !font-semibold !text-base !py-6 !rounded-lg !border-none">
            Mark as Resolved
          </Button>
        </div>
      </div>
      <div className="xl:col-span-2 border border-primary-black rounded-lg p-3 bg-light-red">
        <MiniProfile />
        <div className="mt-4">
          <p className="text-lg">
            Forget Tarzan, meet this stray cat—the real jungle king! 🌴 Every
            time I step outside to bring home plants, this fearless furball
            appears out of nowhere, ready to explore like it’s a grand safari.
            🐾✨ From climbing trees to sniffing every leaf, this little
            adventurer adds a wild touch to my gardening trips. Who knew a stray
            could have such a big personality?!
          </p>
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
    </div>
  );
}
