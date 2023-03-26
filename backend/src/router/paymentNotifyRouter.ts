import cors from "cors";
import express from "express";
import { Request, Response } from "express";

export const paymentNotifyRouter = express.Router();

const allowedOrigins = [process.env.ALIPAY_API_HOST, process.env.WECHAT_API_HOST];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export async function paymentNotify(req: Request, res: Response): Promise<void> {
  try {
    const provider = req.params.provider;
    const paymentService = createPaymentService(provider);

    const payment = await paymentService.handlePaymentNotification(req.body);

    // Process the payment result here, e.g., update the transaction record and user membership

    res.status(200).send("Payment notification processed");
  } catch (error) {
    console.error("Failed to process payment notification:", error.message);
    res.status(500).send("Failed to process payment notification");
  }
}


paymentNotifyRouter.post("/:provider", cors(corsOptions), paymentNotify);