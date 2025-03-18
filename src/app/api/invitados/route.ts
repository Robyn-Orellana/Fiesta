import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nombre } = await req.json();
    if (!nombre) {
      return NextResponse.json({ success: false, error: "Nombre requerido" }, { status: 400 });
    }

    const nuevoInvitado = await prisma.invitado.create({
      data: { nombre },
    });

    return NextResponse.json({ success: true, data: nuevoInvitado });
  } catch (error: unknown) {
    // Verificar si el error es una instancia de Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      // Si no es una instancia de Error, devolver un mensaje genérico
      return NextResponse.json({ success: false, error: "Error desconocido" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const invitados = await prisma.invitado.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: invitados });
  } catch (error: unknown) {
    // Verificar si el error es una instancia de Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      // Si no es una instancia de Error, devolver un mensaje genérico
      return NextResponse.json({ success: false, error: "Error desconocido" }, { status: 500 });
    }
  }
}
