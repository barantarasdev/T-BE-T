export const verifyAccessToken = (req: any, res: any, next: any) => {
  req.user = { userId: "1" };
  next();
};
