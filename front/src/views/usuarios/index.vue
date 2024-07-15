<template>
  <usuarios-layout>
    <template v-slot:boton>
      <div
        class="flex flex-row justify-center items-center gap-1 cursor-pointer"
        @click="volverSubmodulo()"
      >
        <arrow-left-icon class="size-5" />

        <p>Volver</p>
      </div>
    </template>

    <template v-slot:titulo>
      <h1 class="text-4xl font-bold">Gestion de usuarios</h1>
    </template>

    <template v-slot:table>
      <div class="bg-blue-950">
        <Table :headers="headerUsuarios" :items="listaUsuarios">
          <template v-slot:estado="{ item }">
            <div class="font-bold">
              <h2 class="text-green-600" v-if="item.estaActivo == true">
                ACTIVO
              </h2>
              <h2 class="text-red-600" v-else>INACTIVO</h2>
            </div>
          </template>

          <template v-slot:opciones="{ item }">
            <div class="flex justify-center items-center gap-2">
              <div>
                <pencil-square-icon
                  @click="abrirModalUsuario(item.id)"
                  class="size-5 text-yellow-600 cursor-pointer hover:text-blue-800 transition-all ease-in-out duration-150"
                />
              </div>

              <div>
                <trash-icon
                  @click="eliminarUsuario(item)"
                  class="size-5 text-red-600 cursor-pointer hover:text-blue-800 transition-all ease-in-out duration-150"
                />
              </div>

              <div>
                <lock-closed-icon
                  @click="cambiarEstado(false, item)"
                  v-if="item.estaActivo == true"
                  class="size-5 text-orange-600 cursor-pointer hover:text-blue-800 transition-all ease-in-out duration-150"
                />

                <lock-open-icon
                  @click="cambiarEstado(true, item)"
                  v-else
                  class="size-5 text-green-500 cursor-pointer hover:text-blue-800 transition-all ease-in-out duration-150"
                />
              </div>
            </div>
          </template>
        </Table>
      </div>

      <modal-usuario
        ref="modalUsuarioRef"
        @obtener-usuarios="obtenerUsuarios"
      />
    </template>
  </usuarios-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  PencilSquareIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/solid";
import Swal from "sweetalert2";
import usuariosLayout from "./layout/usuariosLayout.vue";
import usuariosService from "../../services/usuariosService";
import { useAuthStore } from "../../store/auth";
import Table from "../../components/table.vue";
import modalUsuario from "./modal/modalUsuario.vue";
import router from "../../router";

const store = useAuthStore();

const listaUsuarios = ref([]);
const modalUsuarioRef = ref();
const headerUsuarios = ref([
  {
    text: "Nombre",
    value: "nombre",
  },
  {
    text: "Username",
    value: "username",
  },
  {
    text: "Email",
    value: "email",
  },
  {
    text: "Rol",
    value: "rol",
  },
  {
    text: "Estado",
    value: "estado",
  },
]);

onMounted(async () => {
  await obtenerUsuarios();

  if (store.rol === "admin") {
    headerUsuarios.value.push({
      text: "Opciones",
      value: "opciones",
    });
  }
});

const obtenerUsuarios = async () => {
  listaUsuarios.value = await usuariosService.buscarTodos();
};

const cambiarEstado = (estado, item) => {
  Swal.fire({
    title: `¡Advertencia!`,
    text: `Estas seguro de ${item.estaActivo ? "Inactivar" : "Activar"} a ${
      item.username
    } ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#06B357",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await usuariosService.actualizar(
        {
          estaActivo: estado,
        },
        item.id
      );

      await obtenerUsuarios();
    }
  });
};

const eliminarUsuario = (item) => {
  Swal.fire({
    title: `¡Advertencia!`,
    text: `Estas seguro de Eliminar a ${item.username} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#06B357",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await usuariosService.borrar(item.id);
      await obtenerUsuarios();
    }
  });
};

const abrirModalUsuario = (itemId) => {
  modalUsuarioRef.value.abrirModal(itemId);
};

const volverSubmodulo = () => {
  router.push({ name: "home" });
};
</script>

<style>
</style>