import Colors from '../shared/colors.json'

export default function Input({
  id = '',
  label = '',
  type = 'text',
  section = '',
  value = '',
  onChange
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xl font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`mt-1 border-b border-gray-300 ${Colors[section].addEvent.input.focus}`}
      >
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className={`block w-full border-0 border-b border-transparent focus:ring-0 text-xl text-gray-800 ${Colors[section].addEvent.input.border}`}
        />
      </div>
    </div>
  )
}
