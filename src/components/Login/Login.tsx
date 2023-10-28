"use client";
import { Button, Form } from "@/components/bootstrap";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      username: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      console.log("Login failed");
    }
  };

  return (
    <Form
      className="d-block mx-auto w-25 bg-white p-lg-4"
      onSubmit={handleSubmit}
    >
      <Form.Group className=" mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
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
