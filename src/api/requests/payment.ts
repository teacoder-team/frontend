import type { InitPaymentResponse, PaymentMethodResponse } from '../generated'
import { api, instance } from '../instance'

export const getPaymentMethods = async () =>
	await api
		.get<PaymentMethodResponse[]>('/payment/methods')
		.then(res => res.data)

export const initPayment = async (data: { method: string }) =>
	await instance
		.post<InitPaymentResponse>('/payment/init', data)
		.then(res => res.data)
