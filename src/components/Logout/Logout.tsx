import { signOut } from "next-auth/react";
import { Button } from "@/components/bootstrap";

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
