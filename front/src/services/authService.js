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

const dominio = `${API.node}marktel/server/auth`;

axios.interceptors.request.use((request) => {
  if (request.headers.Authorization == "") {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return request;
});

export default {
  async registrarUsuario(usuario) {
    try {
      const response = await axios.post(
        `${dominio}/registro`,
        usuario,
        configApi
      );
      alertSuccessReponse(response);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },

  async login(usuario) {
    try {
      const response = await axios.post(`${dominio}/login`, usuario, configApi);
      return response.data;
    } catch (error) {
      alertErrorResponse(error);
    }
  },
};
