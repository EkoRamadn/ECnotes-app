class HeaderBar extends HTMLElement {
  _shadowRoot = null
  _style = null

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
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
        font-family: sans-serif;
      }
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        font-size: 25px;
        cursor: pointer;
      }
      .logo span {
        color: #615EFC;
      }
      .button-action {
        display: flex;
        gap: 8px;
        width: 53px;
        height: 23px;
        overflow: hidden;
      }
      .add-note,
      .edit-note {
        width: 40px;
      }
    `
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `      
      <h1 class="logo">EC <span>Notes</span></h1>
      <div class="button-action">
        <add-note></add-note>
        <edit-note></edit-note>
      </div>
    `

    const logo = this._shadowRoot.querySelector(".logo")
    if (logo) {
      logo.addEventListener("click", () => {
        window.location.reload()
      })
    }
  }
}

customElements.define("header-bar", HeaderBar)
