NB.String.strip = function (q) {
  return q.replace(/<\w + (\s + ("[^"]*"|'[^']*'|[^> ]) + )?> |<\/\w + > /gi, '');
}
