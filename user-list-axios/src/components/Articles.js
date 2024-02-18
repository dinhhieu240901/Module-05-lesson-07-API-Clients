import React from "react";

function Articles({ articles }) {
  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}> {article.title} </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
