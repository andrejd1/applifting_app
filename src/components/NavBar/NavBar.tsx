"use client";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Logout from "@/components/Logout/Logout";

type NavbarProps = {
  session: Session | null;
};

export default function NavBar({ session }: NavbarProps) {
  const pathName = usePathname();

  return (
    <Navbar
      bg="light"
      variant="light"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          Recent Articles
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav>
            <Nav.Link as={Link} href="/about" active={pathName === "/about"}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {!session && (
              <Nav.Link as={Link} href="/login" active={pathName === "/login"}>
                Login
              </Nav.Link>
            )}
            {!!session && <Logout />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
