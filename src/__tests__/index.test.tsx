import {act} from '@testing-library/react'
import * as React from 'react'
import {FC} from 'react'
import * as testing from '@testing-library/react'
import {KonjacProvider, useTranslation} from '../index'

test('can do translation', function () {
  const App: FC = (props) => {
    const {t} = useTranslation()
    return (
      <div>
        {t(['hello', '你好'])}
      </div>
    )
  }
  const renderer = testing.render(
    <KonjacProvider locale={'zh'} allLocales={['en', 'zh']}>
      <App/>
    </KonjacProvider>
  )
  expect(renderer.asFragment()).toMatchSnapshot()
})
