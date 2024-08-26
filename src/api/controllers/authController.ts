import { Request, Response, NextFunction } from "express";
const { v4: uuidv4 } = require("uuid");
import { generateRefreshToken, generateTokens } from "../utils/jwt";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
} from "../services/authServices";
import {
  CreateUser,
  findUserByEmail,
  findUserById,
} from "../services/userServices";
import { UserInterface } from "../interfaces/userInterface";
import bcrypt from "bcrypt";
import { hashToken } from "../utils/hashToken";
const jwt = require("jsonwebtoken");

async function authenticateSignUpUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const tokenUser = await CreateUser({
      email,
      password,
    } as UserInterface);
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(
      {
        id: tokenUser.user.id,
        email: tokenUser.user.email,
        password: tokenUser.user.password,
      },
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: tokenUser.user.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    next(err);
  }
}

async function authenticateLoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ error: "You must provide an email and a password." });
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403).json({ error: "Invalid email or password." });
      throw new Error("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).json({ error: "Invalid login credentials." });
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
      user: existingUser.email,
    });
  } catch (err: any) {
    next(err);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ error: "Missing refresh token." });
      // throw new Error("Missing refresh token.");
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401).json({ error: "Unauthorized" });
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401).json({ error: "Unauthorized" });
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
}

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token; // Assuming token is stored in cookies
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, Check Cookies" });
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await findUserById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized, Check JWT Token" });
    }

    res.json({ user, message: "Authorized" });
  } catch (err) {
    next(err);
  }
}

export default {
  authenticateSignUpUser,
  authenticateLoginUser,
  refreshToken,
  checkAuth,
};
