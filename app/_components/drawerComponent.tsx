import DrawerCard from './drawerCard'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'

interface DrawerComponentProps {
  handleSelectTransferType: (value: string) => void
  selectedType: string | undefined
}

export function DrawerComponent({
  selectedType,
  handleSelectTransferType,
}: DrawerComponentProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader className="flex gap-6 flex-col">
            <DrawerTitle className="text-center">
              Select a banking transaction type
            </DrawerTitle>
            <DrawerDescription className="gap-4 flex justify-center">
              <Button
                variant={selectedType === 'deposit' ? 'default' : 'outline'}
                onClick={() => handleSelectTransferType('deposit')}
              >
                Deposit
              </Button>
              <Button
                variant={selectedType === 'withdraw' ? 'default' : 'outline'}
                onClick={() => handleSelectTransferType('withdraw')}
              >
                Withdraw
              </Button>
              <Button
                variant={selectedType === 'transfer' ? 'default' : 'outline'}
                onClick={() => handleSelectTransferType('transfer')}
              >
                Transfer
              </Button>
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-w-[355px] w-full p-4">
            {selectedType && (
              <DrawerCard
                transactionType={
                  selectedType === 'transfer'
                    ? 'Transfer'
                    : selectedType === 'deposit'
                    ? 'Deposit'
                    : selectedType === 'withdraw'
                    ? 'Withdraw'
                    : ''
                }
              />
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
