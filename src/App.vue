<script setup lang="ts">
import { ref, computed } from "vue";
import { useAccountsStore } from "@/stores/accounts";
const store = useAccountsStore();

interface Label {
  text: string;
}

type AccountType = "LDAP" | "Локальная";

interface Account {
  id: string;
  login: string;
  password?: string | null;
  accountType: AccountType;
  labels: Label[];
}

const accountLabels = ref<Record<string, string>>({});
const accounts = computed<Account[]>(() => store.accounts);

store.accounts.forEach(account => {
  accountLabels.value[account.id] = account.labels.map(l => l.text).join(";");
});

const accountTypes: { title: string; value: AccountType }[] = [
  { title: "LDAP", value: "LDAP" },
  { title: "Локальная", value: "Локальная" },
];

const loginRules = [
  (v: string) => !!v || "Обязательное поле",
  (v: string) => v.length <= 100 || "Максимум 100 символов",
];

const passwordRules = [
  (v: string) => !!v || "Обязательное поле",
  (v: string) => v.length <= 100 || "Максимум 100 символов",
];

const addAccount = () => {
  store.addAccount();
  const newAccount = store.accounts[store.accounts.length - 1];
  accountLabels.value[newAccount.id] = "";
};

const removeAccount = (id: string) => {
  store.removeAccount(id);
  delete accountLabels.value[id];
};

const updateLabels = (accountId: string) => {
  const account = store.accounts.find(
    (a: { id: string }) => a.id === accountId
  );
  if (account) {
    const labels: Label[] = accountLabels.value[accountId]
      ? accountLabels.value[accountId]
          .split(";")
          .map(text => text.trim())
          .filter(text => text)
          .map(text => ({ text }))
      : [];

    store.updateAccount({
      ...account,
      labels,
    });
  }
};

const updateAccount = (account: any) => {
  store.updateAccount(account);
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h4">
            Учетные записи
            <v-btn @click="addAccount" color="primary" icon="mdi-plus" />
          </h1>
        </div>
        <v-card v-for="account in accounts" :key="account.id" class="mb-4">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" align-self="center">
                <v-text-field
                  v-model="accountLabels[account.id]"
                  label="Метка"
                  hint="Введите текстовые метки через точку с запятой (;)"
                  :maxlength="50"
                  @blur="updateLabels(account.id)"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="account.accountType"
                  :items="accountTypes"
                  label="Тип записи"
                  @update:model-value="updateAccount(account)"
                />
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  :rules="loginRules"
                  v-model="account.login"
                  label="Логин"
                  :maxlength="100"
                  @blur="updateAccount(account)"
                />
              </v-col>

              <v-col
                v-if="account.accountType === 'Локальная'"
                cols="12"
                md="2"
              >
                <v-text-field
                  v-model="account.password"
                  label="Пароль"
                  type="password"
                  :rules="passwordRules"
                  :maxlength="100"
                  @blur="updateAccount(account)"
                />
              </v-col>

              <v-col cols="12" md="1">
                <v-btn
                  @click="removeAccount(account.id)"
                  color="error"
                  icon="mdi-delete"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
