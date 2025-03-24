
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
  
  export const asyncHandler = (fn, errorMessages = "Une erreur est survenue") => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next({ message : errorMessages, error });
      }
    }
  }