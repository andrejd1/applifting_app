"use client";
import { Button, Form } from "@/components/bootstrap";
import { Controller, useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  createArticleAction,
  createArticleImage,
} from "@/app/actions/server-actions";
import { TArticleFormValues } from "@/types/article";

export default function ArticleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
    setValue,
  } = useForm<TArticleFormValues>();
  const title = watch("title");
  const imageId = watch("imageId");
  const [image, setImage] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteImageButtonClick = () => {
    setImage(null);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    startTransition(async () => {
      if (event.target.files && event.target.files.length) {
        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append(
          "file",
          event.target.files[0],
          event.target.files[0].name,
        );
        const status = await createArticleImage(formData, session);
        if (status === 200) {
          setValue("imageId", event.target.files[0].name.split(".")[0]);
          setImage(URL.createObjectURL(event.target.files[0]));
        }
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      console.log(imageId);
      const status = await createArticleAction(data, session);
      if (status === 200) {
        router.push("/");
        router.refresh();
      } else {
        setError("root", { message: "Something went wrong :(" });
      }
    });
  });

  return (
    <Form
      className="d-block bg-white p-4 rounded-3"
      style={{
        maxWidth: "48rem",
      }}
      onSubmit={onSubmit}
    >
      <div className="d-flex flex-column flex-sm-row mb-sm-4">
        <h3 className="mb-3">Create new article</h3>
        <div className="d-inline-block">
          <Button
            variant="primary"
            size="sm"
            className="mb-4 ms-sm-4 mb-sm-0"
            type="submit"
          >
            {isPending ? "Publishing..." : "Publish Article"}
          </Button>
        </div>
      </div>
      <Form.Group className="mb-4" controlId="formTitle">
        <Form.Label>Article Title</Form.Label>
        <Form.Control
          type="text"
          {...register("title", {
            required: "The article title can't be empty!",
          })}
        />
        {errors.title ? (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        ) : null}
      </Form.Group>
      <Form.Group className="d-flex flex-column mb-4" controlId="formImage">
        <Form.Label>Featured image</Form.Label>
        <div className="d-flex flex-column">
          {image && (
            <>
              <Image
                src={image}
                alt={title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "15%", height: "auto" }}
              />
              <div className="d-flex flex-row">
                <Form.Label
                  htmlFor="imageFile"
                  className="p-0 pe-2 my-2"
                  style={{
                    color: "#0d6efd",
                    borderRight: "1px solid rgba(200, 200, 200, 1)",
                    cursor: "pointer",
                  }}
                >
                  Upload New
                  <Form.Control
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Form.Label>
                <Form.Label
                  className="p-2"
                  style={{ color: "#dc3545", cursor: "pointer" }}
                  onClick={handleDeleteImageButtonClick}
                >
                  Delete
                </Form.Label>
              </div>
            </>
          )}
          {!image && (
            <div className="d-inline-block">
              <Form.Label className="btn btn-secondary" htmlFor="imageFile">
                Upload an Image
                <Form.Control
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Form.Label>
            </div>
          )}
        </div>
      </Form.Group>
      <Form.Group
        className="mb-4"
        controlId="formContent"
        data-color-mode="light"
      >
        <Form.Label>Perex</Form.Label>
        <Controller
          control={control}
          {...register("perex", {
            required: "The article perex can't be empty!",
          })}
          render={({ field: { onChange, value } }) => (
            <>
              <MDEditor value={value} onChange={onChange} />
              <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </>
          )}
        />
        {errors.perex ? (
          <span style={{ color: "red" }}>{errors.perex.message}</span>
        ) : null}
      </Form.Group>
      <Form.Group
        className="mb-4"
        controlId="formContent"
        data-color-mode="light"
      >
        <Form.Label>Content</Form.Label>
        <Controller
          control={control}
          {...register("content", {
            required: "The article content can't be empty!",
          })}
          render={({ field: { onChange, value } }) => (
            <>
              <MDEditor value={value} onChange={onChange} />
              <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </>
          )}
        />
        {errors.content ? (
          <span style={{ color: "red" }}>{errors.content.message}</span>
        ) : null}
      </Form.Group>
      {errors.root ? (
        <p className="text-danger">{errors.root.message}</p>
      ) : null}
    </Form>
  );
}
