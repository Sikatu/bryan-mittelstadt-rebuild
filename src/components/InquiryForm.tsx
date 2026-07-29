'use client';

import { useState, type FormEvent } from 'react';
import type { ContactFormConfig } from '@/types';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface InquiryFormProps {
  recipientEmail: string;
  config: ContactFormConfig;
}

interface FormFields {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  company: string;
}

const initialFields: FormFields = {
  name: '',
  email: '',
  category: 'general',
  subject: '',
  message: '',
  company: '',
};

export default function InquiryForm({ recipientEmail, config }: InquiryFormProps) {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const selectedCategory =
    config.categories.find((category) => category.id === fields.category) ?? config.categories[0];

  function updateField(name: keyof FormFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setStatusMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (fields.company) {
      setSubmissionState('success');
      setStatusMessage('Thank you. Your inquiry has been received.');
      return;
    }

    if (fields.message.trim().length < config.minimumMessageLength) {
      setSubmissionState('error');
      setStatusMessage(`Please provide at least ${config.minimumMessageLength} characters in your message.`);
      return;
    }

    setSubmissionState('submitting');
    setStatusMessage('Preparing your inquiry…');

    const subject = fields.subject.trim() || selectedCategory.subjectPrefix;
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      category: selectedCategory.label,
      subject,
      message: fields.message.trim(),
    };

    if (config.endpoint) {
      try {
        const response = await fetch(config.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);

        setSubmissionState('success');
        setStatusMessage('Your inquiry was sent successfully.');
        setFields(initialFields);
      } catch {
        setSubmissionState('error');
        setStatusMessage(`The form could not send your message. Please email ${recipientEmail} directly.`);
      }
      return;
    }

    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Inquiry type: ${payload.category}`,
      '',
      payload.message,
    ].join('\n');

    const mailto = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmissionState('success');
    setStatusMessage('Your email application should open with the inquiry prepared. Review it there, then send.');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={(event) => updateField('company', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="min-h-12 w-full rounded-sm border border-border-subtle bg-bg-primary px-4 py-3 text-base text-text-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="min-h-12 w-full rounded-sm border border-border-subtle bg-bg-primary px-4 py-3 text-base text-text-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
          Inquiry Type
        </label>
        <select
          id="category"
          name="category"
          required
          value={fields.category}
          onChange={(event) => updateField('category', event.target.value)}
          className="min-h-12 w-full rounded-sm border border-border-subtle bg-bg-primary px-4 py-3 text-base text-text-primary"
        >
          {config.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {selectedCategory.description && (
          <p className="mt-2 text-sm text-text-muted">{selectedCategory.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
          Subject <span className="normal-case tracking-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={fields.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          placeholder={selectedCategory.subjectPrefix}
          className="min-h-12 w-full rounded-sm border border-border-subtle bg-bg-primary px-4 py-3 text-base text-text-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={config.minimumMessageLength}
          rows={7}
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="w-full resize-y rounded-sm border border-border-subtle bg-bg-primary px-4 py-3 text-base leading-relaxed text-text-primary"
        />
        <p className="mt-2 text-sm text-text-muted">
          Minimum {config.minimumMessageLength} characters. Include relevant dates, production details, and the best way to follow up.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submissionState === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-65"
        >
          {submissionState === 'submitting'
            ? 'Preparing…'
            : config.endpoint
              ? 'Send Inquiry'
              : 'Continue in Email'}
        </button>
        <p className="max-w-md text-xs leading-relaxed text-text-muted">{config.privacyNote}</p>
      </div>

      <div
        aria-live="polite"
        role={submissionState === 'error' ? 'alert' : 'status'}
        className={`min-h-6 text-sm ${submissionState === 'error' ? 'text-red-700' : 'text-text-secondary'}`}
      >
        {statusMessage}
      </div>
    </form>
  );
}
