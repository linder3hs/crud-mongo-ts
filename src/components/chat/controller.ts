import type { Request, Response } from "express";
import prisma from "../../db";
import pusher from "../../services/pusher";

export async function list(req: Request, res: Response): Promise<Response> {
  try {
    const { transmiterId, receiverId } = req.params;

    const chats = await prisma.chat.findMany({
      where: {
        transmitterUserId: transmiterId,
        receiverUserId: receiverId,
      },
    });

    return res.json({
      ok: true,
      data: chats,
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

    return res.json({
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
