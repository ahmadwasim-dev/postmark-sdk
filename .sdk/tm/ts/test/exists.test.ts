
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PostmarkSdkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PostmarkSdkSDK.test()
    equal(testsdk instanceof PostmarkSdkSDK, true,
      'PostmarkSdkSDK.test() must return a client synchronously')
  })

})
