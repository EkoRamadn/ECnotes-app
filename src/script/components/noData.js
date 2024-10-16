class NoDataComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 20%;
                }
                img {
                    width: 100%;
                }
            </style>
            <div class="not-a-data">
                <div class="container">
                    <img src="./nodata.png" alt="No Data">
                </div>
            </div>
        `
  }
}

customElements.define("no-data-component", NoDataComponent)
