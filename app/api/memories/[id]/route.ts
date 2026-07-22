import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type UpdateMemoryRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: UpdateMemoryRouteProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body: unknown = await request.json();
    const { title, description, imageUrl } = body as {
      title?: unknown;
      description?: unknown;
      imageUrl?: unknown;
    };

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 },
      );
    }

    if (typeof imageUrl !== "string" || !imageUrl.trim()) {
      return NextResponse.json(
        { success: false, message: "An image is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const existingMemory = await prisma.memory.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingMemory) {
      return NextResponse.json(
        { success: false, message: "Memory not found" },
        { status: 404 },
      );
    }

    const memory = await prisma.memory.update({
      where: { id: existingMemory.id },
      data: {
        title: title.trim(),
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
        imageUrl: imageUrl.trim(),
      },
    });

    return NextResponse.json({ success: true, memory });
  } catch (error) {
    console.error("Update Memory Error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update memory" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: UpdateMemoryRouteProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const memory = await prisma.memory.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!memory) {
      return NextResponse.json(
        { success: false, message: "Memory not found" },
        { status: 404 },
      );
    }

    await prisma.memory.delete({
      where: { id: memory.id },
    });

    return NextResponse.json({ success: true, message: "Memory deleted" });
  } catch (error) {
    console.error("Delete Memory Error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete memory" },
      { status: 500 },
    );
  }
}
