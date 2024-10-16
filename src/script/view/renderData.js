import NotesData from "../data/local/dummy.js"
import UseApi from "../data/remote/remoteApi.js"
import Utils from "../Utils.js"

export async function rederData(searchData, key) {
  const noteListElement = await document.querySelector("note-list")
  noteListElement.notFoundMessage = key ? key : "data"

  let displayData = async (notes) => {
    noteListElement.dataLength = await searchData.length

    const noteItemElements = await notes.map((note) => {
      const noteItemElemen = document.createElement("note-item")

      noteItemElemen.slot = note.archived ? "isArchive" : "notArchive"

      noteItemElemen.note = note
      return noteItemElemen
    })
    await Utils.emptyElemnt(noteListElement)
    await noteListElement.append(...noteItemElements)
  }

  await displayData(searchData)
}

export function findAndRemove(noteId) {
  try {
    UseApi.deleteNote(noteId)
  } catch (err) {
    console.log(err)
  }
}

export const showLoading = () => {
  const notesLoadingElement = document.querySelector("loading-animation")
  const notesListContainerElement = document.querySelector("#noteListContainer")

  Array.from(notesListContainerElement.children).forEach((element) => {
    Utils.hideElement(element)
  })
  Utils.showElement(notesLoadingElement)
}

export const showNotesList = () => {
  const notesListContainerElement = document.querySelector("#noteListContainer")
  const notesListElement = document.querySelector("note-list")

  Array.from(notesListContainerElement.children).forEach((element) => {
    Utils.hideElement(element)
  })
  Utils.showElement(notesListElement)
}

export async function handleSearch(event) {
  event.preventDefault()
  const data = NotesData.getSearchNote(event.target.value)

  showLoading()
  await new Promise((resolve) => setTimeout(resolve, 500))
  await rederData(data)
  showNotesList()
}
