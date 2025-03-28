'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '../../ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../ui/select'

const appearanceSchema = z.object({
	theme: z.string()
})

export type Appearance = z.infer<typeof appearanceSchema>

export function AppearanceForm() {
	const { theme, setTheme } = useTheme()

	const form = useForm<Appearance>({
		resolver: zodResolver(appearanceSchema),
		defaultValues: {
			theme: theme || 'system'
		}
	})

	useEffect(() => {
		if (theme) {
			form.setValue('theme', theme)
		}
	}, [theme, form])

	const handleThemeChange = (value: string) => {
		setTheme(value)
	}

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex items-center gap-x-4'>
				<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
					<Monitor className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='mr-5 flex flex-1 flex-col'>
					<div className='mb-1 flex items-center gap-2'>
						<h2 className='font-semibold'>Тема</h2>
					</div>
					<p className='text-sm text-muted-foreground'>
						Выберите светлую или тёмную тему, или синхронизируйте с
						настройками ОС.
					</p>
				</div>
			</div>
			<div className='w-[150px]'>
				<Form {...form}>
					<form>
						<FormField
							control={form.control}
							name='theme'
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={value => {
											field.onChange(value)
											handleThemeChange(value)
										}}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Выберите тему' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='system'>
												Системная
											</SelectItem>
											<SelectItem value='light'>
												Светлая
											</SelectItem>
											<SelectItem value='dark'>
												Тёмная
											</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	)
}
