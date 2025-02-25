import { AuthWrapper } from './auth-wrapper'

export function ResetPasswordForm() {
	return (
		<AuthWrapper
			heading='Сброс пароля'
			description='Lorem ipsum dolor sit amet consectetur adipisicing elit'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
		>
			Reset password
		</AuthWrapper>
	)
}
