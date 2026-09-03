function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor AI email processing and decisions
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            System Online
          </p>
          <p className="text-xs text-gray-500">
            AI Email Agent
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;