exports.handleServerError = (res, message, error) => {
    console.error(message, error);
    return res.status(500).json({
      message,
      error: error.message || 'Internal Server Error'
    });
  };
  