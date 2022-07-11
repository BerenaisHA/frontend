<template>
  <div>
    <v-dialog v-model="modalStatus" scrollable persistent>
      <v-card>
        <v-form @submit.prevent="save">
          <v-card-title>
            <span class="headline">Editar usuario</span>
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
  name: "Edit",
  props: ["openModal", "user"],
  data() {
    return {
      modalStatus: this.openModal,
      form: { ...this.user },
    };
  },
  methods: {
    async save() {
      this.openLoader();
      const editUserURL = `${this.$store.state.apiURL}users/${this.user.id}`;
      const editUserParams = this.form;
      const editUserRequest = await this.sendRequest(
        editUserURL,
        editUserParams,
        "PUT"
      );

      if (editUserRequest.success) {
        this.showSuccessMessage(editUserRequest.message);
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