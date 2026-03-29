import ColumnClient from "./ColumnClient";

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function FullColumnPage() {
  return <ColumnClient />;
}