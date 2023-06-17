/* eslint-disable import/no-anonymous-default-export */
// pages/api/render.ts
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { renderImage } from "@/control/render";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await NextCors(req, res, {
		// Options
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});

	const { address } = req.body;

	if (!address) {
		return res.status(400).json({ message: "address is required." });
	}

	try {
		const imageUrl = await renderImage(address);
		return res.status(200).json({ imageUrl });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error rendering image." });
	}
};
