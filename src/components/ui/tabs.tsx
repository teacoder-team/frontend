import * as TabsPrimitives from '@radix-ui/react-tabs'
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	createContext,
	forwardRef,
	useContext
} from 'react'

import { cn, focusRing } from '@/src/lib/utils'

const Tabs = (
	props: Omit<
		ComponentPropsWithoutRef<typeof TabsPrimitives.Root>,
		'orientation'
	>
) => {
	return <TabsPrimitives.Root tremor-id='tremor-raw' {...props} />
}

Tabs.displayName = 'Tabs'

type TabsListVariant = 'line' | 'solid'

const TabsListVariantContext = createContext<TabsListVariant>('line')

interface TabsListProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitives.List> {
	variant?: TabsListVariant
}

const variantStyles: Record<TabsListVariant, string> = {
	line: cn('flex items-center justify-start border-b, border-gray-200'),
	solid: cn(
		'inline-flex items-center justify-center rounded-md p-1 bg-gray-100'
	)
}

const TabsList = forwardRef<
	ComponentRef<typeof TabsPrimitives.List>,
	TabsListProps
>(({ className, variant = 'line', children, ...props }, forwardedRef) => (
	<TabsPrimitives.List
		ref={forwardedRef}
		className={cn(variantStyles[variant], className)}
		{...props}
	>
		<TabsListVariantContext.Provider value={variant}>
			{children}
		</TabsListVariantContext.Provider>
	</TabsPrimitives.List>
))

TabsList.displayName = 'TabsList'

function getVariantStyles(tabVariant: TabsListVariant) {
	switch (tabVariant) {
		case 'line':
			return '-mb-px items-center justify-center whitespace-nowrap border-b-2 border-muted-foreground px-3 pb-2 text-sm font-medium transition-all text-muted-foreground hover:text-muted-foreground/80 hover:border-muted-foreground/80 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[disabled]:pointer-events-none data-[disabled]:text-gray-300'
		case 'solid':
			return 'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium ring-1 ring-inset transition-all text-muted-foreground hover:text-gray-700 ring-transparent data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[disabled]:opacity-50'
	}
}

const TabsTrigger = forwardRef<
	ComponentRef<typeof TabsPrimitives.Trigger>,
	ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => {
	const variant = useContext(TabsListVariantContext)
	return (
		<TabsPrimitives.Trigger
			ref={forwardedRef}
			className={cn(getVariantStyles(variant), focusRing, className)}
			{...props}
		>
			{children}
		</TabsPrimitives.Trigger>
	)
})

TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = forwardRef<
	ComponentRef<typeof TabsPrimitives.Content>,
	ComponentPropsWithoutRef<typeof TabsPrimitives.Content>
>(({ className, ...props }, forwardedRef) => (
	<TabsPrimitives.Content
		ref={forwardedRef}
		className={cn('outline-none', focusRing, className)}
		{...props}
	/>
))

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsContent, TabsList, TabsTrigger }
