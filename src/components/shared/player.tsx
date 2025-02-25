'use client'

import KinescopePlayer, {
	PlayerPropsTypes
} from '@kinescope/react-kinescope-player'
import type { RefObject } from 'react'

interface PlayerProps extends PlayerPropsTypes {
	forwardRef?: RefObject<KinescopePlayer | null>
}

export function Player({ forwardRef, ...props }: PlayerProps) {
	return <KinescopePlayer ref={forwardRef} {...props} />
}

export { KinescopePlayer }
