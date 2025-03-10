function setImagePath(req, res, next) {
  // URL for find img of each movie
  req.imagePath = `${req.protocol}://${req.get("host")}/img/movies_cover/`;
  next();
}

module.exports = setImagePath;
