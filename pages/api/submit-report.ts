import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, dateOfInjury, injuries } = req.body;

    try {
      const newProject = await prisma.report.create({
        data: {
          name,
          dateOfInjury,
          injuries,
          userId: 123,
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