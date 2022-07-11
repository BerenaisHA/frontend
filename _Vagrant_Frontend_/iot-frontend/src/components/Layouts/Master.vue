<template>
  <div>
    <v-navigation-drawer app v-model="navBar">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ getUser().name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense>
        <v-list-item to="/dispositivos">
          <v-list-item-icon>
            <v-icon>mdi-devices</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dispositivos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getUser().id == 1" to="/usuarios">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="navBar = !navBar"></v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title>
        <v-img src="@/assets/logo.png" width="200" />
      </v-toolbar-title>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container>
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navBar: null,
    };
  },
  methods: {
    logout() {
      window.localStorage.clear();
      window.location = "/login";
    },
  },
};
</script>