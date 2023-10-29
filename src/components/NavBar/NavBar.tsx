"use client";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import LoggedIn from "@/components/Logout/Logout";
import Image from "next/image";

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
          <Image src={"logo.svg"} width={39} height={44} alt={"Cat Logo"} />
          <span className="ps-lg-5 pe-lg-2 fs-6">Recent Articles</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav>
            <Nav.Link as={Link} href="/about" active={pathName === "/about"}>
              About
            </Nav.Link>
          </Nav>
          {!session && (
            <Nav>
              <Nav.Link as={Link} href="/login" active={pathName === "/login"}>
                Login
              </Nav.Link>
            </Nav>
          )}
          {!!session && <LoggedIn />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
