import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.register(req.body);
    res.json({
      success: 0,
      data: { ...user },
      message: 'user created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getusers();
    res.json({
      success: 0,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.token as unknown as string);
    if (!user) {
      return res.status(401).json({
        success: 1,
        message: 'the email or password do not match please try again',
      });
    }
    return res.header('Access-Control-Allow-Origin', req.headers.origin).json({
      success: 0,
      data: { ...user, token },
      message: 'user authenticated successfully',
    });
  } catch (error) {
    next(error);
  }
};
