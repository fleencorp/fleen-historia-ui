
/**
 * @enum MfaSetupStatus
 * @description
 *   Represents the status of Multi-Factor Authentication (MFA) setup.
 *   - `COMPLETE`: MFA setup is complete.
 *   - `IN_PROGRESS`: MFA setup is in progress.
 */
export enum MfaSetupStatus {
  COMPLETE = 'COMPLETE',
  IN_PROGRESS = 'IN_PROGRESS'
}


/**
 * @enum MfaType
 * @description
 *   Represents the types of Multi-Factor Authentication (MFA) available.
 *   - `PHONE`: MFA using phone.
 *   - `EMAIL`: MFA using email.
 *   - `AUTHENTICATOR`: MFA using an authenticator app.
 *   - `NONE`: No MFA configured.
 */
export enum MfaType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  AUTHENTICATOR = 'AUTHENTICATOR',
  NONE = 'NONE'
}

