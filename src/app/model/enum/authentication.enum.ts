/**
 * @enum AuthenticationStatus
 * @description
 *   Represents the status of user authentication.
 *   - `IN_PROGRESS`: Authentication is in progress.
 *   - `COMPLETED`: Authentication is completed.
 */
export enum AuthenticationStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}


/**
 * @enum AuthenticationStage
 * @description
 *   Represents the next step in the authentication process.
 *   - `PRE_VERIFICATION`: Pre-verification step.
 *   - `PRE_ONBOARDED`: Pre-onboarding step.
 *   - `MFA_OR_PRE_AUTHENTICATION`: MFA or pre-authentication step.
 *   - `NONE`: No specific next step.
 */
export enum AuthenticationStage {
  PRE_VERIFICATION = 'PRE_VERIFICATION',
  PRE_ONBOARDED = 'PRE_ONBOARDED',
  MFA_OR_PRE_AUTHENTICATION = 'MFA_OR_PRE_AUTHENTICATION',
  NONE = 'NONE'
}


/**
 * @enum VerificationType
 * @description
 *   Represents the type of verification (e.g., email or phone).
 *   - `EMAIL`: Verification via email.
 *   - `PHONE`: Verification via phone.
 */
export enum VerificationType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE'
}


/**
 * @enum AuthVerificationType
 * @description
 *   Represents the type of authentication verification.
 *   - `MFA`: Multi-Factor Authentication.
 *   - `VERIFICATION`: Verification step.
 *   - `ONBOARDING`: Onboarding step.
 */
export enum AuthVerificationType {
  MFA = 'MFA',
  VERIFICATION = 'VERIFICATION',
  ONBOARDING = 'ONBOARDING'
}


/**
 * @enum ChangePasswordType
 * @description
 *   Represents the type of change password operation.
 *   - `NONE`: No change password operation.
 *   - `RESET`: Password reset operation.
 *   - `ONBOARDING`: Onboarding password change.
 *   - `UPDATE`: Regular password update.
 */
export enum ChangePasswordType {
  NONE = 'NONE',
  RESET = 'RESET',
  ONBOARDING = 'ONBOARDING',
  UPDATE = 'UPDATE'
}

