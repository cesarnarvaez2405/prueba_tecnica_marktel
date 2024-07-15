<template>
  <Form
    v-slot="{ errors }"
    class="flex flex-col gap-2"
    @submit="props.estaEditando ? editarUsuario() : registrarUsuario()"
  >
    <div class="flex flex-col">
      <Field
        name="nombre"
        placeholder="Nombre Completo"
        class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        :class="{
          ' border-red-700 border-2': errors.nombre,
        }"
        type="text"
        rules="required"
        v-model="usuario.nombre"
      />
      <error-alert :name="'nombre'" />
    </div>

    <div class="flex flex-col">
      <Field
        name="username"
        placeholder="Username"
        class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        :class="{
          ' border-red-700 border-2': errors.username,
        }"
        type="text"
        rules="required"
        v-model="usuario.username"
      />
      <error-alert :name="'username'" />
    </div>

    <div class="flex flex-col">
      <Field
        name="email"
        placeholder="email"
        class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        :class="{
          ' border-red-700 border-2': errors.email,
        }"
        type="text"
        rules="required"
        v-model="usuario.email"
      />
      <error-alert :name="'email'" />
    </div>

    <div v-if="props.estaEditando" class="flex gap-2">
      <Field
        name="editar"
        type="checkbox"
        v-model="editarPassword"
        value="true"
        @change="verificarPassword()"
      />
      <p class="text-white font-semibold">Editar el password?</p>
    </div>

    <div v-if="editarPassword || !props.estaEditando">
      <div class="flex flex-row space-x-2">
        <div class="flex-1">
          <Field
            name="password"
            placeholder="Contraseña"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            :class="{
              'border-red-700 border-2': errors.password,
            }"
            type="password"
            rules="required|max-8"
            v-model="usuario.password"
          />
          <error-alert name="password" />
        </div>

        <div class="flex-1">
          <Field
            name="secondPassword"
            placeholder="Confirmación de Contraseña"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            :class="{
              'border-red-700 border-2': errors.secondPassword,
            }"
            type="password"
            rules="required|max-8"
            v-model="usuario.confirmacionPassword"
          />
          <error-alert name="secondPassword" />
        </div>
      </div>
    </div>

    <div v-if="!coincidePassword && !errors.secondPassword && !errors.password">
      <span class="text-red-500 font-semibold text-sm">
        Las contraseñas no coinciden
      </span>
    </div>

    <div>
      <p v-if="!props.estaEditando" class="text-white">
        Ya tienes una cuenta?
        <a
          class="text-sm text-blue-500 -200 hover:underline cursor-pointer"
          @click="emit('cambiar-formulario')"
          >Iniciar Sección</a
        >
      </p>
      <button
        class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
        :class="{
          ' opacity-45 ':
            !coincidePassword && !errors.secondPassword && !errors.password,
        }"
        type="submit"
        :disabled="
          !coincidePassword && !errors.secondPassword && !errors.password
        "
      >
        {{ props.estaEditando ? "Editar Usuario" : "Registrar" }}
      </button>
    </div>
  </Form>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";

import errorAlert from "../../../../components/errorAlert.vue";
import authService from "../../../../services/authService";
import usuariosService from "../../../../services/usuariosService";

const emit = defineEmits(["cambiar-formulario", "cerrar-modal"]);
const props = defineProps({
  estaEditando: { type: Boolean, default: false },
  usuarioId: { type: Number },
});

const usuario = reactive({
  nombre: null,
  username: null,
  email: null,
  password: null,
  confirmacionPassword: null,
  rol: "admin",
});
const editarPassword = ref(false);

onMounted(async () => {
  if (props.estaEditando) {
    const datosUsuario = await usuariosService.buscarPorId(props.usuarioId);
    (usuario.nombre = datosUsuario.nombre),
      (usuario.username = datosUsuario.username),
      (usuario.email = datosUsuario.email),
      (usuario.rol = datosUsuario.rol);
  }
});

const coincidePassword = computed(() => {
  return usuario.password === usuario.confirmacionPassword;
});

const registrarUsuario = async () => {
  const usuarioACrear = {
    nombre: usuario.nombre,
    username: usuario.username,
    email: usuario.email,
    password: usuario.password,
    rol: usuario.rol,
  };
  await authService.registrarUsuario(usuarioACrear);
  emit("cambiar-formulario");
  limpiarFormulario();
};

const editarUsuario = async () => {
  const usuarioActualizar = {
    nombre: usuario.nombre,
    username: usuario.username,
    email: usuario.email,
    rol: usuario.rol,
  };
  await usuariosService.actualizar(usuarioActualizar, props.usuarioId);

  if (editarPassword.value) {
    const datosPassword = {
      password: usuario.password,
    };
    await authService.actualizarPassword(datosPassword, props.usuarioId);
  }
  emit("cerrar-modal");
  limpiarFormulario();
};

const verificarPassword = () => {
  if (!editarPassword.value) {
    usuario.password = null;
    usuario.confirmacionPassword = null;
  }
};

const limpiarFormulario = () => {
  usuario.nombre = null;
  usuario.username = null;
  usuario.password = null;
  usuario.email = null;
};
</script>

<style>
</style>