"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { WithAuth } from "@/app/context/PrivateRoute";

import { Chip } from "@nextui-org/react";
import { IoChevronBackOutline } from "react-icons/io5";

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

export default function Interest() {
  const router = useRouter();

  const [isloading, setLoading] = useState(false);
  const [interest, setInterest] = useState("");
  const [interestLists, setInterestLists] = useState<string[]>([]);

  const access_token = sessionStorage.getItem("authToken");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (interest.length === 0) {
      return;
    }
    setInterestLists((prev) => {
      return [...prev, interest];
    });
    setInterest("");
  };

  const handleClose = (indexToRemove: number) => {
    setInterestLists((prev) => {
      const current = [...prev];
      current.splice(indexToRemove, 1);

      return current;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://techtest.youapp.ai/api/getProfile",
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "x-access-token": access_token as string,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setInterestLists(data?.data?.interests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [access_token]);

  const processForm = async () => {
    try {
      setLoading(true);
      await updateInterest({
        interests: interestLists,
      });
      router.push("/", { scroll: false });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateInterest = async (data: { interests: string[] }) => {
    const response = await fetch(
      `https://techtest.youapp.ai/api/updateProfile`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": access_token as string,
        },
        body: JSON.stringify(data),
      }
    );
    const responseJson: UpdateProfileResponse = await response.json();
    return responseJson;
  };

  return (
    <WithAuth>
      <main className="flex min-h-screen min-w-screen flex-col bg-[#09141A] gap-y-10 py-4 px-4">
        <section className="flex justify-between">
          <a
            href="/"
            className="flex flex-row items-center px-2 w-fit font-bold"
          >
            <div className="text-2xl h-full">
              <IoChevronBackOutline />
            </div>
            <span className="text-sm">Back</span>
          </a>
          <button
            disabled={interestLists.length === 0 || isloading}
            onClick={processForm}
            className="flex flex-row items-center w-fit font-bold"
          >
            <span className="text-sm">Save</span>
          </button>
        </section>
        <section className="my-10 flex flex-col gap-4">
          <section>
            <h2 className="font-semibold text-lg bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] inline-block text-transparent bg-clip-text">
              Tell everyone about yourself
            </h2>
            <h1 className="font-semibold text-2xl">What interest you?</h1>
          </section>
          <section className="bg-white/5 rounded-lg py-3 px-4">
            {interestLists.length > 0 && (
              <div className="flex gap-2">
                {interestLists.map((interestList, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleClose(index)}
                    radius="sm"
                  >
                    {interestList}
                  </Chip>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                type="text"
                className="bg-transparent p-1.5 w-full focus:outline-none"
              />
            </form>
          </section>
        </section>
      </main>
    </WithAuth>
  );
}