# h3-defu

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> JSON Defaults for [h3](https://github.com/unjs/h3), using [defu](https://github.com/unjs/defu) under the hood.
## Install

```sh
# Using npm
npm install h3-defu

# Using yarn
yarn install h3-defu

# Using pnpm
pnpm install h3-defu
```

## Usage

```js
import { createApp } from 'h3'
import { createServer } from 'http'
import { readBodyWithDefaults, getQueryWithDefaults } from 'h3-defu'
// or
// if this way is more familiar to you until the convention is full deprecated  
import { useBodyWithDefaults, useQueryWithDefaults } from 'h3-defu'

const app = createApp()

app.use('/', async (event) => {
  // Default body
  const body = await readBodyWithDefaults(event, {
    show: true,
    name: "Anonymous"
  })

  // Default query
  const query = getQueryWithDefaults(event, {
    page: 1,
    limit: 10
  })
})

createServer(app).listen(process.env.PORT || 3000)
```

## Development 💻 

- Clone this repository
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## ➕ Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Credits

[`h3`](https://github.com/unjs/h3) is developed by [@unjs](https://github.com/unjs)

[`defu`](https://github.com/unjs/defu) is developed by [@unjs](https://github.com/unjs)

[`README Inspiration`](https://github.com/zernonia) by [@zernonia](https://github.com/zernonia)

## 📜 License

[MIT](./LICENSE) License © 2022 [cpreston321](https://github.com/cpreston321)

# 📧 Contact

cpreston321 - [@cpreston321](https://twitter.com/cpreston321)

Also, if you like my work, please feel free to [buy me a coffee](https://www.buymeacoffee.com/cpreston321) ☕️

<a href="https://www.buymeacoffee.com/cpreston321" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Logo" >
</a>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/h3-defu?style=flat-square
[npm-version-href]: https://npmjs.com/package/h3-defu

[npm-downloads-src]: https://img.shields.io/npm/dm/h3-defu?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/h3-defu

[github-actions-src]: https://img.shields.io/github/workflow/status/cpreston321/h3-defu/CI
[github-actions-href]: https://github.com/cpreston321/h3-defu/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/gh/cpreston321/h3-defu/main?style=flat-square
[codecov-href]: https://codecov.io/gh/cpreston321/h3-defu
