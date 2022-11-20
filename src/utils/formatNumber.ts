import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, commify } from '@ethersproject/units'

export const formatNumber = (v: string, decimals = 18, visibleDecimals = 5) => {
  const bv = BigNumber.from(v)

  if (bv.eq(BigNumber.from(0))) {
    return '0'
  }

  if (bv.lt(BigNumber.from(10).pow(6))) {
    return '< 0.000001'
  }

  const remainder = bv.mod(BigNumber.from(10).pow(decimals - visibleDecimals))

  return commify(formatUnits(bv.sub(remainder), decimals))
}