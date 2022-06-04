import axios from "axios";
import {user} from "../stores";

export class PlaceMarkService {
  placemarkUrl = "";

  constructor(placemarkUrl) {
    this.placemarkUrl = placemarkUrl;
    const placeMarkCredentials = localStorage.placeMark;
    if (placeMarkCredentials) {
      const savedUser = JSON.parse(placeMarkCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
        id: savedUser.id,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
          id: response.data.userid,
        });
        localStorage.placeMark = JSON.stringify({email: email, token: response.data.token, id: response.data.userid});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
      id: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placeMark");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.placemarkUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async createUser(user) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getUser(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async deleteAllUsers() {
    try {
      const res = await axios.delete(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async createCategory(category) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/categories`, category);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async deleteAllCategories() {
    try {
      const response = await axios.delete(`${this.placemarkUrl}/api/categories`);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async deleteCategory(id) {
    try {
      const response = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
      return response;
    } catch (error) {
      return false;
    }
  }

  async getUserCategories(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/categories/foruser/${id}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getAllCategories() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/categories`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getCategory(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getAllPois() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/pois`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async createPoi(id, poi) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/categories/${id}/pois`, poi);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async deleteAllPois() {
    try {
      const res = await axios.delete(`${this.placemarkUrl}/api/pois`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async getPoi(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/pois/${id}`);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async deletePoi(id) {
    try {
      const res = await axios.delete(`${this.placemarkUrl}/api/pois/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
  async updatePoi(id, poi) {
    try {
      const res = await axios.put(`${this.placemarkUrl}/api/pois/${id}`, poi);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async uploadImageToPoi(id, image) {
    try {
      const formData = new FormData();
      formData.append("file",image);
      const res = await axios.post(`${this.placemarkUrl}/api/pois/${id}/uploadimage`, formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  }
  async updateImageToPoi(id, image) {
    try {
      const formData = new FormData();
      formData.append("file",image);
      const res = await axios.post(`${this.placemarkUrl}/api/pois/${id}/updateimage`, formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  }
}
