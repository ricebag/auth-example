import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="grow flex flex-col items-center relative">
      <div className="max-h-full w-full h-full object-cover">

        <video className="" src='/balloons.mp4' autoPlay loop muted />

        <div className="absolute w-full h-full top-0 left-0">
          <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white">
            <h1 className="lg:text-3xl md:text-xl text-sm">Group Bookings Made Simple.</h1>
            <h2 className="lg:text-xl md:text-base text-xs">Get started on your group booking today</h2>
            <div className="flex self-center bg-gray-800 text-white p-2 m-2 w-30 rounded">
              <Link href={'/groups'}>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
