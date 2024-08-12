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

  // UseEffect for logging the API URL when the component mounts
  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, []);
  
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

  // Fetch the log when the component mounts
  useEffect(() => {
    fetchLog();
  }, []);

  return (
    <div>
      <h1>Notification System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Finance">Finance</option>
            <option value="Movies">Movies</option>
          </select>
        </div>
        <div>
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <button type="submit">Send Notification</button>
      </form>
      
      <h2>Notification Log</h2>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>
            [{entry.timestamp}] {entry.category} - {entry.message} via {entry.channel}
          </li>
        ))}
      </ul>
    </div>
  );
}
