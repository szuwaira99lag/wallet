import { View } from '@components'
import { NumberRow } from '@components/NumberRow'
import { SymbolIcon } from '@components/SymbolIcon'
import { TextRow } from '@components/TextRow'
import { ThemedIcon, ThemedScrollView, ThemedText, ThemedTouchableOpacity, ThemedView } from '@components/themed'
import { WalletAlert } from '@components/WalletAlert'
import { StackScreenProps } from '@react-navigation/stack'
import { RootState } from '@store'
import { tailwind } from '@tailwind'
import { translate } from '@translations'
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { useFutureSwapDate } from '../../Dex/hook/FutureSwap'
import { BalanceParamList } from '../BalancesNavigator'

type Props = StackScreenProps<BalanceParamList, 'FutureSwapDetailScreen'>

export function FutureSwapDetailScreen ({ route }: Props): JSX.Element {
  const { futureSwap, executionBlock } = route.params
  const blockCount = useSelector((state: RootState) => state.block.count ?? 0)
  const { transactionDate, isEnded } = useFutureSwapDate(executionBlock, blockCount) // snapshot executionBlock from list view

  return (
    <ThemedScrollView
      contentContainerStyle={tailwind('py-4')}
    >
      <TextRow
        lhs={translate('screens/FutureSwapDetailScreen', 'Transaction')}
        rhs={{
          value: translate('screens/FutureSwapDetailScreen', 'Future swap'),
          testID: 'text_transaction_type'
        }}
        textStyle={tailwind('text-sm font-normal')}
      />
      <TokenIconRow
        label={translate('screens/FutureSwapDetailScreen', 'Token to swap from')}
        displaySymbol={futureSwap.source.displaySymbol}
      />
      <NumberRow
        lhs={translate('screens/FutureSwapDetailScreen', 'Amount to swap')}
        rhs={{
          value: futureSwap.source.amount,
          testID: 'text_amount',
          suffixType: 'text',
          suffix: futureSwap.source.displaySymbol
        }}
      />
      <TokenIconRow
        label={translate('screens/FutureSwapDetailScreen', 'Token to swap to')}
        displaySymbol={futureSwap.destination.displaySymbol}
      />
      <TextRow
        lhs={translate('screens/FutureSwapDetailScreen', 'Future price')}
        rhs={{
          value: translate('screens/FutureSwapDetailScreen', `Oracle price ${!futureSwap.source.isLoanToken ? '+5%' : '-5%'}`),
          testID: 'text_future_price'
        }}
        textStyle={tailwind('text-sm font-normal')}
      />
      <NumberRow
        lhs={translate('screens/FutureSwapDetailScreen', 'Execution block')}
        rhs={{
          value: executionBlock,
          testID: 'text_execution_block'
        }}
      />
      <TextRow
        lhs={translate('screens/FutureSwapDetailScreen', 'Execution date')}
        rhs={{
          value: transactionDate,
          testID: 'text_execution_date'
        }}
        textStyle={tailwind('text-sm font-normal')}
      />
      {/* <TransactionIdRow transactionId={futureSwap.txId} /> */}
      <ClearFutureSwapButton disabled={isEnded} />
    </ThemedScrollView>
  )
}

function TokenIconRow ({ label, displaySymbol }: { label: string, displaySymbol: string }): JSX.Element {
  return (
    <ThemedView
      dark={tailwind('bg-gray-800 border-gray-700')}
      light={tailwind('bg-white border-gray-200')}
      style={tailwind('flex flex-row p-4 border-b items-center justify-between w-full')}
    >
      <View style={tailwind('w-6/12')}>
        <ThemedText style={tailwind('text-sm')}>
          {label}
        </ThemedText>
      </View>

      <View style={tailwind('flex flex-row justify-end items-center flex-1')}>
        <SymbolIcon symbol={displaySymbol} styleProps={tailwind('w-4 h-4')} />
        <ThemedText
          style={tailwind('text-sm ml-1')}
          dark={tailwind('text-gray-400')}
          light={tailwind('text-gray-500')}
        >
          {displaySymbol}
        </ThemedText>
      </View>
    </ThemedView>
  )
}

// Commented temporarily in case product team wants it back
// function TransactionIdRow ({ transactionId }: { transactionId: string }): JSX.Element {
//   const { getTransactionUrl } = useDeFiScanContext()

//   const onPress = async (): Promise<void> => {
//     const url = getTransactionUrl(transactionId)
//     await Linking.openURL(url)
//   }

//   return (
//     <ThemedView
//       dark={tailwind('bg-gray-800 border-gray-700')}
//       light={tailwind('bg-white border-gray-200')}
//       style={tailwind('flex flex-row p-4 border-b items-center justify-between w-full mt-6')}
//     >
//       <View style={tailwind('w-6/12')}>
//         <ThemedText style={tailwind('text-sm')}>
//           {translate('screens/FutureSwapDetailScreen', 'Transaction ID')}
//         </ThemedText>
//       </View>

//       <TouchableOpacity
//         onPress={onPress}
//         testID='transaction_id_url'
//         style={tailwind('flex-row items-center w-6/12')}
//       >
//         <ThemedText
//           ellipsizeMode='middle'
//           numberOfLines={1}
//           style={tailwind('text-sm mr-1.5 flex-auto')}
//           dark={tailwind('text-gray-400')}
//           light={tailwind('text-gray-500')}
//         >
//           {transactionId}
//         </ThemedText>
//         <ThemedIcon
//           dark={tailwind('text-darkprimary-500')}
//           iconType='MaterialIcons'
//           light={tailwind('text-primary-500')}
//           name='open-in-new'
//           size={24}
//         />
//       </TouchableOpacity>
//     </ThemedView>
//   )
// }

function ClearFutureSwapButton ({ disabled = false }: { disabled: boolean }): JSX.Element {
  const onPress = (): void => WalletAlert({
    title: translate('screens/FutureSwapDetailScreen', 'Cancel Future Swap'),
    message: translate(
      'screens/FutureSwapDetailScreen', 'By cancelling, you are withdrawing your order. Once confirmed, the tokens locked for this transaction will be returned to your wallet.'),
    buttons: [
      {
        text: translate('screens/FutureSwapDetailScreen', 'Go back'),
        style: 'cancel'
      },
      {
        text: translate('screens/FutureSwapDetailScreen', 'Cancel Order'),
        style: 'destructive',
        onPress: async () => {
          // TODO: add passcode prompt
        }
      }
    ]
  })
  return (
    <View style={tailwind('flex flex-row justify-center mb-4 mt-8')}>
      <ThemedTouchableOpacity
        style={tailwind('flex-row items-center py-2 px-7 rounded-lg')}
        light={tailwind('border-0 bg-white')}
        dark={tailwind('border-0 bg-gray-800')}
        onPress={onPress}
        disabled={disabled}
      >
        <ThemedIcon
          iconType='MaterialIcons'
          name='close'
          light={tailwind('text-primary-500')}
          dark={tailwind('text-darkprimary-500')}
          size={18}
        />
        <ThemedText
          style={tailwind('ml-1.5 font-medium', { 'pb-1': Platform.OS === 'android' })}
          light={tailwind('text-primary-500')}
          dark={tailwind('text-darkprimary-500')}
        >
          {translate('screens/FutureSwapDetailScreen', 'CANCEL ORDER')}
        </ThemedText>
      </ThemedTouchableOpacity>
    </View>
  )
}