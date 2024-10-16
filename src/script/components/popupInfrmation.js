class PopUpAlert extends HTMLElement {
  _shadowRoot = null
  _style = null
  _customAlert = null
  _type = "success"
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
  }

  get customAlert() {
    return this._customAlert
  }

  set customAlert(value) {
    this._customAlert = value
    if (this._shadowRoot) {
      this.setMessage(value)
    }
  }

  get type() {
    return this._type
  }

  set type(value) {
    this._type = value
    if (this._shadowRoot) {
      this.updateIcon()
    }
  }

  _emptyEContent() {
    this._shadowRoot.innerHTML = ""
  }

  _updateStyle() {
    this._style.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .popup-alert {
          width: 300px;
          text-align: center;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: fixed;
          top: -100%;
          left: 50%;
          transform: translateX(-50%);
          padding: 20px;
          transition: 0.3s all ease-in-out;
        }
        .popup-alert.show {
          top: 20%;
        }
        .popup-alert p {
          margin: 20px 0;
          font-size: 18px;
          color: #333;
        }
        .popup-alert button {
          border: none;
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .popup-alert button:hover {
          background-color: #555;
        }
        .wrapper {
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
        .checkmark, .cross {
          stroke-width: 8;
          stroke-miterlimit: 10;
          fill: none;
          width: 50px;
          height: 50px;
        }
        .checkmark {
          stroke: #4caf50;
          stroke-dashoffset: 745.74853515625;
          stroke-dasharray: 745.74853515625;
        }
        .cross {
          stroke: #f44336;
          stroke-dashoffset: 745.74853515625;
          stroke-dasharray: 745.74853515625;
          display: none;
        }
        .popup-alert.show .checkmark, .popup-alert.show .cross {
          animation: dash 2s .3s ease-out forwards 1;
        }
        @keyframes dash {
          0% {
            stroke-dashoffset: 745.74853515625;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `
  }

  _render() {
    this._emptyEContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
        <div class="popup-alert">
          <div class="wrapper">
            <svg
              class="icon"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 98.5 98.5"
              enable-background="new 0 0 98.5 98.5"
              xml:space="preserve"
            >
              <path
                class="checkmark"
                d="M81.7,17.8C73.5,9.3,62,4,49.2,4
                  C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
              />
              <path
                class="cross"
                d="M24,24L74,74M74,24L24,74"
              />
            </svg>
          </div>
          <p class="message">This is an alert!</p>
          <button>Close</button>
        </div>
      `

    this._shadowRoot
      .querySelector("button")
      .addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelector(".bg-cencel").classList.remove("show")
        event.target.closest(".popup-alert").classList.remove("show")
      })

    if (this._customAlert) {
      this.setMessage(this._customAlert)
    }

    this.updateIcon()
  }

  setMessage(message) {
    this._shadowRoot.querySelector(".message").textContent = message
  }

  updateIcon() {
    const checkmark = this._shadowRoot.querySelector(".checkmark")
    const cross = this._shadowRoot.querySelector(".cross")

    if (this._type === "success") {
      checkmark.style.display = "block"
      cross.style.display = "none"
    } else if (this._type === "error") {
      checkmark.style.display = "none"
      cross.style.display = "block"
    }
  }

  connectedCallback() {
    this._render()
  }
}

customElements.define("popup-alert", PopUpAlert)
