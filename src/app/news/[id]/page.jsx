import ArticleClient from "./ArticleClient";

// Tells Next.js to pre-build these exact URLs for S3 export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function FullArticlePage() {
  // Just load the client component!
  return <ArticleClient />;
}