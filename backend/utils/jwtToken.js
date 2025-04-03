export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Ensure COOKIE_EXPIRE is a valid number, default to 1 if invalid
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 1;

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
