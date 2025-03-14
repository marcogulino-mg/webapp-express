const multer = require('multer');

const storage = multer.diskStorage({
    // Specify IMGs Location
    destination: './public/img/movies_cover/',
    // Specify IMGs Name Format
    filename: (req, file, cb) => {
        // Filename = Timestamp-FileOriginalName
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({storage});

module.exports = upload;
