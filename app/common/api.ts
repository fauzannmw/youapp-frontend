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
