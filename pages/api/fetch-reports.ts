import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;

  const userDetails = await prisma.userDetails.findUnique({
    where: { email: user.email },
  });

  if (userDetails === null) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const userWithReports = await prisma.userDetails.findUnique({
      where: { email: userDetails.email },
      include: { reports: true },
    });

    if (!userWithReports) {
      return res.status(404).json({ error: "No reports found" });
    }

    res.status(200).json({ reports: userWithReports.reports });
  } catch (error) {
    console.error("Error fetching user and reports:", error);
  } finally {
    await prisma.$disconnect();
  }
}
