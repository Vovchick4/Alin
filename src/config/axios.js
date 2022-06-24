import axios from 'axios'

axios.defaults.baseURL = 'https://alin.ua/api'
// axios.defaults.headers.common = 'uk'

export function setLocale(lng) {
    // axios.defaults.params.locale = lng
    // console.log(axios.defaults.params.locale);
}

// export function setToken(token) {
//   axios.defaults.headers.Authorization = `Bearer ${token}`;
// }

// export function unsetToken() {
//   axios.defaults.headers.Authorization = null;
// }