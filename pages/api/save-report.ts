import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user } = req.body;

    const userDetails = await prisma.userDetails.findUnique({
      where: { email: user.email },
    });

    if (userDetails === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userDetails.id;
    const { name, injuryDate, injuries } = req.body;

    try {
      const newProject = await prisma.report.create({
        data: {
          name,
          dateOfInjury: injuryDate,
          injuries,
          userId: userId,
        },
      });
      res.status(201).json({ success: true, data: newProject });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
