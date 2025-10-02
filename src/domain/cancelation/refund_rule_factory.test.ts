import { RefundRuleFactory } from "./refund_rule_factory";


describe("Refund Rule Factory", () => {

	it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
		let daysUntilCheckIn = 10;
		let totalPrice = 400;

		const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
		let finalPrice = refundRule.calculateRefund(totalPrice);

		expect(refundRule.constructor.name).toBe("FullRefund");
		expect(finalPrice).toBe(0);
	});

	it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
		let daysUntilCheckIn = 5;
		let totalPrice = 400;

		const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
		let finalPrice = refundRule.calculateRefund(totalPrice);

		expect(refundRule.constructor.name).toBe("PartialRefund");
		expect(finalPrice).toBe(200);
	});

	it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
		let daysUntilCheckIn = 0;
		let totalPrice = 400;

		const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
		let finalPrice = refundRule.calculateRefund(totalPrice);

		expect(refundRule.constructor.name).toBe("NoRefund");
		expect(finalPrice).toBe(400);
	});
});
