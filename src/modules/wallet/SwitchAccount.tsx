import React from 'react'
import { Box, Text } from 'ink'

import {
  Selection,
  SelectionZone,
  useSelectionZone,
} from '@src/components/SelectionZone'
import { TextButton } from '@src/components/TextButton'
import { COLUMNS, useWalletStore } from '@src/store'

export const SwitchAccount: React.FC = () => {
  const parentZone = useSelectionZone()!
  const selectAccount = useWalletStore((state) => state.selectAccount)
  const pathId = useWalletStore((state) => state.pathId)

  return (
    <SelectionZone
      prevKey="upArrow"
      nextKey="downArrow"
      looped
      isActive={parentZone.selection === COLUMNS.MAIN}
    >
      <Box flexDirection="column">
        <Box marginTop={-1}>
          <Text> Switch account </Text>
        </Box>
        {[...Array(10)].map((_, index) => {
          return (
            <Selection key={index} activeProps={{ isFocused: true }}>
              <TextButton onPress={() => selectAccount(index)}>
                {pathId === index ? '▶' : ''} Account {index + 1}
              </TextButton>
            </Selection>
          )
        })}
      </Box>
    </SelectionZone>
  )
}
