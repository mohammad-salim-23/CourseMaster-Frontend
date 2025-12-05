import Banner from "@/src/components/Banner";
import LatestCourse from "@/src/components/modules/Home/LatestCourse/LatestCourse";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <LatestCourse></LatestCourse>
    </div>
  );
}
