import axios from "axios";
import toast from "react-hot-toast";

export const backendApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: null,
    },
    actions: {
      // Register new user
      createUser: async (user) => {
        try {
          toast.loading("Creando usuario...");
          const response = await backendApi.post("/users", user);
          toast.dismiss();
          toast.success("Usuario creado exitosamente", { icon: "🚀" });
          return response;
        } catch (error) {
          toast.dismiss();
          toast.error(error.response.data.message);
          console.error(error);
          return null;
        }
      },

      // Register new professional
      createProfessional: async (data) => {
        try {
          toast.loading("Registrando profesional...");
          const response = await backendApi.post("/professionals", data);
          toast.dismiss();
          toast.success("Profesional registrado exitosamente", { icon: "🚀" });
          return response;
        } catch (error) {
          toast.dismiss();
          toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },

      // Update user
      updateUser: async (id, data) => {
        try {
          const response = await backendApi.put(`/users/${id}`, data);
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      // login user
      login: async (email, password) => {
        try {
          toast.loading("Iniciando sesión...");
          const response = await backendApi.post("/login", {
            email,
            password,
          });

          localStorage.setItem("token", response.data.token);
          setStore({ currentUser: response.data.user || response.data.professional });
          toast.dismiss();
          toast.success("Inicio de sesión exitoso", { icon: "🚀" });
          return true;
        } catch (error) {
          console.log(error)
          if (error.response.status === 400) {
            setStore({ currentUser: null });
          }
          toast.dismiss();
          toast.error("Credenciales inválidas");
          return false;
        }
      },



      verifyToken: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          setStore({ currentUser: null });
          return false;
        }

        try {
          const response = await backendApi.get("/verify_token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setStore({ currentUser: response.data.user || response.data.professional });
          return true;
        } catch (error) {
          localStorage.removeItem("token");
          setStore({ currentUser: null });
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({ currentUser: null });
        toast.success("Cierre de sesión exitoso", { icon: "👋" });
      },
      getCalendlyAccessToken: (code) => {
        backendApi.post("/calendly/token", { code })
          .then((response) => {
            localStorage.setItem("calendlyResponse", JSON.stringify(response.data));
          });
      },

      // Get all the professionals
      getProfessionals: async () => {
        try {
          const response = await backendApi.get("/professionals");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      // Get a single professional
      getProfessional: async (id) => {
        try {
          const response = await backendApi.get(`/professionals/${id}`);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      updateProfessional: async (id, data) => {
        try {
          const response = await backendApi.put(`/professionals/${id}`, data);
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      getStates: async () => {
        try {
          const response = await backendApi.get("/states");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      getSpecialities: async () => {
        try {
          const response = await backendApi.get("/specialities");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
  };
};

export default getState;
