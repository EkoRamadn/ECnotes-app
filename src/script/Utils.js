export default class Utils {
  static emptyElemnt(element) {
    element.innerHTML = " "
  }

  static showElement(element) {
    element.style.display = "block"
    element.hidden = false
  }

  static hideElement(element) {
    element.style.display = "none"
    element.hidden = true
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue)
  }

  static popUpInformation(promp, type) {
    const popup = document.querySelector("popup-alert")
    popup.customAlert = promp
    popup.type = type
    popup.shadowRoot.querySelector(".popup-alert").classList.add("show")
  }
}
