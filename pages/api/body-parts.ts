import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const reports = await prisma.report.findMany({
        include: {
          userDetails: true,
        },
      });

      const bodyPartCounts: Record<string, number> = {};

      reports.forEach((report) => {
        const injuries = report.injuries as Record<string, string>;
        if (injuries) {
          for (const bodyPart in injuries) {
            if (injuries.hasOwnProperty(bodyPart)) {
              const bodyPartName = bodyPart;
              bodyPartCounts[bodyPartName] =
                (bodyPartCounts[bodyPartName] || 0) + 1;
            }
          }
        }
      });

      res.status(200).json(bodyPartCounts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
