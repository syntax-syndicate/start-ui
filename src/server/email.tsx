import { ReactElement } from 'react';

import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

import { DEFAULT_LANGUAGE_KEY } from '@/lib/i18n/constants';

const transport = nodemailer.createTransport(process.env.EMAIL_SERVER);

export const sendEmail = ({
  template,
  ...options
}: Omit<MailOptions, 'html'> &
  Required<Pick<MailOptions, 'subject'>> & { template: ReactElement }) => {
  const html = render(template);
  return transport.sendMail({
    from: process.env.EMAIL_FROM,
    html,
    ...options,
  });
};

export const previewEmailRoute = async (
  req: Request,
  {
    params,
  }: {
    params: { options: [string, string?] };
  }
) => {
  // Allows debug only in development
  if (process.env.NODE_ENV !== 'development') {
    return new Response(undefined, {
      status: 404,
    });
  }

  const [template, language = DEFAULT_LANGUAGE_KEY] = params.options;
  const query = req.url.split('?')[1];
  const searchQuery = Object.fromEntries(new URLSearchParams(query ?? ''));

  let Email;
  try {
    const EmailModule = await import(`@/emails/templates/${template}`);
    Email = EmailModule.default;
  } catch {
    return new Response('Template not found', {
      status: 404,
    });
  }

  const html = render(<Email language={language ?? 'en'} {...searchQuery} />);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
