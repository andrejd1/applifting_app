"use client";
import { Button, Form, Nav } from "@/components/bootstrap";
import { Controller, useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import React, { useRef, useState } from "react";

type TFormValues = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  content: string;
};

export default function ArticleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TFormValues>();
  const title = watch("title");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleUploadImageButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleDeleteImageButtonClick = () => {
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files![0]));
  };

  const onSubmit = handleSubmit(async (data) => {
    const imageId = image
      ? image.split("/")[image.split("/").length - 1]
      : null;
    console.log(data);
    console.log(imageId);
  });

  return (
    <Form
      className="d-block bg-white p-4 rounded-3"
      style={{
        maxWidth: "760px",
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
            Publish Article
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
          <Form.Control
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInputRef}
            onChange={handleImageChange}
          />
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
              <Nav className="d-flex flex-row">
                <Nav.Link
                  className="p-0 pe-2 my-2"
                  style={{
                    color: "#0d6efd",
                    borderRight: "1px solid rgba(200, 200, 200, 1)",
                  }}
                  onClick={handleUploadImageButtonClick}
                >
                  Upload New
                </Nav.Link>
                <Nav.Link
                  className="p-2"
                  style={{ color: "#dc3545" }}
                  onClick={handleDeleteImageButtonClick}
                >
                  Delete
                </Nav.Link>
              </Nav>
            </>
          )}
          {!image && (
            <div className="d-inline-block">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleUploadImageButtonClick}
              >
                Upload an Image
              </Button>
            </div>
          )}
        </div>
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
          name={"content"}
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
