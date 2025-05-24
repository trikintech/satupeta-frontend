enum StatusValidation {
  ON_VERIFICATION = "on_verification",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export const statusValidationLabel: Record<StatusValidation, string> = {
  [StatusValidation.ON_VERIFICATION]: "Menunggu Validasi",
  [StatusValidation.APPROVED]: "Tervalidasi",
  [StatusValidation.REJECTED]: "Tidak Tervalidasi",
};

export default StatusValidation;
