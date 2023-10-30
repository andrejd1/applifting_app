"use client";

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

export default function IndexPage() {
  return (
    <section className="container">
      <SwaggerUI url={"api.yaml"} />
    </section>
  );
}
