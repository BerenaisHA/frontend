<template>
  <div>
    <v-dialog v-model="modalStatus" scrollable persistent>
      <v-card>
        <v-form @submit.prevent="save">
          <v-card-title>
            <span class="headline">Nuevo usuario</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field v-model="form.name" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.username"
                  label="Usuario"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.password"
                  type="password"
                  label="Contraseña"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red" dark @click="closeModal(false)">Cerrar</v-btn>
            <v-btn type="submit" color="success">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "New",
  props: ["openModal"],
  data() {
    return {
      modalStatus: this.openModal,
      form: {},
    };
  },
  methods: {
    async save() {
      this.openLoader();
      const newUserURL = `${this.$store.state.apiURL}users`;
      const newUserParams = this.form;
      const newUserRequest = await this.sendRequest(
        newUserURL,
        newUserParams,
        "POST"
      );

      if (newUserRequest.success) {
        this.showSuccessMessage(newUserRequest.message);
        this.closeModal(true);
      }
      this.closeLoader();
    },
    closeModal(reload = false) {
      this.modalStatus = false;
      this.$emit("close-modal", reload);
    },
  },
};
</script>