import { ICard } from "@/lib/types/types";
import Image from "next/image";

export function Card({ header, image, alt, imgHeight, imgWidth }: ICard) {
  return (
    <div className={`w-auto h-auto flex flex-col items-center`}>
      <p className=" text-[1.313em] font-bold text-center -tracking-wider max-h-20">{header}</p>
      <Image width={imgWidth} height={imgHeight} src={image} alt={alt} />
    </div>
  );
}
