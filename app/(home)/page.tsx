import { Header } from '../_components/header'
import { LoginCard } from '../_components/loginCard'

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-full">
        <LoginCard />
      </div>
    </>
  )
}
