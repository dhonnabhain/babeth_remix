import React, { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import upperFirst from 'lodash.upperfirst'

export default function Today() {
  const [date] = useState(
    format(new Date(), 'EEEE d MMMM y', { locale: fr })
      .split(' ')
      .map(part => upperFirst(part))
      .join(' ')
  )

  return (
    <h1 className="text-2xl sm:text-5xl font-black text-gray-700">{date}</h1>
  )
}
