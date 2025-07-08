import { defineStore } from "pinia";

interface Label {
  text: string;
}

interface Account {
  id: string;
  labels: Label[];
  accountType: "LDAP" | "Локальная";
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now().toString(),
        labels: [],
        accountType: "Локальная",
        login: "",
        password: "",
      });
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter(account => account.id !== id);
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(a => a.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = { ...this.accounts[index], ...updatedAccount };
      }
    },
  },
  persist: true,
});
