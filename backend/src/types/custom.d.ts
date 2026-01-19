// Augment Express Request to include `userId` set by auth middleware.
// Cover both the global `Express` namespace and the exported Request
// interface from 'express-serve-static-core' so the augmentation is
// picked up regardless of how `Request` is imported.

declare namespace Express {
  interface Request {
    userId?: string;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export {};
