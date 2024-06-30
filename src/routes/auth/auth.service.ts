import jwt from "jsonwebtoken";

import * as bcrypt from "bcrypt";
import { getMessage } from "../../constants/messages";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../../database/services/auth";
import {
  createRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
  updateRefreshToken,
} from "../../database/services/token";
import { LogoutDto } from "./dto/logout.dto";
import { BadRequestError, NotFoundError } from "../../error";

class AuthService {
  async getTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      jwt.sign(
        {
          userId,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      jwt.sign(
        {
          userId,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY as string,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const { email, name, password } = dto;

    const userExists = await getUserByEmail(email);

    if (userExists) {
      throw new BadRequestError(getMessage().EXISTS);
    }

    const hash = await bcrypt.hash(
      password,
      Number(process.env.SALT_OR_ROUNDS),
    );
    const newUser = { name, email, password: hash };

    const { id: userId } = await createUser(newUser);
    const { refreshToken, accessToken } = await this.getTokens(userId);

    await createRefreshToken({
      userId,
      refreshToken,
    });

    return { refreshToken, accessToken };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new BadRequestError(getMessage().NOT_EXISTS);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestError(getMessage().PASSWORD_INCORRECT);
    }

    const { accessToken, refreshToken } = await this.getTokens(user.id);

    await createRefreshToken({
      userId: user.id,
      refreshToken,
    });

    return { refreshToken, accessToken, name: user.name };
  }

  async refreshToken(token: string) {
    const currentRefreshToken = await getRefreshToken(token);

    if (!currentRefreshToken) {
      throw new BadRequestError(getMessage("Token").NOT_EXISTS);
    }

    const user = await getUserById(currentRefreshToken.user.id);

    if (!user) {
      throw new NotFoundError(getMessage("Token").NOT_FOUND);
    }

    const { accessToken, refreshToken } = await this.getTokens(user.id);

    await updateRefreshToken(token, refreshToken);

    return {
      refreshToken,
      accessToken,
    };
  }

  async logout(dto: LogoutDto) {
    return await deleteRefreshToken(dto.refreshToken);
  }
}

export default AuthService;
