import { Membership } from "../../models/Membership.js";
import { User } from "../../models/User.js";
import membershipRepository, { MembershipRepository} from "../../repositories/MembershipRepository.js";
import paymentService, { PaymentService } from "../payment/PaymentService.js";
import qrCodeService, { QrCodeService } from "../qrcode/QrCodeService.js" 


export class MembershipService {
    private membershipRepository: MembershipRepository
    private paymentService: PaymentService
    private qrCodeService: QrCodeService

    public MembershipService() {
        this.membershipRepository = membershipRepository
        this.paymentService = paymentService
        this.qrCodeService = qrCodeService
    }

    async getAllMemberships(): Promise<Membership[]> {
        return this.membershipRepository.findAll();
    }

    async requestMembershipPaymentQrCode(membershipCode: string, paymentProvider: string, user: User, currency: string): Promise<String> {
              // Fetch membership from the database
        const membership = await this.membershipRepository.findById(membershipCode);

        if (!membership) {
            throw new Error('Membership not found');
        }
        const transactionId = await paymentService.requestPaymentTransaction(paymentProvider, user, membership, currency)
        return qrCodeService.generateQrCode(transactionId)
    }

}

export default new MembershipService()