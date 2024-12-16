import { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthCheckProps {
  children: React.ReactNode;
}

 const AuthCheck: React.FC<AuthCheckProps> = (props) => {
  const router = useRouter();

  let isAuth: any = "";
  if (typeof window !== "undefined") {
    isAuth = sessionStorage.getItem("isAuth");
  }
  useEffect(() => {
    if (!isAuth || isAuth !== "true") {
      router.push("/");
    }
  }, [isAuth]);

  return <>{props.children}</>;
};


export default AuthCheck