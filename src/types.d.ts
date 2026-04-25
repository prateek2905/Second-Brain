declare global {
    namespace Express {
      interface Request {
        userId?: string; // add any other custom properties here
      }
    }
  }
  
  export {}