interface ComposeParams {
  to: string;
  subject: string;
  body: string;
}

function buildGmailComposeUrl({ to, subject, body }: ComposeParams) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function buildOutlookComposeUrl(base: string, { to, subject, body }: ComposeParams) {
  const params = new URLSearchParams({ to, subject, body });
  return `${base}?${params.toString()}`;
}

function buildMailtoUrl({ to, subject, body }: ComposeParams) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

function getEmailDomain(email: string) {
  return email.split("@")[1]?.toLowerCase().trim() ?? "";
}

function isGmailAddress(email: string) {
  const domain = getEmailDomain(email);
  return domain === "gmail.com" || domain === "googlemail.com";
}

function isMicrosoftPersonalAddress(email: string) {
  const domain = getEmailDomain(email);
  return ["outlook.com", "hotmail.com", "live.com", "msn.com"].includes(domain);
}

/** Pick Gmail for @gmail.com senders; Outlook for corporate & other domains. */
export function getComposeUrl(senderEmail: string, params: ComposeParams) {
  if (isGmailAddress(senderEmail)) {
    return buildGmailComposeUrl(params);
  }

  if (isMicrosoftPersonalAddress(senderEmail)) {
    return buildOutlookComposeUrl(
      "https://outlook.live.com/mail/0/deeplink/compose",
      params
    );
  }

  return buildOutlookComposeUrl(
    "https://outlook.office.com/mail/deeplink/compose",
    params
  );
}

export function openComposeWindow(senderEmail: string, params: ComposeParams) {
  const composeUrl = getComposeUrl(senderEmail, params);
  const mailtoUrl = buildMailtoUrl(params);

  const popup = window.open(composeUrl, "_blank", "noopener,noreferrer");

  if (!popup) {
    window.location.assign(composeUrl);
    return;
  }

  try {
    popup.focus();
  } catch {
    window.location.href = mailtoUrl;
  }
}
