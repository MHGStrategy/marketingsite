type FpaEmbedViewerProps = {
  embedUrl: string;
  title?: string;
  envVarHint?: string;
  downloadsEnabled?: boolean;
};

export default function FpaEmbedViewer({
  embedUrl,
  title = 'Interactive Excel Online preview',
  envVarHint,
  downloadsEnabled = true,
}: FpaEmbedViewerProps) {
  if (!embedUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 md:p-10 text-center space-y-4">
        <p className="text-lg font-semibold text-primary-black">{title}</p>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          The live workbook embed will appear here once this file is shared from OneDrive with a
          view-only embed URL. Use the static tab tour below
          {downloadsEnabled
            ? ' or download the full workbook to explore every tab, formula, and filter today.'
            : ' to explore key tabs and structure today.'}
        </p>
        {envVarHint && (
          <p className="text-sm text-gray-500">
            Set <code className="text-primary-blue">{envVarHint}</code> in{' '}
            <code className="text-primary-blue">.env.local</code> at build time.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
        <iframe
          title={title}
          src={embedUrl}
          loading="lazy"
          className="w-full min-h-[520px] md:min-h-[680px] border-0"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-gray-400">
        {downloadsEnabled
          ? 'If the preview does not load, use the HTML tour below or download the full workbook.'
          : 'If the preview does not load, the static HTML tour below still shows key tabs.'}
      </p>
    </div>
  );
}
