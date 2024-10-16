import "./style/global.css"
import "./script/components/index.js"
import { rederData } from "./script/view/renderData.js"
import UseApi from "./script/data/remote/remoteApi.js"
import Utils from "./script/Utils.js"

document.addEventListener("DOMContentLoaded", async () => {
  const myData = await UseApi.getAllNote()
  const newNOtes = await myData
  if (!sessionStorage.getItem("login")) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  await rederData(newNOtes)
})

const form = document.querySelector("#creator")
const titleInput = form.elements.title
const bodyInput = form.elements.body
form.addEventListener("submit", async (event) => {
  try {
    await event.preventDefault()

    const newNOte = {
      title: titleInput.value,
      body: bodyInput.value,
    }
    await UseApi.createNotes(newNOte)
    const myData = await UseApi.getAllNote()

    await rederData(myData)

    await document.querySelector("#create-note").classList.remove("show")
    await document.querySelector(".bg-cencel").classList.remove("show")

    const popup = document.querySelector("popup-alert")
    popup.customAlert = "Berhasil Membuat Note Baru!"
    popup.type = "success"
    popup.shadowRoot.querySelector(".popup-alert").classList.add("show")

    await form.reset()
  } catch (err) {
    const popup = document.querySelector("popup-alert")
    popup.customAlert = "Gagal Membuat Note!"
    popup.type = "error"
    popup.shadowRoot.querySelector(".popup-alert").classList.add("show")
    await console.log(err)
  }
})

titleInput.addEventListener("invalid", (event) => vlidationInput(event, 3))
bodyInput.addEventListener("invalid", (event) => vlidationInput(event, 6))

function vlidationInput(event, lenght) {
  event.target.setCustomValidity("")

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi.")
    return
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity(`Minimal panjang adalah ${lenght} karakter.`)
    return
  }
}

const noteInfoContainerElement = document.querySelector("#note-info")

window.addEventListener("openNote", async (event) => {
  try {
    document.querySelector(".bg-cencel").classList.add("show")
    const alert = await document.createElement("simple-alert")
    alert.message = await "open"
    alert.duration = await 700

    document.body.appendChild(alert)
    const get = await UseApi.getSingleNote(event.detail.id)
    noteInfoContainerElement.innerHTML = await ""
    const noteInfoContent = await document.createElement("note-info")
    const note = await get
    noteInfoContent.note = await note

    await noteInfoContainerElement.appendChild(noteInfoContent)
    await document.querySelector("#note-info").classList.add("show")
  } catch (error) {
    await Utils.popUpInformation("Failed", "error")
    const getNewData = await UseApi.getAllNote()
    await rederData(getNewData)
    console.log(error)
  }
})
