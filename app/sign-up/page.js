"use client";

import FormInput from "../components/FormInput";
import StarSVG from "../components/StarSVG";
import GoogleSVG from "../components/GoogleSVG";
import { balthazar, cinzel } from "../lib/fonts";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../_contexts/UserContext";
import Link from "next/link";

export default function SignUp() {
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState(null);
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr(null);

    const data = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(formState),
    });

    const res = await data.json();

    if (res.error) {
      setErr(res.error);
      return;
    }

    setUser(res);

    router.push("/class-option");
  };

  return (
    <main className="flex flex-col space-y-8 justify-center items-center sm:max-w-4xl max-w-xl m-auto my-2">
      <div className="relative w-full h-12 mt-2">
        <StarSVG top="top-0" left="left-12" />
        <StarSVG bottom="bottom-0" right="right-12" />
      </div>
      <form
        onSubmit={handleSignUp}
        className={`bg-dark-green flex flex-col w-full p-8 text-center mt-0 rounded-2xl ${balthazar.className}`}
      >
        <header>
          <h1 className={`text-3xl font-bold mb-4 ${cinzel.className}`}>
            Sign Up
          </h1>
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
          label="Username"
          id="username"
          name="username"
          type="text"
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
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          onChange={handleChange}
        />
        <input
          className="w-full bg-yellow rounded-xl p-2.5 mt-2 outline-white cursor-pointer"
          type="submit"
          value="Sign Up"
        />
        <button
          className="flex items-center justify-center rounded-xl p-2.5 my-2 bg-white text-black outline-yellow"
          disabled
        >
          <GoogleSVG />
          <span className={`ml-2 text-lg ${balthazar.className}`}>
            Sign Up With Google
          </span>
        </button>

        <p className="pt-2">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-yellow ml-1">
            Sign in
          </Link>
        </p>
      </form>
      <div className="relative w-full h-16 mb-2">
        <StarSVG top="top-0" right="right-16" />
        <StarSVG bottom="bottom-0" left="left-16" />
      </div>
    </main>
  );
}
