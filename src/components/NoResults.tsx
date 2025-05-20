import Image from "next/image";
import images from "@/constants/images";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center my-5">
      <div className="w-11/12 h-80 relative">
        <Image
          src={images.noResult}
          alt="No results found"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-rubik-bold text-black-300 mt-5">
        No Result
      </h2>
      <p className="text-base text-black-100 mt-2">
        We could not find any result
      </p>
    </div>
  );
};

export default NoResults;