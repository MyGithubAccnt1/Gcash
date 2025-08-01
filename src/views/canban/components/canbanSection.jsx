export default function CanbanSection({ title, ref, style, children }) {
  return (
    <div
      ref={ref}
      className={`border rounded flex flex-col !p-2  ${style} z-30 `}
    >
      <div className="border-b-1 border-gray-300 !pb-2 !mb-2 flex items-center justify-between">
        <span>{title}</span>
      </div>

      <div className="!overflow-x-auto !px-2">{children}</div>
    </div>
  );
}
