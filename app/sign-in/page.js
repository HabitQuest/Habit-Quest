"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "../components/FormInput";
import StarSVG from "../components/StarSVG";
import GoogleSVG from "../components/GoogleSVG";
import { balthazar } from "../lib/fonts";
import { UserContext } from "../_contexts/UserContext";
import { setCookie } from "../utils/cookies";

const SignInPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(formState);

    setErr(null);

    const data = await fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify(formState),
    });

    const res = await data.json();

    if (res.error) {
      setErr(res.error);
      return;
    }
    setCookie("user", JSON.stringify(res), 3);
    setUser(res);
    if (!res.userClass || !res.userCharacter) {
      router.push("/character-option");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex flex-col space-y-8 justify-center items-center sm:max-w-4xl max-w-xl h-1/2 m-auto my-4">
      <div className="relative w-full h-12 mb-12">
        <StarSVG top="top-0" left="left-12" />
        <StarSVG bottom="bottom-0" right="right-12" />
      </div>
      <form
        onSubmit={handleSignIn}
        className="bg-dark-green flex flex-col w-full p-8 text-center mt-0 rounded-2xl"
      >
        <header>
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        </header>
        {err && <p className="text-red-700 font-bold">{err}</p>}
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          onChange={handleChange}
        />
        <input
          className="w-full font-bold bg-yellow rounded-xl p-2.5 mt-2 outline-white cursor-pointer"
          type="submit"
          value="Sign In"
        />
        <button
          className="flex items-center justify-center rounded-xl p-2.5 my-2 bg-white text-black outline-yellow cursor-pointer"
          disabled
        >
          <GoogleSVG />
          <span className={`ml-2 text-lg ${balthazar.className}`}>
            Sign In With Google
          </span>
        </button>
        <Link href="/sign-up">
          <p className="pt-4 hover:text-yellow">Go to Sign up</p>
        </Link>
      </form>
      <div className="relative w-full h-20">
        <StarSVG top="top-0" right="right-16" />
        <StarSVG bottom="bottom-0" left="left-16" />
      </div>
    </main>
  );
};

export default SignInPage;
