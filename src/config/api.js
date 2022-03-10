import axios from "axios";

const instance = axios.create({
  baseURL: "https://gamepad-mbelga.herokuapp.com/", // gamepad Backend
});

export default instance;
