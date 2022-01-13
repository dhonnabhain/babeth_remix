export default function Person() {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        {/* <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt=""> */}
        <h3 className="mt-6 text-gray-900 text-2xl font-medium">NAME</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">BIRTHDAY</dt>
          <dd className="text-gray-500 text-sm">CITY</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              WORK
            </span>
          </dd>
        </dl>
      </div>
    </li>
  )
}
