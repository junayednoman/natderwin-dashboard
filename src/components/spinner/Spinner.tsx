import Image from "next/image";
import spinner from "../../assets/images/spinner.svg";
import whiteSpinner from "../../assets/images/spinner white.svg";

const Spinner = ({
  className,
  size,
  white = false,
}: {
  className?: string;
  size?: string;
  white?: boolean;
}) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <Image
        src={white ? whiteSpinner : spinner}
        alt="spinner"
        width={140}
        height={140}
        className={`w-[${size}] h-[${size}] mx-auto`}
      />
    </div>
  );
};

export default Spinner;
