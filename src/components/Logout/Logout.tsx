import { signOut } from "next-auth/react";
import { Button, Nav } from "@/components/bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoggedIn() {
  const pathName = usePathname();
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <Nav>
      <Nav.Link
        as={Link}
        href="/my-articles"
        active={pathName === "/my-articles"}
      >
        My Articles
      </Nav.Link>
      <Nav.Link
        as={Link}
        href="/create-article"
        active={pathName === "/create-article"}
      >
        Create Article
      </Nav.Link>
      <Button onClick={handleLogout}>Logout</Button>
    </Nav>
  );
}
