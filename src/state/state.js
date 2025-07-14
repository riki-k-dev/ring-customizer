import { proxy } from "valtio"

const state = proxy({
  current: null,
  items: {
    inner: "#ffffff",
    outer: "#cccccc",
    gem: "#eeeeee"
  }
})

export default state