import axios from 'axios'

axios.defaults.baseURL = 'https://alin-back.herokuapp.com/api/'

export function setLocale(lng) {
    axios.defaults.headers.locale = lng;
}

// export function setToken(token) {
//   axios.defaults.headers.Authorization = `Bearer ${token}`;
// }

// export function unsetToken() {
//   axios.defaults.headers.Authorization = null;
// }