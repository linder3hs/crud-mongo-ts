import type { Request, Response } from "express";
import prisma from "../../db";
import pusher from "../../services/pusher";

export async function list(_req: Request, res: Response): Promise<Response> {
  try {
    const users = await prisma.user.findMany();

    return res.json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error,
    });
  }
}

export async function store(req: Request, res: Response): Promise<Response> {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    pusher.trigger("user-channels", "store-user", {
      user,
    });

    return res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error,
    });
  }
}
