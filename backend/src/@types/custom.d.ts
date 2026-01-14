import "express";

// Augment Express Request to include `userId` set by auth middleware
declare module "express" {
  interface Request {
    userId?: string;
  }
}
