import App from '../src/application'

describe('[application]', () => {
  const app = new App()

  app.use(async (ctx, next) => {
    console.log(ctx)
    await next()
    console.log(ctx)
  })

  test('console context ', async () => {
    return await app.serve(
      {
        url: 'getOpenId'
      },
      {}
    )
  })
})
