import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import type { User } from '@/src/types'

const displayNameSchema = z.object({
	name: z.string({ message: 'Имя обязательно' })
})

export type DisplayName = z.infer<typeof displayNameSchema>

interface DisplayNameFormProps {
	user: User | undefined
}

export function DisplayNameForm({ user }: DisplayNameFormProps) {
	const form = useForm<DisplayName>({
		resolver: zodResolver(displayNameSchema),
		values: {
			name: user?.displayName ?? ''
		}
	})

	async function onSubmit(data: DisplayName) {
		// await mutateAsync(data)
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ваше имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Elon Musk'
										// disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Измените ваше имя на любое, какое захотите.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}
