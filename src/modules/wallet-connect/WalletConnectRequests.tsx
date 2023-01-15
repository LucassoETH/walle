import React from 'react'
import { Box, Text } from 'ink'
import { COLUMNS, useWalletConnectStore } from '@store'
import {
  Selection,
  SelectionZone,
  useSelectionZone,
} from '@src/components/SelectionZone'
import { SuperKey, useKey, useWalletConnectRequestHandler } from '@src/hooks'
import { SessionRequest } from '@src/store/wallet-connect/actions'
import { List } from '@src/components/List'

interface RequestItemProps {
  request: SessionRequest
  isActive?: boolean
  onApprove: (request: SessionRequest) => void
  pressKey: SuperKey | SuperKey[]
}

const RequestItem: React.FC<RequestItemProps> = ({
  request,
  isActive = false,
  onApprove,
  pressKey,
}) => {
  useKey(pressKey, () => onApprove(request), isActive)

  const { params } = request

  return (
    <Box
      flexDirection="column"
      borderStyle={isActive ? 'double' : 'classic'}
      paddingX={1}
    >
      <Text>
        [{params.chainId}] {params.request.method}
      </Text>
      <Text>{JSON.stringify(params.request.params, null, 2)}</Text>
    </Box>
  )
}

export const WalletConnectRequests: React.FC = () => {
  const parentZone = useSelectionZone()!
  const handleRequest = useWalletConnectRequestHandler()
  const pendingRequests = useWalletConnectStore((store) => store.requests)

  return (
    <Box flexDirection="column">
      <Box marginTop={-1}>
        <Text> Pending requests </Text>
      </Box>
      <SelectionZone
        prevKey="upArrow"
        nextKey="downArrow"
        isActive={parentZone.selection === COLUMNS.MAIN}
      >
        {(selection) => (
          <List viewport={1} selection={selection}>
            {pendingRequests.map((request) => (
              <Selection<RequestItemProps>
                key={request.id}
                activeProps={{ isActive: true }}
              >
                <RequestItem
                  request={request}
                  pressKey="return"
                  onApprove={handleRequest}
                />
              </Selection>
            ))}
          </List>
        )}
      </SelectionZone>
    </Box>
  )
}