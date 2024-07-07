import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCookie } from "../utils/cookies";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, setUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const storedUser = getCookie("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }, [setUser]);

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          router.push("/sign-in");
        } else if (!user.userClass || !user.userCharacter) {
          router.push("/class-option");
        }
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
