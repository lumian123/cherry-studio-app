import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { YStack } from 'tamagui'

import { AssistantCard } from '@/components/assistant/AssistantCard'
import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useTopic } from '@/hooks/useTopic'
import { RootStackParamList } from '@/types/naviagate'

import ChatContent from './ChatContent'
import WelcomeContent from './WelcomeContent'

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>()
  const { topicId } = route.params
  const { topic, isLoading } = useTopic(topicId)
  const [showAssistantCard, setShowAssistantCard] = useState(false)

  if (!topic || isLoading) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  const hasMessages = topic.messages.length > 0

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss} gap={20}>
            <HeaderBar
              topic={topic}
              showAssistantCard={showAssistantCard}
              setShowAssistantCard={setShowAssistantCard}
            />

            {showAssistantCard && <AssistantCard topic={topic} />}

            {hasMessages ? <ChatContent key={topic.id} topic={topic} /> : <WelcomeContent key={topic.id} />}
            <MessageInput topic={topic} />
          </YStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  )
}

export default ChatScreen
