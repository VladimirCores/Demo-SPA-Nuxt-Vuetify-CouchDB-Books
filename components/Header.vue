<template>
  <v-app-bar
    elevation="0"
    :border="true"
  >
    <v-app-bar-title>
      <div class="flex-row">
        <v-icon icon="mdi-chart-box-outline" color="primary" />
        <NuxtLink
          :to="isNavigateIndexPossible ? '/' : null"
          class="pl-2"
          style="text-decoration: none; color: inherit; user-select: none;"
        >
          GEOM
        </NuxtLink>
      </div>
    </v-app-bar-title>
    <HeaderNavigation v-if="isUserExists" />
    <v-spacer />
    <v-btn
      v-if="!isUserExists"
      :disabled="isButtonLoginDisabled"
      :to="Routes.LOGIN"
      variant="outlined"
    >
      Логин
    </v-btn>
    <template v-else>
      <HeaderUserProfile />
      <HeaderActionMenu @logout="onLogout" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import Routes from '~/constants/Routes';
const { currentRoute, replace } = useRouter();
const { isExists: isUserExists, resetProfile: resetUserProfile } = useUser();
const isButtonLoginDisabled = computed<boolean>(() => currentRoute.value.path === Routes.LOGIN.path);
const isNavigateIndexPossible = computed<boolean>(() => !isUserExists.value && currentRoute.value.path !== Routes.INDEX.path);

const onLogout = () => {
  console.log('> Header -> onLogout');
  useNuxtApp()
    .$connect()
    .logOut()
    .then(resetUserProfile)
    .then(replace(Routes.INDEX));
};
</script>

<style scoped>

</style>
