export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  
  // URL data safety inputs
  let rawMatch = searchParams.get('match') || 'World Cup Match';
  let rawCity = searchParams.get('city') || 'Host City';
  let rawStadium = searchParams.get('stadium') || 'Stadium Venue';
  const amazonId = 'timevalue0e2-20';

  // Safe formatting replacing dashes to normal spaces
  const cleanMatch = rawMatch.replace(/-/g, ' ');
  const cleanCity = rawCity.replace(/-/g, ' ');
  const cleanStadium = rawStadium.replace(/-/g, ' ');

  // Dynamic system time configuration
  const currentHourUS = new Date().getUTCHours() - 5;
  let deliveryHook = "";
  let urgencyTag = "";
  let tagColor = "";

  if (currentHourUS > 5 && currentHourUS < 13) {
    deliveryHook = "🚨 <b>Urgent Notice:</b> Order your compliant baggage within the next 90 minutes for guaranteed <b>Same-Day Express Delivery</b> directly to your hotel or Airbnb in " + cleanCity + " before gates open.";
    urgencyTag = "⚡ TIMED SAME-DAY COURIER ACTIVE";
    tagColor = "#059669";
  } else {
    deliveryHook = "🌙 <b>Overnight Courier Notice:</b> Order now for <b>Priority Next-Morning Delivery</b>. Your compliant stadium gear will arrive securely at your " + cleanCity + " lodging by 7:30 AM tomorrow.";
    urgencyTag = "📦 NEXT-MORNING DISPATCH SECURED";
    tagColor = "#2563eb";
  }

  const finalAmazonLink = "https://amazon.com" + amazonId;

  const htmlOutput = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "  <meta charset=\"UTF-8\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
    "  <title>Official Security Entry Protocol: " + cleanMatch + " - " + cleanStadium + "</title>\n" +
    "</head>\n" +
    "<body style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; color: #111827;\">\n" +
    "  <div style=\"max-width: 650px; margin: 40px auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04); border: 1px solid #e5e7eb;\">\n" +
    "    \n" +
    "    <span style=\"color: #fff; background-color: " + tagColor + "; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 12px;\">\n" +
    "      " + urgencyTag + "\n" +
    "    </span>\n" +
    "    \n" +
    "    <h1 style=\"font-size: 24px; color: #9d174d; margin-top: 5px; margin-bottom: 15px;\">🏟️ Mandatory Fan Entry Guidelines: " + cleanMatch + "</h1>\n" +
    "    \n" +
    "    <p style=\"font-size: 16px; line-height: 1.6; color: #374151;\">\n" +
    "      Attending the live fixture at <strong>" + cleanStadium + " (" + cleanCity + ")</strong>? Please verify your matchday equipment configuration immediately to prevent gate refusal at major outer perimeters.\n" +
    "    </p>\n" +
    "    \n" +
    "    <div style=\"background: #fffbeb; border-left: 5px solid #d97706; padding: 15px; margin: 20px 0; border-radius: 0 6px 6px 0;\">\n" +
    "      <h3 style=\"margin-top: 0; color: #92400e; font-size: 16px; margin-bottom: 8px;\">⚠️ Strict " + cleanStadium + " Bag Compliance Standard</h3>\n" +
    "      <p style=\"margin-bottom: 0; font-size: 15px; line-height: 1.5; color: #78350f;\">\n" +
    "        All standard backpacks, small non-clear wallets, and opaque canvas pouches are prohibited past initial security lines. Only fully transparent PVC storage packs under 12x12x6 inches are authorized.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "\n" +
    "    <p style=\"font-size: 14px; color: #374151; background: #f3f4f6; padding: 12px; border-radius: 6px; line-height: 1.5;\">\n" +
    "      " + deliveryHook + "\n" +
    "    </p>\n" +
    "\n" +
    "    <a href=\"" + finalAmazonLink + "\" target=\"_blank\" style=\"display: block; text-align: center; background: #ff9900; color: #111; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px; text-transform: uppercase; margin-top: 25px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\n" +
    "      🛒 Access Compliant Bags on Amazon\n" +
    "    </a>\n" +
    "\n" +
    "    <h3 style=\"margin-top: 30px; color: #111827; font-size: 18px; border-top: 1px solid #f3f4f6; padding-top: 20px;\">ℹ️ Additional Security Checkpoint Rules</h3>\n" +
    "    <ul style=\"padding-left: 20px; line-height: 1.6; color: #4b5563; font-size: 15px;\">\n" +
    "      <li style=\"margin-bottom: 10px;\"><strong>Zero Storage Lockers:</strong> There are no temporary baggage claim counters or holding stations outside " + cleanStadium + ". Non-compliant items must be discarded permanently at gates.</li>\n" +
    "      <li style=\"margin-bottom: 10px;\"><strong>Electronic Passes:</strong> Keep your mobile ticket scanners optimized. Bringing a compact, lightweight portable charger is highly encouraged to sustain battery capacity during peak queues.</li>\n" +
    "    </ul>\n" +
    "    \n" +
    "  </div>\n" +
    "</body>\n" +
    "</html>";

  return new Response(htmlOutput, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=15, stale-while-revalidate=45' }
  });
}
