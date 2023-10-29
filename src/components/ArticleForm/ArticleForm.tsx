"use client";
import { Button, Form } from "@/components/bootstrap";
import { useForm } from "react-hook-form";

type TFormValues = {
  title: string;
  image: string;
  content: string;
};

export default function ArticleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
        {/*<Form.Control type="text" {...register("image")} />*/}
        <div className="d-inline-block">
          <Button variant="secondary" size="sm">
            Upload an Image
          </Button>
        </div>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: "40vh", resize: "none" }}
          {...register("content", {
            required: "The article content can't be empty!",
          })}
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
