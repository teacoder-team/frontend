# Миграция фронтенда TeaCoder на новый API — фаза 1 (анализ)

Ветка: `rewrite` в `C:\Dev\teacoder\new-web` (клон `frontend@dev`, коммит `b5e4a2f`). Кода нового приложения ещё нет.

Источники: весь `frontend/src` (≈6 000 строк без `generated` и юр. текстов), `elysia-backend/AGENTS.md`, все `modules/*/{index,model}.ts`, выборочно `service.ts`. Локальный бэкенд не запущен, поэтому спека получена без запуска сервера: `createApp().handle(new Request('/spec.json'))` (OpenAPI 3.0.3, 47 операций, 56 схем) — совпадает с кодом.

---

## 1. Инвентарь экранов

| URL | Компоненты | Данные (старое API) | Состояния / toasts |
|---|---|---|---|
| `/` | `Hero`, `Features`, `Popular`, `TelegramCTA` | RSC: `/courses/popular` | — |
| `/courses` | `CourseCard` | RSC: `/courses` | — |
| `/courses/[slug]` | `CourseDetails` → `CourseContent`, `CourseLessons`, `CourseSidebar`, `CourseActions` | RSC: `/courses/:slug`, `/courses/:id/lessons`; клиент: `/lessons/:courseId/progress`, `PATCH /courses/:id/views`, `/auth/account` | скелетон страницы, пока грузится юзер/прогресс; «Не удалось сгенерировать ссылку» |
| `/lesson/[id]` | `LessonSidebar`, `LessonContainer`, `LessonPlayer`, `LessonCompleteButton` | RSC c cookie `token`: `/lessons/:id`, `/courses/:id/lessons`, `/progress/:courseId`, `/lessons/:courseId/progress` | «Загрузка видео…», «Загрузка...» на кнопке; «Ошибка при обновлении прогресса» |
| `/premium` | `Premium`, `PaymentMethods`, `FAQSection` | `/auth/account`, `/payment/methods`, `POST /payment/init` | скелетоны способов; ошибки 409/400 в полях формы |
| `/payment/success` | `PaymentSuccess` | — | конфетти |
| `/about`, `/document/*` | статика | — | — |
| `/auth/login` | `LoginForm` → `MfaForm` (выбор способа / TOTP / ключ / резервный код), `AuthSocial` | `/auth/session/login`, `/auth/mfa/verify`, `/auth/passkey/login/options`, `/auth/sso/available`, `/auth/sso/login/:p` | «Пройдите капчу!», «Ошибка при входе», «Ошибка при создании URL», скелетоны кнопок соцсетей |
| `/auth/register` | `RegisterForm`, `AuthSocial` | `/auth/account/create` | «Пройдите капчу!», «Ошибка при регистрации» |
| `/auth/recovery` | `ResetPasswordForm` | `POST /auth/account/reset_password` | «Письмо с инструкциями отправлено на вашу почту», «Ошибка при сбросе пароля» |
| `/auth/recovery/[token]` | `NewPasswordForm` | `PATCH /auth/account/reset_password` | «Ошибка при сбросе пароля» → `/auth/login` |
| `/auth/verify/[token]` | `VerifyEmail` | `/auth/account/verify/:code` | «Ошибка при верификации» |
| `/auth/callback` | — | токен из `#token=` | `EllipsisLoader` |
| `/auth/telegram-oauth-finish` | — | `/auth/sso/callback/telegram` | `EllipsisLoader` |
| `/account` | `Progress` (Обзор / Курсы / Рейтинг): `UserStats`, `CoursesList`, `CoursesTab`, `Leaderboard` | `/users/@me/statistics`, `/users/@me/progress`, `/users/leaders` | — |
| `/account/settings` | `ProfileForm` (аватар, имя), `AccountForm` (почта, пароль), `TwoStepAuthForm` (TOTP, ключи, резервные коды), `Subscription` (автосписание), `Preferences` (тема), `AccountActions` (выход) | `/auth/account`, `/auth/mfa`, `/users/@me/*`, `/auth/mfa/*`, `/auth/passkey/*`, `/auth/session/logout` | «Аватар успешно обновлён», «Профиль обновлён», «Ссылка c подтверждением…», «Автосписания включены/отключены», спиннеры `Loader2` в модалках, ошибки |
| `/account/sessions` | `Sessions`, `SessionItem`, `RevokeSession`, `RemoveAllSessions` | `/auth/session/all`, `DELETE …` | `Loader2` на всю высоту; текущая = `index === 0` |
| `/account/connections` | `Connections`, `UnlinkProvider`, `ConnectionError` (по `?error=`) | `/auth/sso/available`, `/auth/sso`, `/auth/sso/connect/:p`, Telegram-виджет через `#tgAuthResult` | 4 скелетона карточек, модалка ошибки |
| глобально | `Header`/`MobileNav`/`UserMenu`, `Footer`, `BanChecker`, `AccountProvider` (лоадер, пока грузится юзер и статус MFA) | `/auth/account`, `/restriction` | «Ошибка при выходе» |

`proxy.ts` (старый): `/auth/*` → `/account`, если есть cookie `token`; `/account/*`, `/lesson/*` → `/auth/login` **без** `redirectTo`, если нет; `/auth/verify/*` — только для вошедших.

---

## 2. Старый вызов → новый вызов

Все запросы идут через сгенерированный orval-клиент. Ошибки: `{ status, messages: string[] }` (англ.) вместо `{ message }`.

### Авторизация
| Старое | Новое | Что поменялось |
|---|---|---|
| `POST /auth/session/login {email,password,captcha,visitorId,requestId}` → `{token}` \| `{ticket,allowedMethods,userId}` | `POST /auth/login {email,password,captchaToken}` + `X-Fingerprint-Event` → `SignInResponse` | поле `captcha`→`captchaToken`; `token`→`accessToken` (в память) + cookie `tc_refresh`; `ticket`→`mfaToken`; методы `totp/passkey/recovery` → `TOTP/WEBAUTHN/RECOVERY_CODE`; новое `linkedProvider` |
| `POST /auth/mfa/verify {ticket,totpCode\|recoveryCode}` | `POST /auth/mfa/challenge {mfaToken,method}` → `{challengeId}`; `POST /auth/mfa/confirm {mfaToken,challengeId,code}` → `AuthResponse` | два шага: challenge — при выборе способа, confirm — по кнопке |
| `/auth/passkey/login/options {userId}` + `/auth/mfa/verify {ticket,attestationResponse}` | `POST /auth/webauthn/login/options {mfaToken}` → `startAuthentication({optionsJSON})` → `POST /auth/webauthn/login/verify {response,mfaToken}` | `userId` больше не нужен; ответ — `AuthResponse` |
| — | `POST /auth/webauthn/login/options` (без тела) → `…/login/verify {response}` | новая кнопка «Вход по ключу доступа» |
| `POST /auth/account/create` → `{token}` | `POST /auth/register {name,email,password,captchaToken}` → письмо; `POST /auth/verify {email,code}` → `AuthResponse` | вход только после кода; `name` на бэке ≥ 2 символов |
| `POST /auth/account/reset_password {email,captcha}` → письмо со ссылкой | `POST /auth/forgot-password {email,captchaToken}` → письмо с кодом | |
| `PATCH /auth/account/reset_password {token,password}` | `POST /auth/reset-password {email,code,newPassword}` → `SignInResponse` | после сброса — сразу вход (или MFA), а не переход на форму входа |
| `POST /auth/sso/login/:p {visitorId,requestId}` → `{url}`, возврат на `/auth/callback#token=` | `POST /auth/sso/:p/start` + `X-Fingerprint-Event` → `{url}`; возврат — `GET /auth/sso/:p/callback?…` → `OAuthCallbackResponse` (`intent`) | см. пробел №2 |
| `GET /auth/sso/available` → `string[]` | `GET /` → `features.auth.providers` | |
| `GET /auth/sso` → `{github: bool,…}` | `GET /auth/sso/accounts` → `{accounts:[{provider,slug,linked,linkedAt}],canUnlink}` | |
| `POST /auth/sso/connect/:p`; Telegram: `/auth/sso/telegram/connect-callback`, `/auth/sso/callback/telegram` | `POST /auth/sso/:p/link` → `{url}` (Telegram — обычный OIDC) | виджет Telegram и разбор `#tgAuthResult` удаляются |
| `DELETE /auth/sso/:p` | `DELETE /auth/sso/accounts/:p` | 400, если это единственный способ входа |
| `POST /auth/session/logout` | `POST /auth/logout` | + чистка кэша Query, маркер-cookie, уведомление вкладок |
| — | `POST /auth/refresh` (без тела, cookie) → `{accessToken}` | при старте и на 401 |

### Профиль, сессии, 2FA
| Старое | Новое | Что поменялось |
|---|---|---|
| `GET /auth/account` → `{id,displayName,email,avatar,isEmailVerified,isAutoBilling,isPremium}` | `GET /users/@me` → `{id,username,displayName,avatar,email,role,status,points,emailVerifiedAt,createdAt}` | `isEmailVerified` → `emailVerifiedAt !== null`; `avatar` — полный URL или `null`; нет `isPremium`, `isAutoBilling` |
| `PATCH /users/@me/avatar` (multipart) → `{file_id}` | `POST /users/@me/avatar` (поле `file`, ≤ 5 МБ) → `{avatar}` | лимит 5 МБ (в UI написано 10) |
| `PATCH /users/@me {displayName}` | — | пробел №4 |
| `PATCH /auth/account/change/email {email}` | `POST /users/@me/email/change {newEmail}` → код; `POST /users/@me/email/confirm {code}` → `{email}` | + шаг с кодом |
| `POST /auth/account/verify` (повторная отправка подтверждения) | — | не нужен: почта в аккаунте всегда подтверждена (регистрация/смена — по коду, OAuth — только подтверждённая) |
| `PATCH /auth/account/change/password {newPassword,confirmPassword}` | `POST /users/@me/password/change {currentPassword,newPassword}` → код; `POST /users/@me/password/confirm {code}` → `{accessToken}` | + текущий пароль, + шаг с кодом, новый access-токен |
| `GET /auth/session/all` → `[{id,createdAt,country,city,browser,os}]` | `GET /sessions` → `[{id,ip,friendlyName,country,city,current,lastSeenAt,createdAt}]` | текущая — по `current` (не `index === 0`); `browser/os` → `friendlyName` («Chrome, Windows»); `country/city` — nullable |
| `DELETE /auth/session/:id` | `DELETE /sessions/:id` | текущую нельзя (400) |
| `DELETE /auth/session/all` | `DELETE /sessions` → `{revoked}` | все, кроме текущей |
| `GET /auth/mfa` → `{totpMfa,passkeyMfa,recoveryActive}` | `GET /auth/webauthn/credentials` + `GET /mfa/recovery-codes` | нет статуса TOTP — пробел №3 |
| `POST /auth/mfa/totp` → `{qrCodeUrl,secret}` | `POST /mfa/totp/setup` → `{secret,otpauthUrl,qrCodeUrl}` | |
| `PUT /auth/mfa/totp {pin,secret}` + `GET /auth/mfa/recovery` | `POST /mfa/totp/verify {code}` → `{codes}` | коды приходят в ответе |
| `DELETE /auth/mfa/totp {password}` | `POST /mfa/totp/disable {code}` | пароль → код приложения или резервный |
| `GET /auth/mfa/recovery` → `string[]` | `GET /mfa/recovery-codes` → `{total,remaining,generatedAt}` | сами коды повторно не показываются |
| `PATCH /auth/mfa/recovery` | `POST /mfa/recovery-codes {code}` → `{codes}` | требует код |
| `GET /auth/passkey` → `[{id,deviceName,lastUsedAt,createdAt}]` | `GET /auth/webauthn/credentials` → `[{id,name,deviceType,backedUp,transports,lastUsedAt,createdAt}]` | `deviceName` → `name`; `lastUsedAt` nullable |
| `/auth/passkey/register/options` + `/verify {deviceName,attestationResponse}` | `POST /auth/webauthn/register/options` → `startRegistration({optionsJSON})` → `POST …/register/verify {response,name}` → `{credential,recoveryCodes\|null}` | API v13 браузерной либы; коды — показать |
| `DELETE /auth/passkey/:id` | `DELETE /auth/webauthn/credentials/:id` | |
| `PATCH /users/@me/billing` | — (есть только `DELETE /billing/cancel`) | пробел №5 |
| `GET /restriction` | — | пробел №8 |

### Курсы, уроки, прогресс, оплата
| Старое | Новое | Что поменялось |
|---|---|---|
| `GET /courses` | `GET /courses` | то же (`thumbnail` — полный URL) |
| `GET /courses/popular` | — | пробел №6 |
| `GET /courses/:slug` | `GET /courses/:slug` | + `price`; нет `createdAt`; **сам считает просмотр** (по IP, раз в 30 мин) |
| `PATCH /courses/:id/views` | — (встроено в `GET /courses/:slug`) | `CourseProvider` не нужен |
| `GET /courses/:id/lessons` → `LessonResponse[]` | `GET /courses/:slug/lessons` → `[{id,title,slug,position,access}]` | по **slug**; нет `description` у урока — пробел №13 |
| `GET /lessons/:id` → `{…, course: CourseResponse, courseId}` | `GET /lessons/:id` → `{id,title,slug,description\|null,position,access,kinescopeId\|null,courseId}` | нет вложенного `course` (нужен title/slug для сайдбара) — пробел №12; премиум-урок → 403 |
| `GET /progress/:courseId` → `number` + `GET /lessons/:courseId/progress` → `string[]` | `GET /progress/:courseId` → `{totalLessons,completedLessons,percentage,completedLessonIds}` | один запрос вместо двух |
| `PUT /progress {lessonId,isCompleted}` → `{nextLesson,isCompleted}` | `PUT /progress` → `{isCompleted,nextLessonId}` | `nextLesson` → `nextLessonId` (nullable) |
| `POST /courses/:id/download-link` | — | пробел №6 |
| `GET /payment/methods` → `[{id,name,description,isAvailable}]` | `GET /` → `features.payments` `[{id,name,description}]` (только доступные) | нет недоступных → блок «Скоро» пустеет; id: `CRYPTO` → `CRYPTO_BOT`/`HELEKET`, + `YOOMONEY` |
| `POST /payment/init {method,email}` | `POST /billing/create {method,email}` (+ `Idempotency-Key`) | **не подключаем** до подтверждения (1.3) |
| `/users/@me/statistics`, `/users/@me/progress`, `/users/leaders` | — | пробел №7 |

---

## 3. Экраны с вынужденными изменениями (только раздел 1.2)

1. **MFA после соцсети.** Новая страница `/auth/callback/[provider]` при `intent: SIGN_IN` + `mfaRequired` рендерит тот же `MfaForm` («Назад к входу» → `/auth/login`).
2. **«Вход по ключу доступа».** Раскомментировать `<PasskeyLoginButton />` в `auth-social.tsx`, реализовать: options без тела → `startAuthentication({ optionsJSON })` → verify → общий обработчик входа. Отмена в браузере (`NotAllowedError`) — без toast; прочее — «Ошибка входа по ключу» (как в свёрстанном компоненте).
3. **Ключ как 2FA.** Опция `passkey` из `MFA_OPTIONS` показывается при `WEBAUTHN` в `mfaMethods`; экран «Ключ доступа» уже свёрстан.
4. **Капча.** `<Captcha/>` на том же месте, ширина 100%: Turnstile (`react-turnstile`, как сейчас) или Yandex SmartCaptcha (`@yandex/smart-captcha`, `SmartCaptcha` с `language='ru'`); `provider: 'none'` → не рендерится, проверка «Пройдите капчу!» пропускается. Ключ и провайдер — из `GET /`.
5. **Способы оплаты** — из `features.payments` (вопрос В5 про блок «Скоро»).
6. **Коды из письма.**
   - Регистрация: после `register` форма в `/auth/register` переключается на шаг кода (как `LoginForm` → `MfaForm`): `AuthWrapper` + `InputOTP` (6 слотов) + «Продолжить» + ghost-кнопка «Назад» — копия TOTP-шага `MfaForm`. Тексты: заголовок «Подтвердите почту», описание «Мы отправили 6-значный код на {email}». Повторная отправка — повторный `register` теми же данными (ghost-кнопка «Отправить код ещё раз»).
   - Сброс пароля: `/auth/recovery` после отправки письма переключается на шаг «Новый пароль» (`NewPasswordForm`): тот же `InputOTP` для кода + существующее поле «Пароль». Результат — `SignInResponse`: вход или `MfaForm`. Toast после письма меняется на «Код для сброса пароля отправлен на вашу почту», описание первого шага — «…чтобы получить код для сброса пароля».
7. **Toast автопривязки:** `toast.info('К аккаунту привязан вход через GitHub')` в общем обработчике входа (login, MFA confirm, OAuth, reset, passkey, verify).
8. **Резервные коды** — только при выдаче (включение TOTP — существующий шаг 2 `EnableTotpForm`; первый ключ; перевыпуск). Модалка `RecoveryCodesModal` — см. вопрос В3.
9. **Яндекс** в `SSO_PROVIDERS`: иконка `FaYandex` (`react-icons/fa`, уже используется в `get-browser-icon`), цвет `#FC3F1D`, описание «Настройте вход через Яндекс для быстрой авторизации». В `Connections` для белой иконки в синем круге — как у остальных.
10. **Ошибки по-русски** — `getErrorMessage(error, fallback)` со словарём известных сообщений бэка (их ≈ 60, все собраны из `service.ts`), шаблонных (`… is already linked`, `An unpaid … invoice …`) и кодов 401/403/404/409/422/429; иначе — старый русский fallback.

Переадресации: `/auth/telegram-oauth-finish` → `/auth/login`; `/auth/recovery/[token]` → `/auth/recovery`; `/auth/verify/[token]` → `/auth/register` (подтверждение теперь — шаг регистрации); `/auth/callback` (без провайдера, старый `#token=`) → `/auth/login`.

---

## 4. Пробелы API

| # | Пробел | Что делает фронт до доработки бэка |
|---|---|---|
| 1 | **Нет CORS.** Фронт `teacoder.ru` → API `api.teacoder.ru` с `credentials` браузер не пустит. | Инстанс с `withCredentials: true` под CORS. Альтернатива — `rewrites` в Next на тот же origin, но **только без префикса** (`/auth/refresh` → API `/auth/refresh`), иначе cookie с `path=/auth/refresh` не отправится. Нужна доработка бэка (`@elysiajs/cors`, `credentials: true`, список origin). |
| 2 | **Возврат из OAuth** идёт на API (`GATEWAY_URL/auth/sso/:p/callback`), пользователь увидит JSON. | Делаю `/auth/callback/[provider]`: берёт query, при `error=access_denied` сразу показывает `ConnectionError`, иначе вызывает `GET /auth/sso/:p/callback?{query}` с credentials (один раз — защита от двойного эффекта StrictMode, `state` одноразовый). Бэку: `redirect_uri` от `APP_URL` + перерегистрация URL в консолях провайдеров. До этого вход через соцсети в проде не работает. |
| 3 | **Нет статуса TOTP.** | Эвристика: ключей 0, а резервные коды есть → TOTP включён. Если ключи есть — однозначно определить нельзя. Предлагаю бэку добавить `totpEnabled` в `GET /mfa/recovery-codes` или `GET /users/@me`. См. В2. |
| 4 | **Нет смены имени** (`PATCH /users/@me`). | См. В4. |
| 5 | **Нет премиума/автопродления** в профиле; `isPremium`, `isAutoBilling` — неоткуда. | «У вас уже есть подписка» не показывается никогда; блок «Подписка» в настройках — см. В6. |
| 6 | Нет **популярных курсов**, **ссылок на скачивание** кода. Счётчик просмотров встроен в `GET /courses/:slug`, но считается по IP — из RSC это IP сервера Next. | Популярные — см. В7. «Скачать код» — см. В8. Просмотры: запрос страницы курса из RSC будет считаться с IP фронта; нужен доверенный `X-Forwarded-For` от Next или отдельный клиентский вызов. |
| 7 | Нет **статистики**, **прогресса по курсам**, **лидерборда**. | Есть `points` в `/users/@me` и `/progress/:courseId` для каждого курса. См. В9. |
| 8 | Нет **блокировок** (`/restriction`). | `BanChecker` не рендерим (компонент переносим, но не подключаем). |
| 9 | **Сессии:** нет `browser`/`os`. | Парсим `friendlyName`: всё до первой `, ` — браузер (для иконки); заголовок — `friendlyName` целиком (бэк уже склеивает «Chrome, Windows» — совпадает со старым `{browser}, {os}`). `null` → «Неизвестное устройство»; `city/country` `null` — не выводим. Текущую сессию поднимаю первой (бэк сортирует по `lastSeenAt`). |
| 10 | Ошибки на английском. | `getErrorMessage` (3.2). |
| 11 | Оплата подписки не обрабатывается. | Кнопку не подключаем (1.3, В1). |
| 12 | **Урок без курса:** `GET /lessons/:id` отдаёт только `courseId`, а программа курса и название — только по `slug`. | `GET /courses` → найти курс по `courseId` → `GET /courses/:slug` + `/lessons`. Лишний запрос; просьба к бэку — `course { id, title, slug }` в ответе урока или `GET /courses/by-id/:id`. |
| 13 | **Нет `description` у урока в программе курса** (`CourseLessonListItem`). | В списке уроков на странице курса описание не выводится (блок и так условный `lesson.description && …`) — визуально строки станут короче. Просьба к бэку — добавить поле. |
| 14 | **Смена пароля без пароля невозможна:** `password/change` требует `currentPassword`; аккаунты, созданные через соцсеть, пароль установить не могут. Старый UI менял пароль без текущего. | См. В3. |
| 15 | **401 используется не только для токена:** `Invalid email or password`, `Current password is incorrect`, `MFA session expired…`, `Security key verification failed`, `Unknown security key`. | Refresh+повтор только на `Authentication required`, `Invalid or expired access token`, `Session expired or revoked`; и никогда — для `/auth/login`, `/auth/refresh`, `/auth/mfa/*`, `/auth/webauthn/login/*`, `/auth/reset-password`, `/auth/verify`. Бэку можно предложить машинный код ошибки. |
| 16 | **Премиум-уроки** (`access: PREMIUM`) → `GET /lessons/:id` и `PUT /progress` отвечают 403. В старом UI такого состояния нет. | См. В10. |
| 17 | **operationId со спецсимволами** (`getUsers@me`, `postAuthForgot-password`). | В `orval.config.ts` — `override.operationName` (camelCase из метода+пути: `getUsersMe`, `postAuthForgotPassword`). Не пробел бэка, но стоит поправить `operationId` в спеке. |
| 18 | `features.auth.providers` отдаёт **все 5 провайдеров всегда** (ключи `OAUTH_PROVIDERS`), даже без настроенных client id. | Показываем всё, что пришло. Бэку — фильтровать ненастроенные. |
| 19 | Нет «Отменить подписку» в UI и нет способа узнать, есть ли она (`DELETE /billing/cancel` есть). | См. В6. |

---

## 5. Как будет устроена авторизация (для согласования)

- **Access-токен** — в модуле `lib/api/token.ts` + React-контекст; `Authorization: Bearer`. **Refresh** — cookie `tc_refresh`, только `POST /auth/refresh` с `withCredentials`.
- **Single-flight**: один промис refresh на вкладку; между вкладками — `navigator.locks.request('tc-refresh')`. Внутри лока сначала проверяю, не прислала ли другая вкладка свежий токен через `BroadcastChannel('tc-auth')` за время ожидания — если да, refresh не делаю (иначе вторая вкладка отправит уже сгоревшую cookie → сервер завершит сессию). Fallback без Web Locks — только внутривкладочный single-flight.
- **Старт**: refresh, если есть маркер-cookie `tc_session=1` (без маркера гость не шлёт лишний запрос; с ним — восстанавливаем сессию). Провал → маркер снимается, пользователь гость.
- **Маркер `tc_session=1`** (не httpOnly, без секрета) на домене фронта: ставится при любом входе/refresh, снимается при выходе/провале refresh. `proxy.ts` использует только его. Он же даёт `Header` синхронное «вошёл/не вошёл» при первом рендере — как старая cookie `token` (без мигания кнопок «Войти / Регистрация»).
- **`useSession()`**: `{ status: 'loading'|'authenticated'|'guest', user, isAuthorized }` вместо `useAuth` + `useCurrent`. Профиль — сгенерированный `useGetUsersMe`, включён только при наличии токена.
- **Выход**: `POST /auth/logout` → забыть токен, `queryClient.clear()`, снять маркер, broadcast `logout` → другие вкладки делают то же и уходят на `/auth/login`, если были на защищённом маршруте.
- **Общий обработчик входа** `useCompleteSignIn()`: `accessToken` → маркер → toast `linkedProvider` → аналитика → `router.push(redirectTo ?? '/account')`. Используют логин, MFA, OAuth-callback, сброс пароля, verify регистрации, passkey.
- **RSC** (главная, курсы, `sitemap`, метаданные) — сгенерированные функции без токена. Всё, что требует пользователя (прогресс, премиум-урок), — на клиенте.

---

## 6. Риски и вопросы

**В1. Премиум-оплата.** Предлагаю: страница и модалка выбора способа переносятся полностью, кнопка «Продолжить» в модалке показывает `toast.info('Оплата подписки временно недоступна')` и не вызывает `/billing/create`. Или скрыть «Оплатить» совсем / оставить активной, но disabled? Жду решения.

**В2. Статус TOTP** (пробел 3). Варианты: (а) эвристика по кодам/ключам, при ключах + кодах показываю «Включено» только если это известно из текущей сессии; (б) ждать `totpEnabled` от бэка. Рекомендую (б) + временно (а).

**В3. Смена пароля и почты — новые шаги, которых нет в 1.2.**
- Пароль: в диалоге «Обновление пароля» нужно поле «Текущий пароль» (тот же `FormField`/`Input`, над «Новый пароль»), затем второй шаг в том же диалоге — `InputOTP` для кода из письма. `confirmPassword` остаётся только на фронте. После подтверждения — новый токен, toast «Пароль изменён».
- Почта: диалог «Обновление почты» → после «Обновить» второй шаг с `InputOTP` («Мы отправили код на {newEmail}»).
- Отключение TOTP: поле «Пароль» → «Код из приложения или резервный код» (`Input`, без `type=password`), текст подтверждения тот же.
- Резервные коды: кнопка «Просмотреть» открывает модалку, где вместо списка — «Осталось N из M кодов (выпущены {дата})» + поле кода и «Сбросить»; после перевыпуска — существующий блок трёх колонок кодов + «Скачать».
- Все — на существующих примитивах. Согласуете? Для аккаунтов без пароля (пробел 14) кнопку «Изменить» пароля оставить и показывать ошибку, или скрыть?

**В4. Смена имени** (пробел 4): поле «Ваше имя» оставить редактируемым с ошибкой при сохранении, сделать `disabled`, или скрыть `DisplayNameForm`? Рекомендую `disabled` без кнопки «Сохранить».

**В5. Способы оплаты «Скоро».** `features.payments` отдаёт только доступные — блок «Скоро» исчезнет. Можно брать `GET /billing/methods` (есть `isAvailable` и категории) — это сохранит внешний вид. Какой источник?

**В6. Блок «Подписка» / автосписание** в настройках: статуса нет. Скрыть блок, или оставить «Выключить» → `DELETE /billing/cancel` без знания состояния?

**В7. «Популярные курсы» на главной:** показать первые 4 из `GET /courses` (заголовок тот же) или скрыть секцию?

**В8. «Скачать код»** на странице курса: сейчас гость/не-премиум → `/premium`. Без `isPremium` и эндпоинта — всегда вести на `/premium`? Или скрыть кнопку?

**В9. `/account` «Мой прогресс»:**
- «Очки и рейтинг» — `points` из `/users/@me` ✔.
- «Прогресс обучения» (уроков пройдено, % по платформе) и «Все курсы»/вкладка «Курсы» — можно собрать из `GET /courses` + `GET /progress/:id` по каждому курсу (N запросов; нет «Последний доступ» и «Продолжить обучение»).
- «Рейтинг» — данных нет.
Что делаем: собираем на клиенте то, что можно, и прячем недостающее (рейтинг, «последний доступ»), или ждём эндпоинты?

**В10. Премиум-уроки (403).** Сейчас такой урок даст 404. Предлагаю: в сайдбаре урок показывается как есть, а страница урока при 403 — редирект на `/premium`. Ок?

**В11. Страница урока.** Раньше вся страница рендерилась на сервере с прогрессом (через cookie `token`). Теперь сервер токена не видит: урок (для бесплатных) — RSC, прогресс в сайдбаре и состояние кнопки «Завершить» — на клиенте; до загрузки прогресса показываю 0% и без галочек (кнопка — `isLoading`). Альтернатива — вся страница на клиенте с `EllipsisLoader`. Какой вариант?

**В12. `redirectTo` в `proxy.ts`.** Старый `proxy.ts` уводил на `/auth/login` без `redirectTo`, в ТЗ (3.4) — с ним. Добавляю `redirectTo` (форма входа его уже понимает)?

**В13. Регистрация: `name` ≥ 2 символов** на бэке, у фронта `min(1)`. Поднять zod до 2 с текстом «Имя должно содержать от 2 до 50 символов» или оставить и переводить ошибку сервера?

**В14. Текст «Макс. размер: 10 МБ»** в аватаре — бэк принимает до 5 МБ. Исправить текст на «5 МБ» и проверять размер до загрузки?

**В15. `sitemap.ts`** генерирует `/{slug}` вместо `/courses/{slug}` (баг старого фронта). Исправить?

**В16. Зависимости.** Добавляю только `@yandex/smart-captcha`. Удаляю неиспользуемые: `js-cookie`, `@types/js-cookie`, `base64url`, `dotenv` (если orval-конфиг будет читать `process.env` через bun), `recharts` (нигде не импортируется), `@kinescope/react-kinescope-player` (`shared/player.tsx` нигде не используется — `LessonPlayer` на iframe). Удалять или не трогать?

**В17. Спека для orval.** Бэкенд у меня не запущен. Могу генерировать из `OPENAPI_URL` (нужен поднятый бэк), а для локальной разработки — из файла, полученного через `createApp().handle()` (как в этой фазе). Подойдёт второй вариант как fallback?

**Прочие риски (без вопроса):**
- StrictMode вызывает эффекты дважды → OAuth-callback и старт refresh защищаются ref'ом, иначе одноразовые `state`/cookie сгорят.
- `mfaToken` одноразовый и 5 минут: при `MFA session expired` — возврат на форму входа с toast «Время подтверждения истекло, войдите снова».
- Env: уходят `NEXT_PUBLIC_STORAGE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_COOKIE_DOMAIN` (маркер ставится на хост фронта); приходит `OPENAPI_URL` (только для генерации). Dockerfile/compose поправлю соответственно.
- Аналитика: имена событий сохраняю; в `auth.mfa.*` передаю старые имена методов (`totp`/`passkey`/`recovery`), чтобы не ломать отчёты.

---

# Фазы 2–4 — результат

Ответы на фазу 1: пробелы 1–5, 7, 12–15 закрыты на бэке; популярные курсы — сначала платные, затем самые новые, всего 4; блокировки — пропущены; сессии — `friendlyName` как есть; ошибки — словарь до машинных кодов; покупка подписки — работает как раньше (вебхук пока не начисляет); премиум-уроки — не обрабатываются особо; отмена подписки — в UI.

## Проверки

| Проверка | Результат |
|---|---|
| `bun run lint` (`tsc --noEmit` + `prettier --check`) | чисто |
| `bun run build` | собирается, **без доступа к API** (sitemap и страницы динамические) |
| `diff -r` с `frontend`: `src/components/ui`, `src/components/icons`, `src/styles`, `public`, `design`, `tailwind.config.ts`, `postcss.config.mjs` | пусто (файлы скопированы из рабочей копии; `skeleton.tsx` и `globals.css` отличаются от `HEAD` старого репо только переводами строк) |
| Ручной прогон в браузере (без своего бэка) | `/auth/login`, `/` рендерятся; `/account` без сессии → `/auth/login?redirectTo=%2Faccount` |
| Сценарии с бэком (вход, MFA, ключи, регистрация, сброс, соцсети, смена почты/пароля, сессии, две вкладки, тихий refresh) | **не прогонялись**: локальный бэк не запущен. Нужен прогон по списку из ТЗ |

## Файл → что изменилось

Разметка и классы во всех перенесённых компонентах — из старых файлов; ниже — только отличия.

| Файл | Изменения |
|---|---|
| `components/ui/**`, `icons/**`, `styles/**` | без изменений |
| `components/auth/auth-wrapper.tsx` | проп `isShowPasskey` → `AuthSocial` |
| `components/auth/auth-social.tsx` | соцсети из `GET /`; `<PasskeyLoginButton />` раскомментирован (только на входе) |
| `components/auth/passkey-login-button.tsx` | реализован вход по ключу без пароля |
| `components/auth/login-form.tsx` | новый API, `CaptchaField`, MFA через `useSignInResult` |
| `components/auth/mfa/*` | бывший `mfa-form.tsx` разбит на шаги (список, код приложения, резервный код, ключ) + `use-mfa.ts`; разметка шагов прежняя; добавлен рабочий вход ключом |
| `components/auth/code-step.tsx` | экран ввода 6-значного кода (бывший TOTP-шаг MFA), общий для MFA и подтверждения почты |
| `components/auth/register-form.tsx` + `verify-email-step.tsx` | после регистрации — шаг «Подтвердите почту» с кодом (вход только после него) |
| `components/auth/reset-password-form.tsx` | только `CaptchaField` и новый API; после письма — как раньше, toast «Письмо с инструкциями…» |
| `components/auth/new-password-form.tsx`, `app/auth/recovery/[token]` | как раньше — страница по ссылке из письма; токен из URL уходит в `POST /auth/reset-password { token, newPassword }`; после сброса — вход или MFA; страница с `referrer: no-referrer` |
| `components/auth/oauth-callback.tsx` | новая страница `/auth/callback/[provider]`: вход / MFA / привязка (toast «Аккаунт … привязан») / ошибки → `ConnectionError` |
| `components/auth/captcha-field.tsx`, `lib/captcha/captcha.tsx` | Turnstile / Yandex SmartCaptcha / ничего — по `GET /`; виджет пересоздаётся после каждой попытки (токен одноразовый) |
| `components/layout/header.tsx`, `mobile-nav.tsx`, `user-menu.tsx` | `useSession` / `useSignOut` вместо cookie `token` |
| `components/account/account-guard.tsx` | бывший `AccountProvider`: тот же лоадер + возврат на вход, если сессия пропала |
| `account/settings/email-form.tsx` | второй шаг в том же диалоге — код (`ConfirmCodeStep`); «Подтвердить» шлёт код на текущую почту |
| `account/settings/password-form.tsx` | + «Текущий пароль» (если `hasPassword`), второй шаг — код; после подтверждения — новый токен и toast «Пароль изменён» |
| `account/settings/disable-totp-form.tsx` | поле «Пароль» → «Код из приложения или резервный код» |
| `account/settings/enable-totp-form.tsx` | коды из ответа `verify`; «Копировать» на шаге 2 теперь копирует коды |
| `account/settings/recovery-codes-modal.tsx` | вместо списка — «Осталось N из M…», поле кода и «Сбросить»; коды показываются только после перевыпуска |
| `account/settings/register-passkey-form.tsx` | API v13 (`optionsJSON`); первые резервные коды показываются в той же модалке кодов |
| `account/settings/passkey-modal.tsx` | `deviceName` → `name`; «ещё не использовался», если `lastUsedAt` пуст |
| `account/settings/auto-billing-form.tsx`, `subscription.tsx` | `GET/PATCH /billing/subscription`; «Выключить» = отмена подписки |
| `account/settings/avatar-form.tsx`, `display-name-form.tsx` | новый API |
| `account/sessions/*` | `friendlyName`, текущая — по `current` (поднимается первой), город/страна без `null` |
| `account/connections/*` | `GET /auth/sso/accounts`, привязка через редирект (Telegram — как все); `ConnectionError` + случай `another-linked` |
| `account/progress/*` | новые эндпоинты статистики, курсов, рейтинга; «Продолжить обучение» ведёт на `nextLesson`; место — `rank` из API |
| `course/*` | `CourseProvider` удалён (просмотры считает `GET /courses/:slug`); прогресс — `useCourseProgress`; «Скачать код»: не-премиум → `/premium`, премиум → прежний toast ошибки (эндпоинта ссылок нет) |
| `lesson/*`, `app/lesson/[id]` | урок рендерится на сервере без токена, прогресс и кнопка — на клиенте |
| `premium/payment-methods.tsx` | способы из `GET /` (только доступные) — блок «Скоро» удалён |
| `premium/premium.tsx` | `POST /billing/create`; ошибка показывается под способом оплаты |
| `constants/sso-providers.ts` | + Яндекс |
| `constants/payment-icons.ts` | новые id: `YOOMONEY`, `CRYPTO_BOT`, `HELEKET` |
| `app/sitemap.ts` | ссылки `/courses/{slug}` вместо `/{slug}` |
| `next.config.ts` | редиректы: `/auth/telegram-oauth-finish`, `/auth/callback` → `/auth/login`; `/auth/verify/:token` → `/auth/register` |
| `providers/ban-checker.tsx` | удалён |

## Осталось / пробелы

1. **`currentPassword` отсутствует в спеке** (`ChangePasswordPayload`): генератор OpenAPI в Elysia выбрасывает это необязательное поле, хотя `model.ts` его объявляет. Фронт передаёт его через явно типизированный объект (комментарий в `password-form.tsx`). Нужно поправить спеку на бэке.
2. Спека объявлена как OpenAPI 3.0.3, но содержит конструкции 3.1 — `orval.config.ts` поднимает версию трансформером.
3. Просмотры курса считаются по IP, а страницу курса запрашивает сервер Next → все просмотры с IP фронта.
4. Ссылок на скачивание кода курса нет.
5. Пятая соцсеть (Яндекс) в сетке `grid-cols-4` переносится на вторую строку.
6. Текст «Макс. размер: 10 МБ» у аватара не менял, а бэк принимает до 5 МБ.
7. Без `.env` фронт ходит в прод-API (`NEXT_PUBLIC_API_URL` по умолчанию `https://api.teacoder.ru`) — локально задавайте адрес явно.
8. Изменения не закоммичены (ветка `rewrite`).

## Сброс пароля по ссылке (доработка бэка, 1 октября 2026)

По просьбе вернули сброс по ссылке вместо кода. Изменения в `elysia-backend` (не закоммичены):

- `src/modules/auth/password-reset.ts` — новый: одноразовый токен (32 байта, base64url) в Redis, хранится только SHA-256, живёт 30 минут; новая ссылка отменяет прежнюю.
- `auth/service.ts` — `forgotPassword` шлёт ссылку `{APP_URL}/auth/recovery/{token}`; `resetPassword` принимает `{ token, newPassword }`, ошибка — `Reset link expired or invalid`.
- `auth/model.ts`, `auth/index.ts` — схема и описание эндпоинтов.
- `auth/jobs.ts`, `lib/mail/templates/ResetPassword.tsx` — письмо с кнопкой и запасной ссылкой; задача очереди переименована в `sendPasswordResetLink` (письма, поставленные в очередь под старым именем до перезапуска, не уйдут).
