export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  
  let match = searchParams.get('match') || 'World-Cup-Match';
  let city = searchParams.get('city') || 'Host-City';
  let stadium = searchParams.get('stadium') || 'Stadium-Venue';
  const amazonId = 'timevalue0e2-20';

  match = match.replace(/-/g, ' ');
  city = city.replace(/-/g, ' ');
  stadium = stadium.replace(/-/g, ' ');

  const currentHourUS = new Date().getUTCHours() - 5;
  let deliveryHook = "";
  let urgencyTag = "";
  let tagColor = "";

  if (currentHourUS > 5 && currentHourUS < 13) {
    deliveryHook = `🚨 **Urgent Notice:** Order your compliant baggage within the next 90 minutes for guaranteed **Same-Day Express Delivery** directly to your hotel or Airbnb in ${city} before gates open.`;
    urgencyTag = "⚡ TIMED SAME-DAY COURIER ACTIVE";
    tagColor = "#059669";
  } else {
    deliveryHook = `🌙 **Overnight Courier Notice:** Order now for **Priority Next-Morning Delivery**. Your compliant stadium gear will arrive securely at your ${city} lodging by 7:30 AM tomorrow.`;
    urgencyTag = "📦 NEXT-MORNING DISPATCH SECURED";
    tagColor = "#2563eb";
  }

  const finalAmazonLink = `https://amazon.com{amazonId}`;

  const htmlOutput = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Official Security Entry Protocol: \${match} - \${stadium}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; color: #111827;">
      <div style="max-width: 650px; margin: 40px auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04); border: 1px solid #e5e7eb;">
        
        <span style="color: #fff; background-color: \${tagColor}; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 12px;">
          \${urgencyTag}
        </span>
        
        <h1 style="font-size: 24px; color: #9d174d; margin-top: 5px; margin-bottom: 15px;">🏟️ Mandatory Fan Entry Guidelines: \${match}</h1>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Attending the live fixture at <strong>\${stadium} (\${city})</strong>? Please verify your matchday equipment configuration immediately to prevent gate refusal at major outer perimeters.
        </p>
        
        <div style="background: #fffbeb; border-left: 5px solid #d97706; padding: 15px; margin: 20px 0; border-radius: 0 6px 6px 0;">
          <h3 style="margin-top: 0; color: #92400e; font-size: 16px; margin-bottom: 8px;">⚠️ Strict \${stadium} Bag Compliance Standard</h3>
          <p style="margin-bottom: 0; font-size: 15px; line-height: 1.5; color: #78350f;">
            All standard backpacks, small non-clear wallets, and opaque canvas pouches are prohibited past initial security lines. Only fully transparent PVC storage packs under 12x12x6 inches are authorized.
          </p>
        </div>

        <p style="font-size: 14px; color: #374151; background: #f3f4f6; padding: 12px; border-radius: 6px; line-height: 1.5;">
          \${deliveryHook}
        </p>

        <a href="\${finalAmazonLink}" target="_blank" style="display: block; text-align: center; background: #ff9900; color: #111; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px; text-transform: uppercase; margin-top: 25px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          🛒 Access Compliant Bags on Amazon
        </a>

        <h3 style="margin-top: 30px; color: #111827; font-size: 18px; border-top: 1px solid #f3f4f6; padding-top: 20px;">ℹ️ Additional Security Checkpoint Rules</h3>
        <ul style="padding-left: 20px; line-height: 1.6; color: #4b5563; font-size: 15px;">
          <li style="margin-bottom: 10px;"><strong>Zero Storage Lockers:</strong> There are no temporary baggage claim counters or holding stations outside \${stadium}. Non-compliant items must be discarded permanently at gates.</li>
          <li style="margin-bottom: 10px;"><strong>Electronic Passes:</strong> Keep your mobile ticket scanners optimized. Bringing a compact, lightweight portable charger is highly encouraged to sustain battery capacity during peak queues.</li>
        </ul>
        
      </div>
    </body>
    </html>
  `;

  return new Response(htmlOutput, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=15, stale-while-revalidate=45' }
  });
}
