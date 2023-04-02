import { Membership } from "../../models/Membership.js";
import { User } from "../../models/User.js";
import membershipRepository, { MembershipRepository} from "../../repositories/MembershipRepository.js";
import paymentService, { PaymentService } from "../payment/PaymentService.js";



export class MembershipService {
    private membershipRepository: MembershipRepository
    private paymentService: PaymentService

    public MembershipService() {
        this.membershipRepository = membershipRepository
        this.paymentService = paymentService
    }

    async getAllMemberships(): Promise<Membership[]> {
        return this.membershipRepository.findAll();
    }

    async requestMembershipPayment(membershipCode: string, paymentProvider: string, user: User, currency: string): Promise<String> {
        return await paymentService.requestNewPaymentTransaction(membershipCode, paymentProvider, user, currency)
    }

}

export default new MembershipService()