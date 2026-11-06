/**
 * CONTACT FORM SUBMISSION: THE INTEGRATION POINT
 * ------------------------------------------------------------
 * The Contact page calls submitEnquiry(data). This is the ONLY
 * place that decides where an enquiry goes.
 *
 * To connect a real service (for example Formspree):
 *   1. Create a form at https://formspree.io and copy its URL,
 *      which looks like  https://formspree.io/f/xxxxxxxx
 *   2. In the project root, create a file named .env containing:
 *        VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
 *   3. Stop and restart `npm run dev` (env files are read at start-up).
 *   4. On Netlify, add the same variable under
 *      Site configuration → Environment variables, then redeploy.
 *
 * The endpoint URL is not a secret, so a VITE_ variable is fine here.
 * Never put private API keys in a VITE_ variable: they become public.
 *
 * Any service that accepts a JSON POST works. If you switch services,
 * adjust the request below.
 *
 * Until an endpoint is set, this function throws NOT_CONFIGURED and the
 * page shows an honest "not sent" message instead of a fake success.
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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        _subject: `Website enquiry: ${data.subject}`, // used by Formspree; ignored elsewhere
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