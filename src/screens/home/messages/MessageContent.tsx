import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Stack, View } from 'tamagui'

import { useMessageBlocks } from '@/hooks/useMessageBlocks'
import { Message, MessageBlockType } from '@/types/message'
import { getGreenColor } from '@/utils/color'

import MessageBlockRenderer from './blocks'

interface Props {
  message: Message
}

const MessageContent: React.FC<Props> = ({ message }) => {
  const theme = useColorScheme()
  const isDark = theme === 'dark'

  const isUser = message.role === 'user'
  const { processedBlocks } = useMessageBlocks(message.id)

  const mediaBlocks = processedBlocks.filter(
    block => block.type === MessageBlockType.IMAGE || block.type === MessageBlockType.FILE
  )
  const contentBlocks = processedBlocks.filter(
    block => block.type !== MessageBlockType.IMAGE && block.type !== MessageBlockType.FILE
  )

  return (
    <View style={isUser ? styles.userContainer : styles.assistantContainer}>
      {mediaBlocks.length > 0 && <MessageBlockRenderer blocks={mediaBlocks} />}
      {contentBlocks.length > 0 && (
        <Stack
          style={[
            isUser ? styles.contentWrapper : undefined,
            isUser ? styles.userMessageContent : styles.assistantMessageContent,
            mediaBlocks.length > 0 && { marginTop: 8 }
          ]}
          backgroundColor={isUser ? getGreenColor(isDark, 10) : '$colorTransparent'}
          borderColor={isUser ? getGreenColor(isDark, 20) : '$colorTransparent'}
          borderWidth={1}>
          <MessageBlockRenderer blocks={contentBlocks} />
        </Stack>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  assistantContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  contentWrapper: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  userMessageContent: {
    flex: 1,
    paddingHorizontal: 20
  },
  assistantMessageContent: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
})

export default React.memo(MessageContent)
