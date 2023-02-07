import axios from "axios";
import store from '../store'

class Api {
  async getUsersList() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserData(id) {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/users/${id}`);
      await store.commit('SET_CURRENT_USER', response.data);
      console.log(store, 'store')
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getTodoList() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/todos`);
      await store.commit('SET_TODOS', response.data);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Api();
