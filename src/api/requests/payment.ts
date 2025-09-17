import { instance } from '../instance'

export const initPayment = async (data: { method: string }) =>
	await instance.post('/payment/init', data).then(res => res.data)
