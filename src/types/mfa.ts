export interface MfaStatus {
	totpMfa: boolean
	passkeyMfa: boolean
	recoveryActive: boolean
}

export interface TotpGenerateResponse {
	secret: string
	qrCodeUrl: string
}
