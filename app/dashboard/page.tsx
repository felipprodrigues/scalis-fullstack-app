import BalanceCards from '../_components/balanceCards'

export default function Dashboard() {
  return (
    <div className="w-full max-w-[1120px] relative">
      <div className="absolute top-[-50px] w-full flex flex-col gap-8">
        <BalanceCards />
      </div>
    </div>
  )
}
