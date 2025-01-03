"use client";

import { IoChevronBackOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import profilePic from "@/public/assets/profile.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Chip, Link } from "@nextui-org/react";

import { WithAuth } from "@/app/context/PrivateRoute";
import {
  capitalizeFirstLetter,
  calculateAge,
  determineHoroscope,
  determineChineseZodiac,
  getHoroscopeIcon,
  getChineseZodiacIcon,
} from "@/app/common/function";
import { getProfile } from "@/app/common/api";

export interface Profile {
  email: string;
  username: string;
  name: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
}

export default function Home() {
  const [profileData, setProfileData] = useState<Profile>();
  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAccessToken(token);
  }, []);

  const birthdate = profileData?.birthday.split(" ");
  const birthday = profileData?.birthday || "01 01 2000";
  const [dayStr, monthStr, yearStr] = birthday.split(" ");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  function formattedBirthday() {
    return (
      birthdate &&
      `${birthdate[0]} / ${birthdate[1]} / ${birthdate[2]} (Age ${calculateAge(
        Number(birthdate[0]),
        Number(birthdate[1]),
        Number(birthdate[2])
      )}) `
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile(access_token);
        console.log(data);
        setProfileData(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [access_token]);

  return (
    <WithAuth>
      <main className="flex min-h-screen min-w-screen flex-col bg-[#09141A] gap-y-10 py-4 px-4">
        <section className="flex ">
          <a
            href="/"
            className="flex flex-row items-center px-2 w-fit font-bold"
          >
            <div className="text-2xl h-full">
              <IoChevronBackOutline />
            </div>
            <span className="text-sm">Back</span>
          </a>
          <span className="w-full font-semibold text-center absolute">
            @{profileData?.username}
          </span>
        </section>

        <section className="gap-y-4 w-full rounded-sm">
          <div className="absolute w-fit pl-4 top-56">
            <div className="flex flex-col gap-1">
              <span className="font-bold">
                @{capitalizeFirstLetter(profileData?.username ?? "")},&nbsp;
                {calculateAge(day, month, year)}
              </span>
              <span className="text-sm">Male</span>
              <div className="flex flex-row gap-1">
                <div className="flex flex-row w-fit rounded-full py-2 px-4 gap-1 items-center bg-black/75 font-semibold">
                  {determineHoroscope(day, month) &&
                    getHoroscopeIcon(determineHoroscope(day, month)!)}
                  <span>{determineHoroscope(day, month)}</span>
                </div>
                <div className="flex flex-row w-fit rounded-full py-2 px-4 gap-1 items-center bg-black/75 font-semibold">
                  {determineChineseZodiac(day, month, year) &&
                    getChineseZodiacIcon(
                      determineChineseZodiac(day, month, year)!
                    )}
                  <span>{determineChineseZodiac(day, month, year)}</span>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={profilePic}
            alt="profile-picture"
            className="w-full h-[250px] rounded-sm"
          />
        </section>

        <section className="flex flex-col gap-y-4 bg-[#0E191F] w-full px-10 rounded-md py-4">
          <div className="flex flex-row items-center justify-between">
            <span>About</span>
            <Button isIconOnly as={Link} href="/edit-profile" variant="light">
              <LuPencilLine />
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-2">
              <span className="text-white/30">Birthday:</span>
              <span>{formattedBirthday()}</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span className="text-white/30">Horoscope:</span>
              <span>{determineHoroscope(day, month)}</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span className="text-white/30">Zodiac:</span>
              <span>{determineChineseZodiac(day, month, year)}</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span className="text-white/30">Height:</span>
              <span>{profileData?.height && profileData?.height} Cm</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span className="text-white/30">Weight:</span>
              <span>{profileData?.weight && profileData?.weight} Kg</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-y-4 bg-[#0E191F] w-full px-10 rounded-md py-4">
          <div className="flex flex-row items-center justify-between">
            <span>Interest</span>
            <Button isIconOnly as={Link} href="/interest" variant="light">
              <LuPencilLine />
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            {profileData?.interests && profileData?.interests?.length > 0 ? (
              <div className="flex gap-2">
                {profileData?.interests.map((interest, index) => (
                  <Chip key={index} radius="full">
                    {interest}
                  </Chip>
                ))}
              </div>
            ) : (
              <span className="text-white/30">
                Add in your interest to find a better match
              </span>
            )}
          </div>
        </section>
      </main>
    </WithAuth>
  );
}
