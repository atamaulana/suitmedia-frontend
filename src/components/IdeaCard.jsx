import React from "react";

export default function IdeaCard({ idea }) {
  return (
    <div className="card shadow-sm" style={{ maxWidth: "18rem" }}>
      <img
        src={idea.image}
        alt={idea.title}
        className="card-img-top"
        style={{ aspectRatio: "4 / 3", objectFit: "cover", height: "180px" }}
        loading="lazy"
      />
      <div className="card-body">
        <small className="text-muted">
          {new Date(idea.published_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </small>
        <h6
          className="card-title mt-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "4.5em",
          }}
          title={idea.title}
        >
          {idea.title}
        </h6>
      </div>
    </div>
  );
}
