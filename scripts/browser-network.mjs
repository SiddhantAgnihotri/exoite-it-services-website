import sharp from 'sharp';

// Responsive selection can cancel a candidate before the chosen source decodes.
// Retain every raw record; exempt only local WebP assets that decode successfully
// on a fresh HTTP request and only when the rendered matrix has no broken images.
export async function validateImageCancellations(report) {
  const checked = new Map();
  const finalImagesDecoded = report.routes.every(route => route.brokenImages.length === 0);
  for (const failure of report.networkFailures) {
    if (checked.has(failure.url)) continue;
    const url = new URL(failure.url);
    if (!finalImagesDecoded || failure.error !== 'net::ERR_ABORTED' || url.origin !== 'http://127.0.0.1:4173' || !url.pathname.startsWith('/assets/') || !url.pathname.endsWith('.webp')) continue;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      const bytes = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(bytes).metadata();
      await sharp(bytes).raw().toBuffer();
      checked.set(failure.url, { url: failure.url, status: response.status, bytes: bytes.length, width: metadata.width, height: metadata.height, decoded: true, validated: response.ok && metadata.format === 'webp' && metadata.width > 0 });
    } catch (error) { checked.set(failure.url, { url: failure.url, validated: false, error: error.message }); }
  }
  report.imageCancellationValidation = [...checked.values()];
  report.summary.validatedImageCancellations = report.networkFailures.filter(failure => failure.error === 'net::ERR_ABORTED' && checked.get(failure.url)?.validated).length;
  report.summary.unresolvedNetworkFailures = report.networkFailures.length - report.summary.validatedImageCancellations;
}
