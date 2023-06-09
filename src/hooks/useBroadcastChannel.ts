import {useEffect, useState} from 'react'

const useBroadcastChannel = (channelName: string) => {
  const [channel, setChannel] = useState<BroadcastChannel | null>(null)

  useEffect(() => {
    const bc = new BroadcastChannel(channelName)
    setChannel(bc)

    return () => {
      bc.close()
    }
  }, [channelName])

  return channel
}

export default useBroadcastChannel
