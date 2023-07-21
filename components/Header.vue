<template>
  <v-app-bar
    elevation="0"
    :border="true"
  >
    <v-app-bar-title>
      <div class="flex-row">
        <v-icon icon="mdi-chart-box-outline" color="primary" />
        <span class="pl-2" style="user-select: none;">
          GEOM - ЦИФРОВОЙ ГТМ
        </span>
      </div>
    </v-app-bar-title>
    <HeaderNavigation v-if="isUserExists" />
    <v-spacer />
    <v-btn
      v-if="!isUserExists"
      :disabled="isButtonLoginDisable"
      :to="Routes.LOGIN"
      variant="outlined"
    >
      Логин
    </v-btn>
    <HeaderUserProfile v-else />
  </v-app-bar>
</template>

<script setup lang="ts">
import Routes from '~/constants/Routes';
const { currentRoute } = useRouter();
const { isExists: isUserExists } = useUser();
const isButtonLoginDisable = computed<boolean>(() => currentRoute.value.path === Routes.LOGIN.path);
</script>

<style scoped>

</style>
