/**
 * CONTACT FORM SUBMISSION (Formspree)
 * The Contact page calls submitEnquiry(data). The data is posted to the
 * Formspree URL set in .env as VITE_CONTACT_ENDPOINT.
 * The URL is not a secret, but it is public once the site is built.
 */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const TIMEOUT_MS = 15000;

function fail(code, message) {
  const err = new Error(message);
  err.code = code; // 'NOT_CONFIGURED' | 'NETWORK' | 'SERVER'
  return err;
}

export async function submitEnquiry(data) {
  if (!ENDPOINT) {
    throw fail('NOT_CONFIGURED', 'No contact endpoint is configured.');
  }

  const { website, ...fields } = data; // "website" is the hidden spam-trap field

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...fields,
        _gotcha: website || '',
        _subject: `Website enquiry: ${fields.subject}`,
      }),
      signal: controller.signal,
    });
  } catch {
    throw fail('NETWORK', 'The server could not be reached.');
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw fail('SERVER', `The server responded with status ${response.status}.`);
  }

  return true;
}