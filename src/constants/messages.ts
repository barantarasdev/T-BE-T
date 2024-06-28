export const getMessage = (value: string = "User") => {
  return {
    NOT_FOUND: `${value} not found!`,
    EXISTS: `${value} already exists`,
    NOT_EXISTS: `${value} does not exist`,
    PASSWORD_INCORRECT: "Password is incorrect",
    NOT_PROVIDED: `No ${value} provided`,
    INVALID: `Invalid ${value}`,
  };
};
