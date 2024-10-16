class AddNote extends HTMLElement {
  _shadowRoot = null
  _style = null
  _button = null

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
    this._button = document.createElement("div")

    this._button.innerHTML = `
        <div class="add-note" id="addNote">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      fill="#2f2f2f"
                      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                    />
                  </svg>
                </div>`

    this._style.textContent = `
              .add-note{
                width: 20px;
                cursor:pointer;
              }`

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.appendChild(this._button)

    this._button.addEventListener("click", () => {
      document.querySelector("#create-note").classList.add("show")
      document.querySelector(".bg-cencel").classList.add("show")
    })
  }
}

customElements.define("add-note", AddNote)
