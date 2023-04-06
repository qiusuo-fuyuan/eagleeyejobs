export class QrCodeService {
    
    /**
     * Generate QR Code from transaction id
     * @param transactionId 
     */
    generateQrCode(transactionId: string): Promise<string> {
        return Promise.resolve("hello world");
    }
}

export default new QrCodeService()