const BASE_URL = "https://notes-api.dicoding.dev/v2"
class UseApi {
  static async getAllNote() {
    try {
      const notArchive = await fetch(`${BASE_URL}/notes`)
      const isArchive = await fetch(`${BASE_URL}//notes/archived`)
      const notArchiveJson = await notArchive.json()
      const isArchiveJson = await isArchive.json()

      if (notArchiveJson.error || isArchiveJson.error) {
        console.log(notArchiveJson.message || isArchiveJson.message)
      } else {
        const archiveNote = isArchiveJson.data
        const notArchiveNote = notArchiveJson.data
        const data = [...archiveNote, ...notArchiveNote]
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async createNotes(note) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }

      const response = await fetch(`${BASE_URL}/notes`, options)
      const responseJson = await response.json()
      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const responseJson = await response.json()
      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }

  static async archiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: "POST",
      })
      const responseJson = await response.json()

      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }

  static async getSingleNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`)

      const responseJson = await response.json()

      return responseJson.data
    } catch (error) {
      console.log(error)
    }
  }

  static async unArchiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: "POST",
      })
      const responseJson = await response.json()
      console.log(responseJson)
    } catch (error) {
      console.log(error)
    }
  }
}

export default UseApi
