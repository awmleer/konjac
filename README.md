# Konjac

可能是你见过最好用的 React 国际化方案

![翻译魔芋](https://imgur.com/O48coa1)

> Konjac 取自《哆啦A梦》中的"翻译魔芋"

## 使用方法

安装：

```bash
$ yarn add konjac
```

在应用外层包裹一个 `KonjacProvider` 组件，并进行一些基础配置：

```jsx
import {KonjacProvider} from 'konjac'

function App() {
  const [locale, setLocale] = useState('zh-CN')
  return (
    <KonjacProvider locale={locale} allLocales={['en-US', 'zh-CN']}>
      {/* ... */}
    </KonjacProvider>
  )
}
```

在组件中，使用 `useTranslation` 进行翻译映射：

```jsx
import {useTranslation} from 'konjac'

function Hello() {
  const {t} = useTranslation()
  return (
    <div>
      {t(['Hello!', '你好！'])}
    </div>
  )
}
```

`t` 函数的参数 `messages` 是一个数组，每个元素和 `KonjacProvider` 配置中的 `allLocales` 按照顺序一一对应。虽然多数情况下我们会直接使用字符串，但 Konjac 的能力远不止于此，我们还可以使用 `ReactNode`，这使得 `t` 函数几乎可以应对任何场景：

```jsx
const {t} = useTranslation()
const user = {
  name: 'John'
}
const content = t([
  `Hello, ${user.name}!`,
  <span>你好，<i>{user.name}</i>！</span>
])
```

