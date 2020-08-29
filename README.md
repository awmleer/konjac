# Konjac

可能是你见过最好用的 React 国际化方案

![翻译魔芋](https://i.imgur.com/O48coa1.jpg)

> Konjac 取自《哆啦A梦》中的"翻译魔芋"

- 🖇 内联语料，减少上下文跳转
- 🛠 完善的 jsx 支持
- 🔪 完全自动的 Code Splitting
- 🔌 极致的轻量，强大的可拓展性

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

## 凭啥要用 Konjac？

因为，内联语料。

国际化已经渐渐成为一个大型工程的标配了，而 React 应用相关的国际化方案也层出不穷，但在传统方案中，语料往往是作为一套独立的 json 对象而存在的。我们需要给每一条语料定义一个 key，然后在组件中使用这个 key 索引到对应版本的语料：

```json5
// en-US.json
{
  "dashboard.header.title": "Hello"
}
```

```json5
// zh-CN.json
{
  "dashboard.header.title": "你好"
}
```

```js
const title = t('dashboard.header.title')
```

似乎没什么异样？然而，随着项目的发展，我们很可能会遇到非常多的问题：

1. key 是以纯字符串的方式存在的，对类型检查非常不友好，如果不小心写错，需要在运行时才能发现
2. key 出现在多个文件（业务组件 + 多个语言版本各自的文件），导致开发中需要频繁的上下文跳转
3. 难以维护，当业务逻辑发生变化时，key 往往也需要跟着调整，然而，由于 key 只是字符串，批量重命名、批量移动、清理不再被引用的语料等等这些操作都十分繁琐
4. 所有的语料都塞在一个大 json 中，当应用启动时，需要一次性的加载全部语料，存在性能隐患

所以 Konjac 采用了"内联语料优先"的策略，我们不再需要为每一条语料绞尽脑汁的想一个 key 了，一切都是内联在组件中的，因为我们相信，翻译语料，也是组件逻辑本身的一部分。

内联语料可以自然而完美地解决上述问题，其中最为显著的，就是减少上下文切换和对代码切分的天然支持。

当然，内联语料也并非百利而无一害，例如，内联语料可能会降低复用性，不过，在 Konjac 中，我们其实仍然可以使用集中化的模式：

```js
const locale = {
  dashboard: {
    title: ['Hello', '你好'],
    description: ['...', '...'],
  },
}

const title = t(locale.dashboard.title)
```

比起使用 json，使用 js 对象来定义的好处显而易见：多层级嵌套、自动补全、类型检查、代码跳转、反向引用查询、灵活的拆分和组装……

事实上，Konjac 是一个非常简单而轻量的库，也并未明确规定使用者要如何组织代码，因为国际化本身就应该十分自然、灵活。
