export interface MfaStatus {
	totpMfa: boolean
	passkeyMfa: boolean
	recoveryActive: boolean
}

export interface GenerateTotpResponse {
	secret: string
	qrCodeUrl: string
}
