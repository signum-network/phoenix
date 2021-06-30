export enum AuthStorageKeys {
  accounts = 'AUTH_ACCOUNTS',
  passcode = 'PASSCODE',
  passcodeEnteredTime = 'PASSCODE_ENTERED_TIME'
}

export enum KeyChainKeys {
  accounts = 'ACCOUNTS',
  passcode = 'PASSCODE',
  passcodeEnteredTime = 'PASSCODE_ENTERED_TIME',
  settings = 'SETTINGS'
}

export enum AsyncStorageKeys {
  agreeToTerms = 'AGREE_TO_TERMS',
  currentNode = 'CURRENT_NODE',
  isAutomaticNodeSelection = 'IS_AUTOMATIC_NODE',
}

export enum AsyncParticleStates {
  IDLE = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAILED = 3
}
