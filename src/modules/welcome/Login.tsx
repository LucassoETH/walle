import React from 'react'
import { Box, Text } from 'ink'
import { Button } from '../../components'
import { useForm, useSelection } from '../../hooks'
import { ROUTE, useNavigate } from '../../routes'
import { InputBox } from '../../components/InputBox'
import { useWalletStore } from '../../store'
import { load } from '../../utils'

type Inputs = {
  password: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const decryptWallet = useWalletStore((state) => state.decryptWallet)
  const { data, errors, register, validateAll } = useForm<Inputs>({
    options: {
      validateAction: 'never',
    },
  })

  const [selection, setSelection, prevent] = useSelection(
    2,
    'upArrow',
    ['downArrow', 'return'],
    true,
    false,
  )

  const onApply = async () => {
    const [isValid] = validateAll()

    if (isValid) {
      const encrypted = await load() // TODO: Maybe load it once? 🤔
      await decryptWallet(data.password, encrypted)
      navigate(ROUTE.WALLET)
    } else {
      prevent()
      // TODO: focus on first error
      setSelection(0)
    }
  }

  return (
    <Box flexDirection="column">
      <Text>Nice to see you!</Text>
      <InputBox
        label="Password"
        mask="*"
        error={errors.password}
        focus={selection === 0}
        {...register('password')}
      />

      <Button isFocused={selection === 1} onPress={onApply}>
        Unlock
      </Button>
    </Box>
  )
}
