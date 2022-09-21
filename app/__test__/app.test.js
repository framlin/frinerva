//at the moment, I have no idea, how to test the electron UI itself
/**
 * @jest-environment jsdom
 */
test('nothing', () => expect(1).toBe(1));
// describe.skip('app test', () => {
//
//     const electronPath = require('electron')
//     const {TestDriver} = require('./TestDriver')
//
//     const app = new TestDriver({
//         path: electronPath,
//         args: ['app/ui/electron/main/main.js'],
//         env: {
//             NODE_ENV: 'test'
//         }
//     })
//
//     beforeEach(async () => {
//         await app.isReady;
//     })
//
//     test('open window', async () => {
//         let result = await app.rpc('open_main_window');
//         expect(result).toBe(4);
//     })
//
//     test('electron Test Driver', async () => {
//         let result = await app.rpc('a_test');
//         expect(result).toBe(42);
//     });
//
//
//
//
//     afterEach(async () => {
//         await app.stop();
//     })
//
// })
