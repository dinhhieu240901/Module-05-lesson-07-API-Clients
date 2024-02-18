module.exports = function (request, response) {
  let articles = require("../../articles/GET.json");
  let users = require("../../users/GET.json");

  let article = articles.find(
    (article) => article.id == request.params.article_id
  );

  let user = users.find((user) => user.id == article.user_id);

  response.json({
    id: article.id,
    title: article.title,
    user: {
      id: user.id,
      name: user.name,
      birthday: user.birthday,
    },
  });
};
