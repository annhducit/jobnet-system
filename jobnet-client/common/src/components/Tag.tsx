export default function Tag({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="px-2 text-sm rounded bg-mainLower">{children}</div>
}
