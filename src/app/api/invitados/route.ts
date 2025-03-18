import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { nombre } = await req.json();
    if (!nombre) {
      return NextResponse.json({ success: false, error: "Nombre requerido" }, { status: 400 });
    }

    // Crear el nuevo invitado en la base de datos
    const nuevoInvitado = await prisma.invitado.create({
      data: { nombre },
    });

    // Respuesta exitosa
    return NextResponse.json({ success: true, data: nuevoInvitado });
  } catch (error: unknown) {
    // Verificar si el error es una instancia de Error y manejarlo adecuadamente
    if (error instanceof Error) {
      console.error("Error en la creación del invitado:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error("Error desconocido:", error);
      return NextResponse.json({ success: false, error: "Error desconocido" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    // Obtener todos los invitados desde la base de datos
    const invitados = await prisma.invitado.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Verificar si hay datos y devolverlos
    if (!invitados || invitados.length === 0) {
      return NextResponse.json({ success: false, error: "No hay invitados registrados" }, { status: 404 });
    }

    // Respuesta exitosa con los invitados
    return NextResponse.json({ success: true, data: invitados });
  } catch (error: unknown) {
    // Verificar si el error es una instancia de Error
    if (error instanceof Error) {
      console.error("Error al obtener los invitados:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error("Error desconocido:", error);
      return NextResponse.json({ success: false, error: "Error desconocido" }, { status: 500 });
    }
  }
}
