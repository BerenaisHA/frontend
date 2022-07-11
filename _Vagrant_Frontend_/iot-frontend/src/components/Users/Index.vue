<template>
  <div>
    <v-card>
      <v-card-title>Usuarios</v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Fecha / Hora de creación</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.created_at }}</td>
              <td>{{ user.active ? "Activo" : "Inactivo" }}</td>
              <td>
                <v-btn color="orange" fab small @click="edit(user)">
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="user.active && user.id != 1"
                  color="red"
                  fab
                  small
                  @click="changeStatus(user)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  v-if="!user.active && user.id != 1"
                  color="green"
                  fab
                  small
                  @click="changeStatus(user)"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-fab-transition>
      <v-btn fab fixed bottom right color="primary" @click="openNewUserModal">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <New
      :openModal="newUserModal"
      @close-modal="closeNewUserModal"
      v-if="newUserModal"
    />
    <Edit
      :openModal="editUserModal"
      @close-modal="closeEditUserModal"
      v-if="editUserModal"
      :user="user"
    />
  </div>
</template>

<script>
import New from "./New";
import Edit from "./Edit";
export default {
  name: "Users",
  components: { New, Edit },
  data() {
    return {
      users: [],
      user: {},
      newUserModal: false,
      editUserModal: false,
    };
  },
  methods: {
    async getUsers() {
      this.openLoader();
      const usersURL = `${this.$store.state.apiURL}users`;
      const usersRequest = await this.sendRequest(usersURL);

      if (usersRequest.success) {
        this.users = usersRequest.data;
      }
      this.closeLoader();
    },
    openNewUserModal() {
      this.newUserModal = true;
    },
    closeNewUserModal(reload) {
      if (reload) this.getUsers();
      this.newUserModal = false;
    },
    edit(user) {
      this.user = user;
      this.editUserModal = true;
    },
    closeEditUserModal(reload) {
      if (reload) this.getUsers();
      this.editUserModal = false;
    },
    async changeStatus({ id, active }) {
      this.openLoader();
      const userStatusURL = `${this.$store.state.apiURL}users/${id}`;
      const userStatusRequest = await this.sendRequest(
        userStatusURL,
        {
          active: !active,
        },
        "PUT"
      );
      if (userStatusRequest.success) {
        this.showSuccessMessage(userStatusRequest.message);
        setTimeout(this.getUsers);
      }
      this.closeLoader();
    },
  },
  created() {
    this.getUsers();
  },
};
</script>