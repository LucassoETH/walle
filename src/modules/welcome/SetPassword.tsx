import React from 'react'
import { Box, Text } from 'ink'
import { Button } from '../../components'
import { lengthRule, useForm, useSelection } from '../../hooks'
import { ROUTE, useNavigate } from '../../routes'
import { InputBox } from '../../components/InputBox'
import { useWalletStore } from '../../store'

type Inputs = {
  password: string
  repeatPassword: string
}

export const SetPassword: React.FC = () => {
  const navigate = useNavigate()
  const encryptWallet = useWalletStore((state) => state.encryptWallet)
  const { data, errors, register, validateAll } = useForm<Inputs>({
    rules: {
      password: lengthRule(1),
      repeatPassword: (value, data) => {
        if (!data.password || value !== data.password) {
          return 'Passwords do not match'
        }
      },
    },
    options: {
      validateAction: 'never',
    },
  })

  const [selection, setSelection, prevent] = useSelection(
    3,
    'upArrow',
    ['downArrow', 'return'],
    true,
    false,
  )

  const onApply = async () => {
    const [isValid] = validateAll()

    if (isValid) {
      await encryptWallet(data.password)
      navigate(ROUTE.WALLET)
    } else {
      prevent()
      // TODO: focus on first error
      setSelection(0)
    }
  }

  return (
    <Box flexDirection="column">
      <Text>Set password to protect your wallet</Text>
      <InputBox
        label="New password"
        mask="*"
        error={errors.password}
        focus={selection === 0}
        {...register('password')}
      />
      <InputBox
        label="Confirm password"
        mask="*"
        error={errors.repeatPassword}
        focus={selection === 1}
        {...register('repeatPassword')}
      />

      <Button isFocused={selection === 2} onPress={onApply}>
        Apply
      </Button>
    </Box>
  )
}
