'use client'

import { useEffect, useState } from "react"
import axios from "axios"

const formatDate = (isoDate: string) => {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default function Home() {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    dateOfJoining: "",
    isActive: false,
  })

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/allEmployees")
      setEmployees(res.data)
    } catch (error) {
      console.error("Error fetching employees:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      
      await axios.post("http://localhost:8080/employees", formData)
      setFormData({ name: "", dateOfJoining: "", isActive: false })
      fetchEmployees()
    } catch (error) {
      console.error("Error adding employee:", error)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center drop-shadow-sm">
          Employee Manager
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
            <input
              type="date"
              value={formData.dateOfJoining}
              onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">Currently Active</label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-all shadow-md"
          >
            Add Employee
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">All Employees</h2>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-900 text-left text-sm">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Date of Joining</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t border-gray-100 hover:bg-indigo-50">
                <td className="py-3 px-4 text-black">{emp.id}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{emp.name}</td>
                <td className="py-3 px-4 text-gray-600">{formatDate(emp.dateOfJoining)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                      emp.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
