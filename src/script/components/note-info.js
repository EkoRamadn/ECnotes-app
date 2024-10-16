class NoteInfo extends HTMLElement {
  _shadowRoot = null
  _style = null
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
                font-family: 'Arial', sans-serif;
            }

            .head {
                font-size: 1rem;
                font-weight: 500;
                margin-bottom: 1.5rem;
                cursor: pointer;
                color: #007BFF;
                transition: color 0.3s;
            }

            .head:hover {
                color: #0056b3;
            }

            #note-info {
                padding: 1rem;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f9f9f9;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                animation: fadeIn 0.3s ease-in-out;
            }

            #note-info form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            #title,
            textarea,
            #date {
                color: #333;
                background-color: #fff;
                border: 1px solid #ddd;
                padding: 0.75rem;
                border-radius: 4px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }

            #title:focus,
            textarea:focus,
            #date:focus {
                border-color: #007BFF;
                outline: none;
            }

            textarea {
                resize: vertical;
                min-height: 150px;
            }

            .input-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            label {
                font-size: 1rem;
                color: #555;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                #note-info {
                    padding: 0.75rem;
                    height: 100%;
                }

                #title,
                textarea,
                #date {
                    font-size: 0.9rem;
                    padding: 0.5rem;
                }
            }

            @media (max-width: 480px) {
                .head {
                    font-size: 0.9rem;
                }

                #title,
                textarea,
                #date {
                    font-size: 0.8rem;
                    padding: 0.5rem;
                }
            }
        `
  }

  get note() {
    return this._note
  }

  set note(value) {
    this._note = value
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._emptyContent()
    this._updateStyle()

    this._shadowRoot.appendChild(this._style)
    this._shadowRoot.innerHTML += `
            <div id="note-info">
                <div class="head">
                    <h3 id="back">Back</h3>
                </div>
                <form action="">
                    <input
                        type="text"
                        disabled
                        name="title"
                        id="title"
                        placeholder="Title.."
                        value="${this.note.title || ""}"
                    />
                    <textarea
                        disabled
                        name="body"
                        id="body"
                        placeholder="About my note...">${this.note.body || ""}</textarea>
                    <div class="input-group">
                        <input
                            disabled
                            type="text"
                            name="date"
                            id="date"
                            value="${this.note.createdAt || ""}"
                        />
                    </div>
                    <div class="input-group">
                        <input
                            type="checkbox"
                            hidden
                            name="archive"
                            id="archive"
                            ${this.note.archived ? "checked" : ""}
                        />
                        <label for="archive">${this.note.archived ? "Archived" : "Not Archived"}</label>
                    </div>
                </form>
            </div>
        `

    this._shadowRoot.querySelector("#back").addEventListener("click", () => {
      document.querySelector("#note-info").classList.remove("show")
      document.querySelector(".bg-cencel").classList.remove("show")
    })
  }
}

customElements.define("note-info", NoteInfo)
