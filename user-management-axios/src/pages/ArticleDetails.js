import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ArticleDetails() {
  const { articleId } = useParams();
  const isCreate = !articleId;
  const [article, setArticle] = useState({});

  useEffect(() => {
    if (articleId) {
      axios
        .get(`http://localhost:3001/api/articles/${articleId}`)
        .then((res) => {
          setArticle(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [articleId]);

  function handleChange(event) {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    axios
      .post("http://localhost:3001/api/articles", article)
      .then((res) => {
        alert(
          `${isCreate ? "Create" : "Edit"} article ${JSON.stringify(
            res.data
          )} successfully!!!`
        );
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div>
      <h1>Article details</h1>
      <form>
        <div>
          <label>Id</label>
          <input name="id" value={article.id || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={article.title || ""}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ArticleDetails;
