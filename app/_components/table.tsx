import React from 'react'
import { priceFormatter } from '../_utils/formatters'

export default function Table() {
  return (
    <table className="w-full  border-collapse border-spacing-x-0 mt-6">
      {/* {!transactions.length ? (
        <div>
          <span>This may take a while</span>
        </div>
      ) : ( */}
      <thead className="border-b-[1px] border-b-slate-200">
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Source Acc
        </th>
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Dest. Acc
        </th>
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Account Type
        </th>
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Transfer Type
        </th>
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Value
        </th>
        <th className="px-5 py-8 bg-primary-foreground text-sm text-gray-500 text-start">
          Date
        </th>
      </thead>
      <tbody>
        {/* {transactions.map((item: TransactionProp) => { */}
        {/* return ( */}
        <tr className="border-b-[1px] border-b-slate-200">
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500">
            123
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            321
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Checking
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Transfer
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            5000
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            03/25/2024
          </td>
        </tr>
        <tr className="border-b-[1px] border-b-slate-200">
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            123
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            321
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Saving
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Withdrawal
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            5000
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            03/25/2024
          </td>
        </tr>
        <tr className="border-b-2 border-b-slate-200">
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            123
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            321
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Checking
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            Deposit
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            {priceFormatter.format(5000)}
          </td>
          <td className="px-5 py-8 bg-primary-foreground text-xs text-gray-500 ">
            03/25/2024
          </td>
          {/* <PriceHighlight variant={item.type}>
                    {item.type === 'outcome' && '- '}
                    {priceFormatter.format(item.price)}
                  </PriceHighlight> */}
        </tr>
        {/* ) */}
        {/* // })} */}
      </tbody>
      {/* )} */}
    </table>
  )
}

// export const TransactionsTable = styled.table`
//   width: 100%;
//   border-collapse: separate;
//   border-spacing: 0 0.5rem;
//   margin-top: 1.5rem;

//   div > span {
//     color: ${(props) => props.theme['gray-500']};
//   }

//   td {
//     padding: 1.25rem 2rem;
//     background-color: ${(props) => props.theme['gray-700']};

//     &:first-child {
//       border-top-left-radius: 6px;
//       border-bottom-left-radius: 6px;
//     }

//     &:last-child {
//       border-top-right-radius: 6px;
//       border-bottom-right-radius: 6px;
//     }

//     & > svg {
//       color: ${(props) => props.theme['gray-300']};
//       cursor: pointer;

//       &:hover {
//         color: ${(props) => props.theme['red-300']};
//       }
//     }
//   }
// `
