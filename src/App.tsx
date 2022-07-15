import { Box } from 'ink'
import React, { useEffect } from 'react'
import { useAutoSave } from './hooks/useAutoSave'
import { useRoute } from './routes'

export const App: React.FC = () => {
  useAutoSave()
  const route = useRoute()

  return (
    <Box width="95%" alignSelf="center" justifyContent="center">
      {route}
    </Box>
  )
}
