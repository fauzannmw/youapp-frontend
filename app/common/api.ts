export const registerUser = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  const response = await fetch(`https://techtest.youapp.ai/api/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return responseJson;
};

export const loginUser = async (data: {
  email?: string;
  username?: string;
  password: string;
}) => {
  const response = await fetch(`https://techtest.youapp.ai/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();

  return responseJson;
};

export const getProfile = async (accessToken: string | null) => {
  const response = await fetch("https://techtest.youapp.ai/api/getProfile", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "x-access-token": accessToken as string,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const updateProfile = async (
  data: {
    name: string;
    gender: string;
    birthday: string;
    height: number;
    weight: number;
  },
  accessToken: string | null
) => {
  const response = await fetch(`https://techtest.youapp.ai/api/updateProfile`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": accessToken as string,
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return responseJson;
};

export const updateInterest = async (
  data: { interests: string[] },
  accessToken: string | null
) => {
  const response = await fetch(`https://techtest.youapp.ai/api/updateProfile`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": accessToken as string,
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return responseJson;
};
