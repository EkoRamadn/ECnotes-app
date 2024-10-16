class LoadingAnimation extends HTMLElement {
  _shadowRoot = null
  _style = null
  _loader = null

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })

    this._loader = document.createElement("div")
    this._loader.classList.add("loader")

    this._style = document.createElement("style")
    this._style.textContent = `
           
            .loader {
                position: relative;
                margin-inline: auto;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(0, 0, 255, 0.5);
                animation: pulse 1s infinite;
            }

            .loader::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                border: 2px solid rgba(0, 0, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: pulse-border 1s infinite;
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(0.8);
                }
                50% {
                    transform: scale(1);
                }
            }

            @keyframes pulse-border {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.3);
                    opacity: 0;
                }
            }
        `

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.appendChild(this._loader)
  }
}

customElements.define("loading-animation", LoadingAnimation)
