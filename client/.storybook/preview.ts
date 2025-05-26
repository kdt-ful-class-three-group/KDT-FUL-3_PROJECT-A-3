import type { Preview } from '@storybook/react'
// src/stories/Decorator/ReduxProvider.tsx
import { withReduxProvider } from '../src/stories/Decorator/ReduxProvider'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },

  // 추가
  decorators:[withReduxProvider],
};

export default preview;