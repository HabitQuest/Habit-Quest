"use client";

import { useFormState } from "react-dom";
import FormInput from "../components/FormInput";
import StarSVG from "../components/StarSVG";
import GoogleSVG from "../components/GoogleSVG";
import { signupUser } from "../_actions/auth";
import { balthazar } from "../lib/fonts";

const initialErrorState = {
  message: "",
};

export default function SignUp() {
  const [error, formAction] = useFormState(signupUser, initialErrorState);

  return (
    <main className="flex flex-col space-y-8 justify-center items-center sm:max-w-4xl max-w-xl m-auto">
      <div className="relative w-full h-12 mt-4">
        <StarSVG top="top-0" left="left-12" />
        <StarSVG bottom="bottom-0" right="right-12" />
      </div>
      <form
        action={formAction}
        className="bg-dark-green flex flex-col w-full p-8 text-center mt-0"
      >
        <header>
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        </header>
        {error?.message && (
          <p className="text-red-700 font-bold">{error.message}</p>
        )}
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          required
        />
        <FormInput
          label="Username"
          id="username"
          name="username"
          type="text"
          required
        />
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          required
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />
        <input
          className="w-full bg-yellow rounded-xl p-2.5 mt-2 outline-white"
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
      </form>
      <div className="relative w-full h-16">
        <StarSVG top="top-0" right="right-16" />
        <StarSVG bottom="bottom-0" left="left-16" />
      </div>
    </main>
  );
}
