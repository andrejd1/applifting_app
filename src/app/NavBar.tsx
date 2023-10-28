"use client";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
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
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/about" active={pathName === "/about"}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
