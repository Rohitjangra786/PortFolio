'use client'

import { useRef, useState, type FormEvent } from 'react'
import { BsArrowRight, BsCheckCircle } from 'react-icons/bs'
import { isValidEmail } from '@/utils/check-email'
import { personal } from '@/utils/data/personal'

type Values = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const empty: Values = { name: '', email: '', message: '' }

function validate({ name, email, message }: Values): Errors {
  const errors: Errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!isValidEmail(email.trim())) errors.email = 'Please enter a valid email, like you@example.com.'
  if (!message.trim()) errors.message = 'Please tell me a little about your project.'
  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const form = useRef<HTMLFormElement>(null)

  const update = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(empty) as (keyof Values)[]).find((k) => found[k])
    if (firstInvalid) {
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setValues(empty)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-lg bg-white/5 p-8 text-center">
        <BsCheckCircle aria-hidden className="mx-auto text-3xl text-accent-soft" />
        <p className="mt-4 text-xl font-normal text-white">Message sent. Thank you!</p>
        <p>I will reply to your email soon.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-2 min-h-11 underline underline-offset-4">
          Send another message
        </button>
      </div>
    )
  }

  const fieldError = (key: keyof Values) =>
    errors[key] && (
      <span id={`${key}-error`} role="alert" className="mt-1 block text-left text-sm text-accent-soft">
        {errors[key]}
      </span>
    )

  const aria = (key: keyof Values) => ({
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  return (
    <form ref={form} onSubmit={submit} noValidate className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <label className="min-w-0 flex-1 text-left text-sm text-white/70">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            className="input mt-1.5 text-base text-white"
            {...aria('name')}
          />
          {fieldError('name')}
        </label>
        <label className="min-w-0 flex-1 text-left text-sm text-white/70">
          E-mail
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={100}
            required
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            className="input mt-1.5 text-base text-white"
            {...aria('email')}
          />
          {fieldError('email')}
        </label>
      </div>

      <label className="text-left text-sm text-white/70">
        Message
        <textarea
          name="message"
          data-lenis-prevent
          rows={4}
          maxLength={500}
          required
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          className="textarea mt-1.5 text-base text-white"
          {...aria('message')}
        />
        {fieldError('message')}
      </label>

      {status === 'failed' && (
        <p role="alert" className="text-sm !text-accent-soft">
          The message could not be sent. Please try again, or email me at{' '}
          <a href={`mailto:${personal.email}`} className="underline">
            {personal.email}
          </a>
          .
        </p>
      )}

      <button
        data-magnetic
        type="submit"
        disabled={status === 'sending'}
        className="group relative mx-auto flex h-13 w-full max-w-42.5 items-center justify-center overflow-hidden rounded-full bg-accent px-8 font-semibold text-ink transition-transform duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 lg:mx-0"
      >
        <span className="transition-all duration-500 group-hover:-translate-y-[120%] group-hover:opacity-0">
          {status === 'sending' ? 'Sending...' : "Let's talk"}
        </span>
        <BsArrowRight
          aria-hidden
          className="absolute -translate-y-[120%] text-[22px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </button>
    </form>
  )
}
