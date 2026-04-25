declare global {
    namespace Express {
      interface Request {
        userId?: mongoose.Types.ObjectId; // add any other custom properties here
      }
    }
  }
  
  export {}