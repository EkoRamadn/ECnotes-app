class InformationComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Arial', sans-serif;
                }
                .information-container {
                    position: fixed;
                    top: 20%;
                    left: 10%;
                    transform: translateX(-50%);
                    width: 300px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    padding: 1.5rem;
                    text-align: center;
                    border: 1px solid rgba(0,0,0,0.1);
                    display: none;
                    z-index: 1000;
                }
                .information-container img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 1rem;
                }
                .information-container p {
                    font-size: 1rem;
                    color: #333333;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                .information-container button {
                    padding: 0.7rem 1.5rem;
                    border-radius: 5px;
                    border: none;
                    background-color: #007bff;
                    color: #ffffff;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }
                .information-container button:hover {
                    background-color: #0056b3;
                    transform: scale(1.05);
                }
                @media only screen and (min-width: 708px) {
                     .information-container {
                        left: 30%;
                        width: 400px
                    }
                }
            </style>
            <div class="information-container">
                <div class="ilust">
                    <img src="./ilustrasion1.png" alt="Illustration">
                </div>
                <div>
                    <p>
                        Buat catatan untuk pengingat kegiatan harimu tanpa harus mengunduh aplikasi yang menguras penyimpanan smartphone. Bisa kok, gunakan saja EC Notes. Tampilan yang rapi dan segar menambah kesan baik pada catatanmu. 
                    </p>
                </div>
                <button class="close-button">Ok</button>
            </div>
        `
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.hide()
      })
  }

  show() {
    const container = this.shadowRoot.querySelector(".information-container")
    container.style.display = "block"
    container.animate(
      [
        { opacity: 0, transform: "scale(0.9)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      {
        duration: 300,
        fill: "forwards",
      },
    )
  }

  hide() {
    const container = this.shadowRoot.querySelector(".information-container")
    container.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.9)" },
      ],
      {
        duration: 300,
        fill: "forwards",
      },
    ).onfinish = () => {
      container.style.display = "none"
    }

    sessionStorage.setItem("active", true)
  }
}

customElements.define("information-component", InformationComponent)
