"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface LogEntry {
  timestamp: string;
  category: string;
  message: string;
  channel: string;
}

export default function Home() {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<LogEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return alert('Message cannot be empty');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, { category, message });
      alert('Notification sent successfully');
      fetchLog();
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  const fetchLog = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/logs`);
      setLog(response.data);
    } catch (error) {
      console.error('Error fetching log:', error);
    }
  };

  useEffect(() => {
    fetchLog();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Notification System</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Finance">Finance</option>
            <option value="Movies">Movies</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Send Notification
        </button>
      </form>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Notification Log</h2>
      <ul className="bg-white p-4 rounded-lg shadow-md">
        {log.map((entry, index) => (
          <li key={index} className="mb-2 border-b last:border-b-0 pb-2">
            <span className="text-sm text-gray-600">
              [{new Date(entry.timestamp).toLocaleString()}]
            </span> 
            <span className="font-semibold"> {entry.category}</span> - 
            <span> {entry.message}</span> 
            <span className="text-gray-500"> via {entry.channel}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
