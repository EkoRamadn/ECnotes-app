import NotesData from "../data/local/dummy"
import UseApi from "../data/remote/remoteApi"
import Utils from "../Utils"
import { rederData } from "../view/renderData"

class NoteItem extends HTMLElement {
  _shadowRoot = null
  _style = null
  _noteItemElement = null
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
    this._noteItemElement = document.createElement("div")

    this._noteItemElement.addEventListener("click", async () => {
      await window.dispatchEvent(
        new CustomEvent("openNote", { detail: this.note }),
      )
    })
  }

  _updateStyle() {
    this._style.textContent = `
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: sans-serif;
          }
              @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        .notes-item {
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-left: 6px solid #7E8EF1;
            border-bottom: 2px solid #7E8EF1;
            padding: 10px 4%;
            border-top-right-radius: 8px;
            margin-bottom: .5rem;
            transition: .3s all linear;
            display: flex;
            opacity: 0;
            transform: translateY(20px);
            margin-bottom: 10px;
        }
        .notes-item.fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .notes-item:hover {
            z-index: 999;
            scale: 1.01;
            box-shadow:
                0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06),
                0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                0 10px 10px rgba(0, 0, 0, 0.12);
        }
        .note-title {
            font-size: 17px;
            margin-bottom: .5rem;
        }
        .note-info {
            font-size: 14px;
            margin-bottom: .3rem;
        }
        .note-date {
            font-size: 13px;
            color: #2f2f2f;
        }
        .isArchive {
            display: block;
        }
        .right {
            width: 10%;
            display: flex;
            align-items: center;
        }
        .left {
            width: 90%;
        }
        .right > div {
            width: 20px;
        }
        :host .right .open {
            display: block;
        }
        :host .right .action {
            display: none;
        }
        :host(.active) .right .open {
            display: none;
        }
        :host(.active) .right .action {
            display: block;
        }
        :host(.active) .right .action .delete{
            padding: 2px;
            // border-radius: 1px;
        }
        :host(.active) .right .action .delete:hover{
            // background: #7E8EF1;     
        }
        @media only screen and (min-width: 708px) {
            .notes-item {
                padding: .5rem 1rem;
            }
        }`
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ""
  }

  get note() {
    return this._note
  }

  set note(value) {
    this._note = value
    this.render()
  }

  render() {
    this._emptyContent()
    this._updateStyle()
    this._noteItemElement.innerHTML = `
        <div class="notes-item fade-in">
            <div class="left">
                <h2 class="note-title">${this._note.title}</h2>
                <div class="note-body">
                    <p class="note-info">${this._note.body}</p>
                    <span class="note-date">${this._note.createdAt}</span>
                </div>
            </div>
            <div class="right">
                <div>
                    <svg class="open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path fill="#000000" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                    <div class="action">
                        <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path fill="#000000" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                        <svg class="toArchive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    `
    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.appendChild(this._noteItemElement)

    const deleteButton = this._noteItemElement.querySelector(".delete")
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation()
      document.querySelector("#del-container").classList.add("show")
      document.querySelector(".bg-cencel").classList.add("show")

      window.dispatchEvent(
        new CustomEvent("confirmDelete", { detail: this.note }),
      )
    })

    const toArchive = this._noteItemElement.querySelector(".toArchive")
    toArchive.addEventListener("click", async (event) => {
      try {
        await event.stopPropagation()
        if (this.note.archived) {
          await UseApi.unArchiveNote(this.note.id)
          const data = await UseApi.getAllNote()
          await rederData(data)
          return
        }
        await UseApi.archiveNote(this.note.id)
        const alert = await document.createElement("simple-alert")
        alert.message = await "Archiving"
        alert.duration = await 500
        await document.body.appendChild(alert)
        const data = await UseApi.getAllNote()
        await rederData(data)
      } catch (error) {
        await Utils.popUpInformation("Failed", "error")
        const getNewData = await UseApi.getAllNote()
        await rederData(getNewData)
      }
    })
  }

  connectedCallback() {
    this.classList.add("fade-in")
  }
}

customElements.define("note-item", NoteItem)
