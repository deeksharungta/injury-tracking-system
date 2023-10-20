import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const reportId = parseInt(id as string, 10);

      const existingReport = await prisma.report.findUnique({
        where: { id: reportId },
      });

      if (!existingReport) {
        return res.status(404).json({ error: "Report not found" });
      }

      await prisma.report.delete({
        where: { id: reportId },
      });

      return res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
      console.error("Error deleting report:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
