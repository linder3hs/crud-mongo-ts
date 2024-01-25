import type { Request, Response } from "express";
import prisma from "../../db";
import pusher from "../../services/pusher";

export async function list(req: Request, res: Response): Promise<Response> {
  try {
    const { transmiterId, receiverId } = req.params;

    const chats1 = await prisma.chat.findMany({
      where: {
        transmitterUserId: transmiterId,
        receiverUserId: receiverId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const chats2 = await prisma.chat.findMany({
      where: {
        transmitterUserId: receiverId,
        receiverUserId: transmiterId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.json({
      ok: true,
      data: chats1.concat(chats2),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error,
    });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const chat = await prisma.chat.create({
      data: req.body,
    });

    pusher.trigger("chat-channels", "store-chat", {
      chat,
    });

    return res.status(201).json({
      ok: true,
      data: chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error,
    });
  }
}
