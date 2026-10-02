import {
	type PublicKeyCredentialCreationOptionsJSON,
	type PublicKeyCredentialRequestOptionsJSON,
	startAuthentication,
	startRegistration
} from '@simplewebauthn/browser'

import type {
	WebAuthnLoginPayloadResponse,
	WebAuthnOptionsResponse,
	WebAuthnRegisterPayloadResponse
} from '@/generated/model'

// The API documents its options only as "an object" - they are the JSON
// produced by @simplewebauthn/server and go to the browser untouched.

export async function authenticateWithKey(
	options: WebAuthnOptionsResponse
): Promise<WebAuthnLoginPayloadResponse> {
	const response = await startAuthentication({
		optionsJSON: options as unknown as PublicKeyCredentialRequestOptionsJSON
	})

	return {
		...response,
		response: { ...response.response },
		clientExtensionResults: { ...response.clientExtensionResults }
	}
}

export async function registerKey(
	options: WebAuthnOptionsResponse
): Promise<WebAuthnRegisterPayloadResponse> {
	const response = await startRegistration({
		optionsJSON:
			options as unknown as PublicKeyCredentialCreationOptionsJSON
	})

	return {
		...response,
		response: { ...response.response },
		clientExtensionResults: { ...response.clientExtensionResults }
	}
}

/** The user closed the browser prompt - not an error worth a toast. */
export function isWebAuthnCancelled(error: unknown) {
	return (
		error instanceof Error &&
		(error.name === 'NotAllowedError' || error.name === 'AbortError')
	)
}
