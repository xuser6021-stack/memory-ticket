import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncUser } from "@/lib/sync-user";
type ShareMemoryRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: ShareMemoryRouteProps) {
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
    const isPublic =
      typeof body === "object" && body !== null && "isPublic" in body
        ? body.isPublic
        : undefined;

    if (typeof isPublic !== "boolean") {
      return NextResponse.json(
        { success: false, message: "isPublic must be a boolean" },
        { status: 400 },
      );
    }

    const user = await syncUser();

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

    const updatedMemory = await prisma.memory.update({
      where: { id: memory.id },
      data: { isPublic },
    });

    return NextResponse.json({ success: true, memory: updatedMemory });
  } catch (error) {
    console.error("Update Memory Sharing Error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update sharing settings" },
      { status: 500 },
    );
  }
}
