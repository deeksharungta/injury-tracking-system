import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { identifier } = req.query;
  const { user } = req.body;
  if (identifier !== "you" && identifier !== "total") {
    return res.status(400).json({ error: "Invalid identifier" });
  }

  if (identifier === "you") {
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

      const reportCount = userWithReports.reports.length;
      res.status(200).json({ reportCount });
    } catch (error) {
      console.error("Error fetching user and reports:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (identifier === "total") {
    try {
      const reportCount = await prisma.report.count();
      res.status(200).json({ reportCount });
    } catch (error) {
      console.error("Error fetching report count:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
