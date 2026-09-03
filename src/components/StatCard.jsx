function StatCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default StatCard;