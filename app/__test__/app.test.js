test("nothing", () => {expect(1).toBe(1)});

//at the moment, I have no idea, how to test the electron UI itself

const electronPath = require('electron')
const {TestDriver} = require('./testDriver')

const app = new TestDriver({
    path: electronPath,
    args: ['app/ui/electron/main/main.js'],
    env: {
        NODE_ENV: 'test'
    }
})

beforeAll(async () => {
    await app.isReady;
})

test('open window', async () => {
    let result = await app.rpc('open_main_window');
    expect(result).toBe(43);
})

test('electron Test Driver', async () => {
    let result = await app.rpc('a_test');
    expect(result).toBe(42);
})


afterAll(async () => {
    await app.stop();
})




