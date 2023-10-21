import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { year } = req.query;

    try {
      const reports = await prisma.report.findMany({
        where: {
          dateOfReport: {
            gte: new Date(`${year}-01-01T00:00:00Z`),
            lt: new Date(`${year}-12-31T23:59:59Z`),
          },
        },
        include: {
          userDetails: true,
        },
      });
      const monthCounts = Array.from({ length: 12 }, () => 0);
      reports.forEach((report) => {
        const month = new Date(report.dateOfReport).getMonth();
        monthCounts[month]++;
      });
      res.status(200).json(monthCounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
