class SimpleAlert extends HTMLElement {
  _shadowRoot = null
  _style = null
  _message = "This is an alert!"
  _duration = 3000

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this._style = document.createElement("style")
  }

  set message(value) {
    this._message = value
    this.render()
  }

  set duration(value) {
    this._duration = value
  }

  _updateStyle() {
    this._style.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .alert {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #3f3f3f;
          color: white;
          padding: .5rem 1rem;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          font-family: Arial, sans-serif;
          font-size: .9rem;
          z-index: 1000;
          opacity: 1;
          transition: opacity 0.5s ease-out, bottom 0.5s ease-out;
        }
        .fade-out {
          opacity: 0;
          bottom: 40px;
        }
      `
  }

  connectedCallback() {
    this.render()
    this._showAlert()
  }

  _showAlert() {
    setTimeout(() => {
      this._shadowRoot.querySelector(".alert").classList.add("fade-out")
    }, this._duration - 500)

    setTimeout(() => {
      this.remove()
    }, this._duration)
  }

  render() {
    this._shadowRoot.innerHTML = ""
    this._updateStyle()
    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
        <div class="alert">${this._message}</div>
      `
  }
}

customElements.define("simple-alert", SimpleAlert)
