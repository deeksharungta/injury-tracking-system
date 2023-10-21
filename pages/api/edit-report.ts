import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (req.method === "PUT") {
    try {
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid report ID" });
      }

      const { name, injuryDate, injuries } = req.body;
      const updatedReport = await prisma.report.update({
        where: {
          id: id,
        },
        data: {
          name,
          dateOfInjury: injuryDate,
          injuries,
        },
      });

      res.status(200).json(updatedReport);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error occurred while updating the report." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
