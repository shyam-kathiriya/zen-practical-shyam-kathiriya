const commonValidator = (schema) => {
  return async (req, res, next) => {
    const data = Object.assign(req.body, req.params, req.query);

    const { error } = await schema.validate(data);
    if (error) {
      res.status(422).send({ status: 422, message: (error.details || []).map((ele) => (ele.message || '')).join(', '), errors: error.details })
    } else {
      next();
    }
  }
}

module.exports = commonValidator;