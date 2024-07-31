const notFoundHandler = (req, res, next) => {
  const message = 'Resource not found';
  res.status(404).send({ status: 404, message });
}

module.exports = notFoundHandler 