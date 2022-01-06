import axios from 'axios'

export default function (url, query) {
  return axios.get(url, { params: { type: query } }).then(res => res.data)
}
