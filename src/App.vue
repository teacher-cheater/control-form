<script setup lang="ts">
import { ref, computed } from "vue";
import { useAccountsStore } from "./stores/accounts";
const store = useAccountsStore();
const accountLabels = ref<Record<string, string>>({});
const accounts = computed(() => store.accounts);

store.accounts.forEach(account => {
  accountLabels.value[account.id] = account.labels.map(l => l.text).join(';')
})

const addAccount = () => {
  store.addAccount();
  const newAccount = store.accounts[store.accounts.length - 1];
  accountLabels.value[newAccount.id] = "";
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
                  label="Метка"
                  hint="Введите текстовые метки через точку с запятой (;)"
                  :maxlength="50"
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-select label="Тип записи" />
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field label="Логин" :maxlength="100" />
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field label="Пароль" type="password" :maxlength="100" />
              </v-col>

              <v-col cols="12" md="1">
                <v-btn color="error" icon="mdi-delete" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
