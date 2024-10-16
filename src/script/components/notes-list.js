import Utils from "../Utils.js"

class NoteList extends HTMLElement {
  _shadowRoot = null
  _style = null
  _dataLength = null
  _dataSrc = null
  _itemElement = null
  _notFoundMessage = "Data not found"
  _nodataElemnt = null

  _gutter = 0.5
  _column = 1

  static get observedAttributes() {
    return ["column", "gutter", "dataSrc", "notFoundMessage"]
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
    this._nodataElemnt = `
    <style>
                .container {
                    padding: 20%;
                }
                img {
                    width: 100%;
                }
                p{
                  text-align: center;
                }
                
            </style>
            <div class="not-a-data">
                <div class="container">
                    <img src="./nodata.png" alt="No Data">
                </div>
                <p>Belum Ada Catatan Nih?</p>
            </div>
    `

    this._itemElement = `
      <section class="notes-list">
        <slot name="notArchive"></slot>
        <div class="isarchive">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          <h4> IsArchive</h4>
        </div>

          <slot name="isArchive"></slot>

      </section>
    `

    this.render()
  }

  get column() {
    return this._column
  }

  set column(value) {
    const newValue = Number(value)
    if (!Utils.isValidInteger(newValue)) return
    this._column = newValue
  }

  get gutter() {
    return this._gutter
  }

  set gutter(value) {
    const newValue = Number(value)
    if (!Utils.isValidInteger(newValue)) return
    this._gutter = newValue
  }

  get dataLength() {
    return this._dataLength
  }

  set dataLength(value) {
    this._dataLength = value
    this.render()
  }

  get dataSrc() {
    return this._dataSrc
  }

  set dataSrc(value) {
    this._dataSrc = value
    this.render()
  }

  get notFoundMessage() {
    return this._notFoundMessage
  }

  set notFoundMessage(value) {
    if (value === "data") {
      this._notFoundMessage = this._nodataElemnt
    } else {
      this._notFoundMessage = value + " tidak ditemukan"
    }
    this.render()
  }

  _updateStyle() {
    this._style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .notes-list {
        display: grid;
        grid-template-columns: ${"1fr ".repeat(this.column)};
      }
      .isarchive {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: .5rem .7rem;
        background: white;
        border-radius: 3px;
        border: .1px solid rgba(0,0,0,.2);
        margin-bottom: 1rem;
      }
      .isarchive svg {
        width: 20px;
      }
      @media only screen and (min-width: 708px) {
        .notes-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${this.gutter + "rem"};
        }
        .isarchive {
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
    `
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ""
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML +=
      this._dataLength === 0 ? this._notFoundMessage : this._itemElement
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      if (name === "dataSrc") {
        this.dataSrc = newValue
      } else if (name === "notFoundMessage") {
        this.notFoundMessage = newValue
      }
    }
  }
}

customElements.define("note-list", NoteList)
