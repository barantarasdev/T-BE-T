import { getMessage } from "../../constants/messages";
import { NotFoundError } from "../../error";
import { AppDataSource } from "../dataSource";
import { Token } from "../entities/token";

export async function getRefreshToken(refreshToken: string) {
  return await AppDataSource.getRepository(Token).findOne({
    where: { refreshToken },
    relations: ["user"],
  });
}

export async function createRefreshToken({
  userId,
  refreshToken,
}: {
  userId: string;
  refreshToken: string;
}) {
  return await AppDataSource.getRepository(Token).save({
    refreshToken,
    user: { id: userId },
  });
}

export async function updateRefreshToken(
  oldRefreshToken: string,
  newRefreshToken: string,
) {
  const tokenRepository = AppDataSource.getRepository(Token);
  const token = await tokenRepository.findOneBy({
    refreshToken: oldRefreshToken,
  });

  if (!token) {
    throw new NotFoundError(getMessage("token").NOT_FOUND);
  }

  token.refreshToken = newRefreshToken;

  return await tokenRepository.save(token);
}

export async function deleteRefreshToken(refreshToken: string) {
  const tokenRepository = AppDataSource.getRepository(Token);
  const token = await tokenRepository.findOneBy({ refreshToken });

  if (!token) {
    throw new NotFoundError(getMessage("token").NOT_FOUND);
  }

  return await tokenRepository.remove(token);
}
