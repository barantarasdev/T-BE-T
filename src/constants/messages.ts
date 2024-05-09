export const getMessage = (value: string = "User") => {
  return {
    NOT_FOUND: `${value} not found!`,
    REQUIRED: `${value} IS REQUIRED`,
    REMOVED: `${value} removed successfully`,
    CREATED: `${value} created successfully`,
    CHANGED: `${value} changed successfully`,
    REPLACED: `${value} replaced successfully`,
  };
};
