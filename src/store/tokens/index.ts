import { Action } from '..'
import { createWithSubscribeSelector } from '../createWithSubscribeSelector'
import { addToken, syncBalances } from './actions'

export interface Token {
  name: string
  symbol: string
  decimals: number
  address: string
  chainId: number
}

export interface TokensStore {
  tokens: Token[]
  balances: Map<string, string>
  syncBalances: () => Promise<void>
  balancesIsLoading: boolean
  addToken: (token: Omit<Token, 'chainId'>) => void
}

export type TokensAction<T extends keyof TokensStore> = Action<
  TokensStore,
  TokensStore[T]
>

export const useTokensStore = createWithSubscribeSelector<TokensStore>(
  (set, get) => ({
    tokens: [
      {
        name: 'USDT',
        symbol: 'USDT',
        decimals: 18,
        address: '0xf16eec3a587ba34768a4bb9cb9b7b1d66d250227',
        chainId: 97,
      },
      {
        name: 'USDT',
        symbol: 'USDT',
        decimals: 18,
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 4,
      },
    ],
    balances: new Map(),
    syncBalances: syncBalances(set, get),
    balancesIsLoading: true,
    addToken: addToken(set, get),
  }),
)