import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

export function useFingerprint() {
	const { isLoading, error, data, getData } = useVisitorData(
		{
			extendedResult: true
		},
		{ immediate: true }
	)

	return {
		isLoading,
		error,
		data,
		refresh: () => getData({ ignoreCache: true })
	}
}
