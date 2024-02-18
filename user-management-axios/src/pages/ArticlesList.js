import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  const handleCreate = () => {
    window.location.href = "/article/add";
  };
  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <a href={`/article/${article.id}`}> {article.title} </a>
        </div>
      ))}
      <button type="button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}

export default ArticleList;
