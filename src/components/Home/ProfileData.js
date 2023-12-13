import React, { useState, useContext } from "react"
import MyContext from "../Context/MyContext"
const ProfileData = () => {
  const context = useContext(MyContext)
  const [fullName, setFullName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  const handleUpdate = async () => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw`

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: context.idToken,
          displayName: fullName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Profile updated successfully:", data)

      // Reload the user to get the updated profile data
    } catch (error) {
      console.error("Error updating profile:", error.message)
    }
  }

  const handleCancel = () => {
    console.log("Update canceled")
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

      <div className="mb-4">
        <label
          htmlFor="fullName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Full Name:
        </label>
        <input
          type="text"
          required
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="photoUrl"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Profile Photo URL:
        </label>
        <input
          type="text"
          id="photoUrl"
          required
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProfileData
