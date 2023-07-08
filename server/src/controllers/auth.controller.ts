import crypto from "crypto";

import User from "../models/user.model";
import { Request, Response } from 'express';
import Mailer from "../utils/mailer";
import generateToken from "../utils/generateToken";
import BaseError from '../error/base-error';

export const signUp = async (req: Request, res: Response): Promise<void | Response> => {
    const { fullName, email, password, confirmPassword } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
        return res.status(421).json({
            status: false,
            message: "User already exists"
        });

    const user = await User.create({
        fullName,
        email,
        password,
        confirmPassword,
    });

    user.__v = undefined;

    const token = generateToken(user);
    return res.status(201).json({
        status: true,
        token,
        user: {
            name: user.fullName
        },
    });
};

export const signIn = async (req: Request, res: Response): Promise<void | Response> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isCorrectPassword(password))) 
        return res.status(401).json({
            status: false,
            message: "Email or Password incorrect."
        });

    user.password = '';
    user.__v = undefined;
    const token = generateToken(user);
    return res.status(200).json({
        status: true,
        token,
        user
    });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void | Response> => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new BaseError("User does not exist!", 404);

    const resetToken = user.genResetToken();
    user.save({ validateBeforeSave: false }); // persists the changes made in  genResetToken function

    const resetPasswordURL = `${process.env.FRONTEND_URL || "http://localhost:3000" }/reset-password?token=${resetToken}&email=${email}`;
    const body = `Hi ${user.fullName},\nWe received a request to reset your LinkScissor account password.\nTo reset your password, please click on this link:\n${resetPasswordURL}.\nIf you did not request a password reset, please ignore this email. `;
    const subject = "LinkScissors Password Reset Link.";
    try {
        await Mailer({ email, body, subject });
        return res.status(200).json({
            status: true,
            message:
                "Check your email inbox, a link to reset your password has been sent.",
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiryTime = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(error);

        throw new BaseError("Something went wrong. Please try again later.", 500)

    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void | Response> => {
    const token = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // Looks for user with the reset token and unexpired!
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpiryTime: { $gt: Date.now() }, // this confirms that the token hasn't expired
    });
    if (!user)
        return res.status(400).json({
            status: false,
            message: "Password reset token is invalid or has expired!",
        });

    const { password, confirmPassword } = req.body;
    user.password = password;
    user.confirmPassword = confirmPassword;
    
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiryTime = undefined;
    await user.save({ validateModifiedOnly: true }); 

    return res.status(200).json({
        status: true,
        message: "Password reset successful, Please login with new password",
    });
};