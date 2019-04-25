export const auth = {
  passcode: {
    passcode: 'auth.passcode.passcode'
  },
  setPasscodeModal: {
    enterAgain: 'auth.modals.setPasscode.enterAgain',
    passcodeHint: 'auth.modals.setPasscode.passcodeHint'
  },
  enterPasscodeModal: {
    passcodeHint: 'auth.modals.enterPasscode.passcodeHint'
  },
  accounts: {
    title: 'auth.screens.accounts.title',
    noAccounts: {
      hint: 'auth.screens.accounts.noAccounts.hint',
      title: 'auth.screens.accounts.noAccounts.title'
    },
    addAccount: 'auth.screens.accounts.addAccount',
    createAccount: 'auth.screens.accounts.createAccount'
  },
  createAccount: {
    step: 'auth.screens.createAccount.step',
    title: 'auth.screens.createAccount.title',
    notePassphrase: 'auth.screens.createAccount.notePassphrase',
    notePassphraseHint: 'auth.screens.createAccount.notePassphraseHint',
    notePassphraseHint2: 'auth.screens.createAccount.notePassphraseHint2',
    howToGenerate: 'auth.screens.createAccount.howToGenerate',
    generateSeed: 'auth.screens.createAccount.generateSeed',
    generatedPercent: 'auth.screens.createAccount.generatedPercent',
    createAccount: 'auth.screens.createAccount.createAccount',
    enterPin: 'auth.screens.createAccount.enterPin',
    enterPinHint: 'auth.screens.createAccount.enterPinHint',
    next: 'core.actions.next'
  },
  addAccount: {
    title: 'auth.screens.addAccount.title',
    createAccount: 'auth.screens.addAccount.createAccount',
    hint: 'auth.screens.addAccount.hint',
    importAccount: 'auth.screens.addAccount.importAccount'
  },
  importAccount: {
    import: 'auth.screens.importAccount.import',
    activeAccount: 'auth.screens.importAccount.activeAccount',
    activeAccountHint: 'auth.screens.importAccount.activeAccountHint',
    passiveAccountHint: 'auth.screens.importAccount.passiveAccountHint',
    title: 'auth.screens.importAccount.title'
  },
  errors: {
    accountExist: 'auth.errors.accountExist',
    incorrectAddress: 'auth.errors.incorrectAddress',
    incorrectPassphrase: 'auth.errors.incorrectPassphrase',
    insecurePin: 'auth.errors.insecurePin',
    incorrectPasscode: 'auth.errors.incorrectPasscode'
  },
  models: {
    account: {
      id: 'models.account.id',
      address: 'models.account.address',
      pin: 'models.account.pin',
      passphrase: 'models.account.passphrase'
    },
    passcode: {
      passcode: 'auth.models.passcode.passcode'
    }
  }
};

export const core = {
  screens: {
    home: {
      title: 'core.screens.home.title',
      recentTransactions: 'core.screens.home.recentTransactions',
      accountsList: 'core.screens.home.accountsList'
    },
    send: {
      title: 'core.screens.send.title'
    },
    receive: {
      title: 'core.screens.receive.title'
    }
  }
};
