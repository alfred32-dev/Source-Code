const multer = require('multer');

// Set storage destination and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile-pictures');  // Store in this directory
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`);  // Naming convention for files
  }
});

// Set file filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
  },
  fileFilter: fileFilter
});

// Middleware to handle profile picture upload
exports.uploadProfilePicture = upload.single('profilePicture');
