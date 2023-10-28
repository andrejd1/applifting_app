"use client";
import { Button, Form } from "@/components/bootstrap";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className=" mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="username"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Button className="align-self-end" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
