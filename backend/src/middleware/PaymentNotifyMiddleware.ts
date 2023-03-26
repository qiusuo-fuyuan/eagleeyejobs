import { Request, Response } from 'express';
import { PaymentService } from './PaymentService';
import { AlipayPaymentStrategy } from './AlipayPaymentStrategy';
import { AlipayNotifyRequest } from './AlipayTypes';

export function PaymentNotifyMiddleware(paymentService: PaymentService) {
  return async (req: Request, res: Response) => {
    // Validate the request
    const notifyRequest = req.body as AlipayNotifyRequest;
    const strategy = paymentService.getStrategy('alipay') as AlipayPaymentStrategy;
    const isValid = await strategy.validateNotifyRequest(notifyRequest);
    if (!isValid) {
      console.error('Invalid Alipay notification received:', notifyRequest);
      return res.status(400).send('Invalid request');
    }

    // Update the transaction status in the database
    const transactionId = notifyRequest.out_trade_no;
    const status = notifyRequest.trade_status;
    try {
      await paymentService.updateTransactionStatus('alipay', transactionId, status);
    } catch (error) {
      console.error('Error updating Alipay transaction:', error);
      return res.status(500).send('Error updating transaction');
    }

    // Send a success response to Alipay
    res.send('success');
  };
}
