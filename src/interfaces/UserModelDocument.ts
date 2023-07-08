import { Document } from "mongoose";

interface UserModelDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  createdAt: Date;
  passwordModifiedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiryTime?: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  passwordModified(a: number): boolean;
  genResetToken(): string;
}

export default UserModelDocument;