"use client";

import { IoChevronBackOutline } from "react-icons/io5";
import { LuPencilLine, LuPlus } from "react-icons/lu";
import profilePic from "@/public/assets/profile.png";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Chip,
  DatePicker,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";

import { WithAuth } from "@/app/context/PrivateRoute";
import { useRouter } from "next/navigation";

import {
  calculateAge,
  capitalizeFirstLetter,
  determineChineseZodiac,
  determineHoroscope,
  getChineseZodiacIcon,
  getHoroscopeIcon,
} from "@/app/common/function";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, updateProfile } from "@/app/common/api";

const FormDataSchema = z.object({
  name: z.string().min(1, { message: "Name consists of at least 1 letter" }),
  gender: z.string().min(1, { message: "Select Gender" }),
  height: z.string().min(1, { message: "Fill your Height in Cm" }),
  weight: z.string().min(1, { message: "Fill your Weight in Kg" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export interface UpdateProfileResponse {
  message: string;
  data: {
    email: string;
    username: string;
    name: string;
    birthday: string;
    horoscope: string;
    height: number;
    weight: number;
    interests: string[];
  };
}

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

export default function About() {
  const router = useRouter();

  const [isloading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<Profile>();
  const [date, setDate] = useState<CalendarDate>();
  const [birthDate, setBirthDate] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>(profileData?.zodiac ?? "");
  const [horoscope, setHoroscope] = useState<string>();

  const birthday = profileData?.birthday || "01 01 2000";
  const [dayStr, monthStr, yearStr] = birthday.split(" ");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAccessToken(token);
  }, []);
  console.log("profileData : ", profileData);

  useEffect(() => {
    setBirthDate(`${date?.day} ${date?.month} ${date?.year}`);
    setZodiac(
      determineChineseZodiac(date?.day ?? 0, date?.month ?? 0, date?.year ?? 0)
    );
    setHoroscope(determineHoroscope(date?.day ?? 0, date?.month ?? 0));
  }, [date]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: profileData?.name,
      gender: "Male",
      height: profileData?.height.toString(),
      weight: profileData?.weight.toString(),
    },
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await updateProfile(
        {
          name: data?.name,
          gender: data?.gender,
          birthday: birthDate,
          height: Number(data?.height),
          weight: Number(data?.weight),
        },
        access_token
      );
      router.push("/", { scroll: false });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  console.log("selectedImage", selectedImage);
  console.log("imagePreview", imagePreview);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
            {profileData?.username}
          </span>
        </section>

        <section className="gap-y-4 w-full">
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
            alt="image-profile"
            className="w-full h-[250px]"
          />
        </section>

        <form
          onSubmit={handleSubmit(processForm)}
          className="flex flex-col gap-y-4 bg-[#0E191F] w-full px-6 rounded-md py-4"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="font-semibold">About</span>

            <button type="submit" disabled={isloading}>
              <span className="underline bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent">
                Save & Update
              </span>
            </button>
          </div>

          <div className="w-fit">
            <label className="flex items-center justify-center gap-4 cursor-pointer">
              {selectedImage ? (
                <Image
                  src={imagePreview ?? ""}
                  alt="image-preview"
                  width={200}
                  height={200}
                  className="w-20 h-20 object-cover rounded-2xl"
                />
              ) : (
                <span className="p-3 rounded-2xl bg-white/5 text-4xl font-extralight text-[#D5BE88]">
                  <LuPlus />
                </span>
              )}
              <p>{selectedImage ? "Change image" : "Add image"}</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Display name:</p>
              <Input
                placeholder="Enter name"
                type="text"
                variant="bordered"
                size="lg"
                radius="sm"
                className="max-w-xs col-span-2 text-end"
                defaultValue={profileData?.name ?? ""}
                isInvalid={errors.name ? true : false}
                {...register("name", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Gender:</p>
              <Select
                placeholder="Select Gender"
                className="max-w-xs col-span-2 text-end"
                variant="bordered"
                size="lg"
                radius="sm"
                defaultSelectedKeys={["Male"]}
                isInvalid={errors.gender ? true : false}
                {...register("gender", { required: true })}
              >
                <SelectItem key={"Male"} value={"Male"}>
                  Male
                </SelectItem>
                <SelectItem key={"Female"} value={"Female"}>
                  Female
                </SelectItem>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Birthday:</p>
              <DatePicker
                maxValue={today(getLocalTimeZone())}
                value={date}
                onChange={setDate}
                showMonthAndYearPickers
                className="max-w-xs col-span-2 text-end"
                variant="bordered"
                size="lg"
                radius="sm"
                isInvalid={date ? false : true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Horoscope:</p>
              <Input
                type="text"
                variant="bordered"
                size="lg"
                radius="sm"
                className="max-w-xs col-span-2 text-end"
                placeholder="--"
                value={horoscope && horoscope}
                disabled
                isInvalid={date ? false : true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Zodiac:</p>
              <Input
                type="text"
                variant="bordered"
                size="lg"
                radius="sm"
                className="max-w-xs col-span-2 text-end"
                placeholder="--"
                value={zodiac && zodiac}
                disabled
                isInvalid={date ? false : true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Height:</p>
              <Input
                type="number"
                variant="bordered"
                size="lg"
                radius="sm"
                className="max-w-xs col-span-2 text-end"
                placeholder="Add height (Cm)"
                defaultValue={profileData?.height.toString() ?? ""}
                isInvalid={errors.height ? true : false}
                errorMessage={errors.height && errors.height.message}
                {...register("height", { required: true })}
                min={1}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-3 justify-between items-center">
              <p className="w-full">Weight:</p>
              <Input
                type="number"
                variant="bordered"
                size="lg"
                radius="sm"
                className="max-w-xs col-span-2 text-end"
                placeholder="Add weight (Kg)"
                defaultValue={profileData?.weight.toString() ?? ""}
                isInvalid={errors.weight ? true : false}
                errorMessage={errors.weight && errors.weight.message}
                {...register("weight", { required: true })}
                min={1}
              />
            </div>
          </div>
        </form>

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
