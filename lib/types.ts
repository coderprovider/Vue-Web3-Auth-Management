import type {
  Chain,
  GetAccountResult,
  PrepareSendTransactionArgs,
  SendTransactionArgs,
  Unit,
  WaitForTransactionArgs
} from '@wagmi/core'
import type { ConfigCtrlState, ThemeCtrlState } from '@web3modal/core'
import type { EthereumClient } from '@web3modal/ethereum'
import type { WatchAssetParams } from 'viem/types/eip1193'

type BlockTag = 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'

export type Options = {
  /**
   * if true, plugin WalletConnect will init automatically
   */
  autoInit?: boolean
  /**
   * generate here https://cloud.walletconnect.com/ and turn on 'Supports Sign v2'
   */
  projectId: string
  chains: Chain[]
  /**
   * if true, wc will auto connect if was connected previously
   */
  autoConnect?: boolean
  /**
   * when selected unknown chain, account will disconnect
   */
  disconnectUnknownChain?: boolean
  /**
   * when chain changed account will disconnect then connect again. when true, event "chain_switched" isn't available
   */

  // const accountState = reactive<ConnectedAccount>({
  //   connected: false,
  //   address: undefined,
  //   shortAddress: undefined,
  //   wallet: {
  //     id: undefined,
  //     name: undefined
  //   }
  // })

  reconnectToChain?: boolean
  logEnabled?: boolean
  /**
   * if true, the w3m provider will be disabled and a custom rpc based on the rpc from the chain configuration will be activated
   */
  enableCustomProvider?: boolean
  web3modalOptions?: Pick<
    ConfigCtrlState,
    | 'mobileWallets'
    | 'desktopWallets'
    | 'walletImages'
    | 'chainImages'
    | 'tokenImages'
    | 'tokenContracts'
    | 'explorerRecommendedWalletIds'
    | 'explorerExcludedWalletIds'
    | 'termsOfServiceUrl'
    | 'privacyPolicyUrl'
  > &
    ThemeCtrlState
}

export type { Chain }

export type ConnectedAccount = {
  connected: boolean
  address?: `0x${string}`
  shortAddress?: string
  wallet: {
    id?: string
    name?: string
  }
}

export type BufferChain = Chain & { unsupported?: boolean }

export type ChainState = {
  bufferChain: BufferChain | null
  currentChain: BufferChain | null
}

export type WcState = {
  client: EthereumClient | null
}

export type AccountState = {
  bufferAccount: GetAccountResult | null
  currentAccount: GetAccountResult | null
}

export type MulticallContract = {
  abi: any
  contractAddress: `0x${string}`
  calls: [string, Array<any>?][]
}

export type MulticallArgs<TAllowFailure extends boolean = true> = {
  chainId?: number
  calls: MulticallContract[]
  multicallAddress?: `0x${string}`
  batchSize?: number
  allowFailure?: TAllowFailure
} & (
  | {
      blockNumber?: bigint
      blockTag?: never
    }
  | {
      blockNumber?: never
      blockTag?: BlockTag
    }
)

export type ReadContract = {
  chainId?: number
  address: `0x${string}`
  abi: any
  functionName: string
  args?: any[]
  account?: `0x${string}`
  blockNumber?: bigint
  blockTag?: BlockTag
}

export type WriteContract = {
  chainId?: number
  address: `0x${string}`
  abi: any
  functionName: string
  args?: any[]
  account?: `0x${string}`
  gas?: bigint
  gasPrice?: bigint
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  nonce?: number
  value?: bigint
  confirmations?: number
}

export type ParseEvents = {
  abi: any
}

export type DecodedEvent = {
  eventName: string
  args: any
}

export type WatchContractEvent = {
  chainId?: number
  address: `0x${string}` | `0x${string}`[]
  abi: any
  eventName: string
}

export type FetchBalance = {
  chainId?: number
  address: `0x${string}`
  formatUnits?: Unit
  token?: `0x${string}`
}

export type WatchAsset = {
  chainId?: number
} & WatchAssetParams['options']

export type FetchBalanceOptions = {
  disableAutoFetch?: boolean
  autoReloadTime?: number
  disableAutoReload?: boolean
}

export type FetchToken = {
  chainId?: number
  address: `0x${string}`
  formatUnits?: Unit
}

export type FetchFeeData = {
  chainId?: number
  formatUnits?: Unit
}

export type FetchBlockNumber = {
  chainId?: number
}

export type FetchTransaction = {
  chainId?: number
  hash: `0x${string}`
}

export type FetchTransactionReceipt = {
  chainId?: number
  hash: `0x${string}`
}

export type PrepareSendTransaction = Omit<PrepareSendTransactionArgs, 'walletClient'> & {
  value?: bigint
}

export type SendTransaction = SendTransactionArgs & {
  value?: bigint
}

export type WaitTransaction = WaitForTransactionArgs
