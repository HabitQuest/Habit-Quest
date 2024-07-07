import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_contexts/UserContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/sign-in");
      } else if (!user.userClass || !user.userCharacter) {
        router.push("/class-option");
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
