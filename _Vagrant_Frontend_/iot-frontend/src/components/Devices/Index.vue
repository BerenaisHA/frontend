<template>
  <div>
    <v-card>
      <v-card-title>Dispositivos</v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha / Hora de creación</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in devices" :key="device.id">
              <td>{{ device.id }}</td>
              <td>{{ device.name }}</td>
              <td>{{ device.created_at }}</td>
              <td>{{ device.active ? "Activo" : "Inactivo" }}</td>
              <td>
                <v-btn color="orange" fab small @click="edit(device)">
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  v-if="device.active"
                  fab
                  small
                  @click="changeStatus(device)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  color="green"
                  v-else
                  fab
                  small
                  @click="changeStatus(device)"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                  v-if="device.active"
                  fab
                  color="blue"
                  :to="`/dispositivos/${device.key}`"
                  small
                  target="_blank"
                >
                  <v-icon>mdi-monitor-eye</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-fab-transition>
      <v-btn fab fixed bottom right color="primary" @click="openNewDeviceModal">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <New
      :openModal="newDeviceModal"
      @close-modal="closeNewDeviceModal"
      v-if="newDeviceModal"
    />
    <Edit
      :openModal="editDeviceModal"
      @close-modal="closeEditDeviceModal"
      v-if="editDeviceModal"
      :device="device"
    />
  </div>
</template>

<script>
import New from "./New";
import Edit from "./Edit";
export default {
  name: "Devices",
  components: { New, Edit },
  data() {
    return {
      devices: [],
      device: {},
      newDeviceModal: false,
      editDeviceModal: false,
    };
  },
  methods: {
    async getDevices() {
      this.openLoader();
      const devicesURL = `${this.$store.state.apiURL}devices`;
      const devicesRequest = await this.sendRequest(devicesURL);

      if (devicesRequest.success) {
        this.devices = devicesRequest.data;
      }
      this.closeLoader();
    },
    openNewDeviceModal() {
      this.newDeviceModal = true;
    },
    closeNewDeviceModal(reload) {
      if (reload) this.getDevices();
      this.newDeviceModal = false;
    },
    edit(device) {
      this.device = device;
      this.editDeviceModal = true;
    },
    closeEditDeviceModal(reload) {
      if (reload) this.getDevices();
      this.editDeviceModal = false;
    },
    async changeStatus({ id, active }) {
      this.openLoader();
      const deviceStatusURL = `${this.$store.state.apiURL}devices/${id}`;
      const deviceStatusRequest = await this.sendRequest(
        deviceStatusURL,
        {
          active: !active,
        },
        "PUT"
      );
      if (deviceStatusRequest.success) {
        this.showSuccessMessage(deviceStatusRequest.message);
        setTimeout(this.getDevices);
      }
      this.closeLoader();
    },
  },
  created() {
    this.getDevices();
  },
};
</script>