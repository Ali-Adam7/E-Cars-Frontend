import RegisterUserDTO from "@/DTO/RegisterUserDTO";

export const signIn = async (email: String, password: String): Promise<User> => {
  try {
    const res = await fetch("/auth/", {
      method: "PUT",
      body: JSON.stringify({ email: email, plainTextPassword: password }),
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    if (res.status !== 200) throw Error(await res.text());
    return (await res.json()) as User;
  } catch (e) {
    console.log("Error signing user", e);
    throw e;
  }
};

export const registerUser = async (user: RegisterUserDTO): Promise<User> => {
  try {
    const res = await fetch("/auth/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status !== 201) throw Error();
    return (await res.json()) as User;
  } catch (e) {
    console.log("Error regitering user", e);
    throw e;
  }
};
