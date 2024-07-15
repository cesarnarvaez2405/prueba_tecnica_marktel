import axios from "axios";
import API from "../api/apiNode";
import {
  alertErrorResponse,
  alertSuccessReponse,
} from "../utils/alertResponseHttpUtils";

const configApi = {
  headers: {
    Authorization: "",
  },
};

const dominio = `${API.node}marktel/server/usuarios`;

axios.interceptors.request.use((request) => {
  if (request.headers.Authorization == "") {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return request;
});

export default {
  async buscarTodos() {
    try {
      const response = await axios.get(`${dominio}`, configApi);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },

  async actualizar(datoActualizar, usuarioId) {
    try {
      const response = await axios.patch(
        `${dominio}/${usuarioId}`,
        datoActualizar,
        configApi
      );
      alertSuccessReponse(response);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },

  async borrar(usuarioId) {
    try {
      const response = await axios.delete(`${dominio}/${usuarioId}`, configApi);
      alertSuccessReponse(response);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },

  async buscarPorId(usuarioId) {
    try {
      const response = await axios.get(`${dominio}/${usuarioId}`, configApi);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },
};
