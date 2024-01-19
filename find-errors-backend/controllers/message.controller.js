const db = require("../models");
const jwt = require("jsonwebtoken");
const Message = db.Message;
const User = db.User;
exports.create = (req, res) => {
  // Get decoded user id from token
  let authorization = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  console.log(decoded.id);

  // Create new category object
  const messageObj = {
    message: req.body.message,
    user: decoded.id,
  };

  Message.create(messageObj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "An unknown error occured while creating a message",
      })
    );
};

// Function to find all categories
exports.findAll = (req, res) => {
  // get user ID from decoded token
  let authorization = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

  Message.findAll({
    where: { user: decoded.id },
    include: { model: User, attributes: ["name", "id"] },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving message.",
      });
    });
};

exports.findOne = (req, res) => {
  // get the ID from request
  const id = req.params.id;

  // get decoded user id
  let authorization = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

  // find ticket by id and user ID
  Message.findByPk(id)
    .then((data) => {
      if (data && data.user === decoded.id) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find message with id=${id} or this ID does not belong to user`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving message with id=" + id + err,
      });
    });
};

exports.delete = (req, res) => {
  // get decoded user id
  let authorization = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

  Message.destroy({
    where: { id: id, user: decoded.id },
    attributes: {
      exclude: ["user"],
    },
  })
    .then((data) => {
      res.send({ message: "Message deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting message.",
      });
    });
};

exports.update = (req, res) => {
  Message.update(
    {
      name: req.body.name,
    },
    {
      where: { id: id, user: decoded.id },
      attributes: {
        exclude: ["user"],
      },
    }
  )
    .then((data) => {
      res.send({ message: "Message updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the message.",
      });
    });
};
