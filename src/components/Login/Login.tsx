"use client";
import { Button, Form } from "@/components/bootstrap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TLoginFormValues } from "@/types/user";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLoginFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const response = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      setError("root", { message: "Wrong email or password" });
    }
  });

  return (
    <Form
      className="d-block mx-auto bg-white p-4 rounded-3"
      style={{
        maxWidth: "368px",
        boxShadow: "0px 16px 48px 0px rgba(0, 0, 0, 0.175)",
      }}
      onSubmit={onSubmit}
    >
      <h3 className="mb-3">Log In</h3>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
      {errors.root ? (
        <p className="text-danger">{errors.root.message}</p>
      ) : null}
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </div>
    </Form>
  );
}
