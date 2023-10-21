import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    const reportId = parseInt(id as string, 10);

    const reportDetails = await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!reportDetails) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json({
      id: reportDetails.id,
      name: reportDetails.name,
      dateOfInjury: reportDetails.dateOfInjury,
      dateOfReport: reportDetails.dateOfReport,
      injuries: reportDetails.injuries,
    });
  } catch (error) {
    console.error("Error fetching report details:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
