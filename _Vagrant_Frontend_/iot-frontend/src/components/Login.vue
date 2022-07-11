<template>
  <v-main>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center">
          <v-img src="@/assets/logo.png" max-width="300" />
        </v-col>
        <v-col cols="12" align="center">
          <v-card class="elevation-12" max-width="700px">
            <v-card-title>Acceso</v-card-title>
            <v-form @submit.prevent="login">
              <v-card-text>
                <v-text-field
                  v-model="form.username"
                  label="Usuario"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  label="Contraseña"
                  type="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn type="submit" :disabled="submit" color="primary"
                  >Acceder</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      submit: false,
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      this.openLoader();
      this.submit = true;
      const loginURL = `${this.$store.state.apiURL}login`;
      const loginParams = this.form;
      const loginRequest = await this.sendRequest(
        loginURL,
        loginParams,
        "POST"
      );

      if (loginRequest.success) {
        const { message, data } = loginRequest;
        this.showSuccessMessage(message);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.setTimeout(() => {
          window.location = "/";
        }, 2000);
      } else {
        this.submit = false;
      }
      this.closeLoader();
    },
  },
};
</script>