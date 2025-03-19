"use client";

import { useState, useEffect } from "react";
import './globals.css';

// Definir la interfaz para los invitados
interface Invitado {
  id: number;
  nombre: string;
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, minutos: 0, segundos: 0 });

  // Fecha y hora del cumpleaños (AJUSTA ESTO)
  const cumpleFecha = new Date("2025-03-24T17:30:00"); // 20 de abril de 2025, 7:00 PM

  function calculateTimeLeft() {
    const difference = cumpleFecha.getTime() - new Date().getTime();
    if (difference <= 0) return { días: 0, horas: 0, minutos: 0, segundos: 0 };

    return {
      días: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / (1000 * 60)) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    fetch("api/invitados")
      .then((res) => res.json())
      .then((data) => setInvitados(data.data));

    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const res = await fetch("api/invitados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });

    if (res.ok) {
      const newInvitado = await res.json();
      setInvitados([newInvitado.data, ...invitados]); // Aquí ya no debería haber error
      setNombre("");
    }
  };

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-500 to-yellow-400 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-2">🎉 ¡Estás Invitado a Mi Cumpleaños 22! 🎂</h1>
      <p className="text-lg mb-6">Únete a la fiesta el <strong>24 de Marzo de 2025</strong> a las 5:30 PM, en mi Casa!</p>

      {/* Cuenta Regresiva */}
      <div className="flex gap-4 text-2xl font-bold bg-white text-pink-600 p-4 rounded-xl shadow-md">
        <span>{timeLeft.días}d</span> <span>{timeLeft.horas}h</span> <span>{timeLeft.minutos}m</span> <span>{timeLeft.segundos}s</span>
      </div>

      {/* Formulario de Registro */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 gap-3">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre"
          className="border p-2 rounded text-black w-64 text-center"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 px-6 py-2 rounded-xl text-lg font-semibold">
          Confirmar Asistencia
        </button>
      </form>

      {/* Lista de Invitados */}
      <h2 className="text-2xl font-semibold mt-8">🎈 Invitados Confirmados:</h2>
      <ul className="bg-white text-black p-4 rounded-lg w-64 text-center mt-2">
        {invitados.length > 0 ? (
          invitados.map((invitado: Invitado) => <li key={invitado.id}>{invitado.nombre}</li>)
        ) : (
          <p>Nadie se ha registrado aún 😢</p>
        )}
      </ul>
    </main>
  );
}
