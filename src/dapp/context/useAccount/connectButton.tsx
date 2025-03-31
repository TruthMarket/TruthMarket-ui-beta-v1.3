import { ConnectButton} from '@rainbow-me/rainbowkit'

export const Connect = () => {

    return (
        <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'address',
            }} 
        />
    )
}