import React from "react";
import { AddProfile } from "../Modal/Modal";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import VideoList from "../Video/VideoList";
import { setUser } from "@/redux/slices/additionalSlice";

const HomeContent = () => {
  const { profiles, user } = useSelector(
    (state: RootState) => state.additional
  );
  const dispatch = useDispatch();

  if (user) {
    return <VideoList name={user} />;
  } else
    return (
      <div className="bg-black h-screen w-full flex flex-col justify-center items-center px-5">
        <h1 className="text-white text-4xl">Whos Watching?</h1>
        <div className="flex justify-center items-center pt-6 gap-5 flex-wrap">
          {profiles?.map((profile, index) => {
            return (
              <button
                onClick={() => {
                  dispatch(setUser(profile?.name));
                }}
                key={index}
                className="flex flex-col gap-3"
              >
                <Image
                  className="w-20 h-20 md:w-28 md:h-28 rounded-xl"
                  src="/assets/images.jpeg"
                  alt={profile.name}
                  width={64}
                  height={64}
                />
                <div className="text-gray-500 line-clamp-1 text-center">
                  {profile?.name}
                </div>
              </button>
            );
          })}
          <div className="flex flex-col justify-center items-center gap-2">
            <AddProfile />
          </div>
        </div>
      </div>
    );
};

export default HomeContent;
