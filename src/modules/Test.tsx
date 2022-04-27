import React from 'react'
import { Text, useInput } from 'ink'
import { useNavigate } from '../Router'
import { ROUTE } from '../routes'

export const Test: React.FC = () => {
  const navigate = useNavigate()

  useInput((input, key) => {
    if (key.upArrow) {
      navigate(ROUTE.TICKER)
    }
  })

  return <Text>1</Text>
}
