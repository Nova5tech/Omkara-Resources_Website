import { MessageCircle } from 'lucide-react';

/* ---------------------------------------------------------------
   WHATSAPP SETTINGS
   Country code + number, digits only, no "+", no spaces.
   --------------------------------------------------------------- */
const WHATSAPP_NUMBER = '918985481447';
const WHATSAPP_MESSAGE =
  'Hello OMKARA RESOURCES, I would like to know more about your services.';

const digits = WHATSAPP_NUMBER.replace(/\D/g, '');
const WHATSAPP_URL = digits
  ? `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : '';

export default function OmkaraAIChatbot() {
  if (!WHATSAPP_URL) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with OMKARA RESOURCES on WhatsApp (opens in a new tab)"
      className="chat-fab fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-[#06301a] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))]"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}