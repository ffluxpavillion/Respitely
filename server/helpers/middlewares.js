
// checks if id is an interger before continuing, used when need to get id. Used: Read One, Update, Delete
function mustBeInteger(req, res, next) {
  const id = req.params.id
  if (!Number.isInteger(parseInt(id))) {
      res.status(400).json({ message: 'ID must be an integer' })
  } else {
      next()
  }
}

// checks if all fields are present before continuing.  Used: Create, Update
function checkFieldsPost(req, res, next) {
  const { title, content, tags } = req.body
  if (title && content && tags) {
      next()
  } else {
      res.status(400).json({ message: 'fields are not good' })
  }
}
module.exports = {
  mustBeInteger,
  checkFieldsPost
}
