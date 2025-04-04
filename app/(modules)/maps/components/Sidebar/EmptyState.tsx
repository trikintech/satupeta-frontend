export default function EmptyState() {
  return (
    <div className="mt-8 text-sm">
      <div className="max-w-xl mx-auto p-3 bg-gray-50 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Get Started
        </h2>

        <ol className="space-y-4 list-decimal list-inside text-gray-700">
          <li>
            <strong>Click “Explore Data”</strong>
            <br />
            Browse and discover available datasets. You can search, filter, or
            scroll to find the data you need.
          </li>
          <li>
            <strong>Add a Dataset</strong>
            <br />
            Click on a dataset to add it to the map. This helps you visualize
            spatial information and interact with specific data layers.
          </li>
          <li>
            <strong>Find Your Added Data in This Panel</strong>
            <ul className="list-disc list-inside ml-3 mt-2 space-y-1 text-sm text-gray-600">
              <li>View and manage your added datasets</li>
              <li>Toggle layer visibility on the map</li>
              <li>Access detailed layer information</li>
              <li>Remove datasets when no longer needed</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
