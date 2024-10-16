// import { findAndRemove } from "../view/renderData.js"
import { rederData } from "../view/renderData.js"
import UseApi from "../data/remote/remoteApi.js"

class ConfirmDelete extends HTMLElement {
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  }
  static get observedAttributes() {
    return ["id"]
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
  }
  get note() {
    return this._note
  }

  set note(value) {
    this._note = value
    this.render()
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ""
  }

  _updateStyle() {
    this._style.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .confirm-delete{
                z-index: 99;
                font-family: sans-serif;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                height: 30%;
                text-align: center;
                padding: 3rem;
                width: 100%;
                background: aliceblue;
                border: 1px solid black;
                transition: .3s all linear;
            }
            span{
                color: #7E8EF1;
                }
            p{
                margin-bottom: 2rem;
            }
            .action button{
                width: 6rem;
                height: 2rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .cancel{
                border: 2px solid #7E8EF1;
            }
            .delete{
                background-color: #7E8EF1;
            }
                @media only screen and (min-width: 708px) {
                .confirm-delete{
                  border-radius: 15px
                }
                }
              
        `
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "id" && oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    const id = this.getAttribute("id") || "undefined"
    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `      
            <div class="confirm-delete">
                <p>Yakin Ingin Menghapus Catatan <span>${this.note.title}</span> dengan dari EC Notes?</p>
                <div class="action">
                    <button class="cancel">
                        Cancel
                    </button>
                    <button class="delete">
                        Delete
                    </button>
                </div>
            </div>
        `

    this._shadowRoot.querySelector(".cancel").addEventListener("click", () => {
      this._onCancel()
    })

    this._shadowRoot.querySelector(".delete").addEventListener("click", () => {
      this._onDelete()
    })
  }

  _onCancel() {
    document.querySelector("#del-container").classList.remove("show")
    document.querySelector(".bg-cencel").classList.remove("show")
  }

  async _onDelete() {
    try {
      await UseApi.deleteNote(this.note.id)
      const popup = document.querySelector("popup-alert")
      popup.customAlert = "Berhasil Menghapus Note!"
      popup.type = "success"
      popup.shadowRoot.querySelector(".popup-alert").classList.add("show")
      const data = await UseApi.getAllNote()
      await rederData(data)

      document.querySelector(".bg-cencel").classList.remove("show")
      document.querySelector("#del-container").classList.remove("show")
    } catch (error) {
      await Utils.popUpInformation("Failed gagal menemukan note", "error")
      const getNewData = await UseApi.getAllNote()
      await rederData(getNewData)
    }
  }
}

customElements.define("confirm-delete", ConfirmDelete)
