export const getMessage = (value: string = "User") => {
  return {
    NOT_FOUND: `${value} not found!`,
  };
};
