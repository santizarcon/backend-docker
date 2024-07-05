import speakeasy from "speakeasy";
import responses from "../messages/responses";

const secretOTP = speakeasy.generateSecret().base32;

export const generateCodeOTP = () => {
  return speakeasy.totp({
    secret: secretOTP,
    encoding: "base32",
    step: 5 * 60,
  });
};

export const checkOTP = (req, res) => {
  const verify = speakeasy.totp.verify({
    secret: secretOTP,
    encoding: "base32",
    token: req.body.otp,
    step: 5 * 60,
  });
  if (verify) {
    let message = "OTP code successfully verified";
    responses.success(req, res, message, 200);
  } else {
    let message = "The OTP code is invalid or has expired";
    responses.success(req, res, message, 200);
  }
};
