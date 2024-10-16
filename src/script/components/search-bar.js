import NotesData from "../data/local/dummy.js"
import { rederData } from "../view/renderData.js"
import { showLoading, showNotesList } from "../view/renderData.js"

class SearchBar extends HTMLElement {
  _shadowRoot = null
  _style = null
  _form = null
  _searchBar = null
  _searchButton = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
    this._form = document.createElement("form")

    this._searchBar = document.createElement("input")
    this._searchBar.type = "text"
    this._searchBar.placeholder = "Search..."

    this._searchButton = document.createElement("button")
    this._searchButton.type = "button"
    this._searchButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M21 20l-5.7-5.7a7.5 7.5 0 10-1.4 1.4L20 21l1-1zm-11 0a6.5 6.5 0 116.5-6.5 6.5 6.5 0 01-6.5 6.5z"/>
      </svg>
    `
    this._searchButton.addEventListener(
      "click",
      this._handleSearchButtonClick.bind(this),
    )

    this._form.appendChild(this._searchBar)
    this._form.appendChild(this._searchButton)

    this._updateStyle()
    this.render()
  }

  async _handleSearch(event) {
    event.preventDefault()
    showLoading()

    let query = ""
    query = this._searchBar.value

    let data = null
    try {
      data = await NotesData.getSearchNote(query)

      await new Promise((resolve) => setTimeout(resolve, 700))

      await rederData(data, query)
      await showNotesList()
    } catch (error) {
      console.error("Error during search:", error)
    } finally {
      data = null
      query = ""
    }
  }

  _handleSearchButtonClick() {
    this._handleSearch({ preventDefault: () => {}, target: this._searchBar })
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ""
  }

  _updateStyle() {
    this._style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
      }
      
      form {
        width: 100%;
        height: 45px;
        position: relative;
        margin-bottom: 1.5rem;
        display: flex;
      }

      input {
        flex: 1;
        height: 45px;
        outline: none;
        border: none;
        padding-left: 1.3rem;
        font-size: 16px;
        background-color: #fff;
        border: 1px solid #7E8EF1;
        border-radius: 30px 0 0 30px;
      }

      button {
        height: 45px;
        width: 45px;
        border: none;
        outline: none;
        background-color: #7E8EF1;
        color: white;
        cursor: pointer;
        border-radius: 0 30px 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button svg {
        fill: white;
      }

      button:hover {
        background-color: #5e6bd8;
      }
    `
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._emptyContent()
    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.appendChild(this._form)
  }
}

customElements.define("search-bar", SearchBar)
