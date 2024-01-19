import type { Request, Response } from "express";
import prisma from "../../db";

export async function store(req: Request, res: Response): Promise<Response> {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    return res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      error,
    });
  }
}
