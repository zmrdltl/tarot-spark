import Script from "next/script";
import { GoogleAnalyticsEvents } from "./GoogleAnalyticsEvents";

const gaMeasurementId = process.env["NEXT_PUBLIC_GA_ID"];

export function GoogleAnalytics() {
  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsEvents measurementId={gaMeasurementId} />
    </>
  );
}
