const getNpmDownloads = require('./getNpmDownloads');

jest.setTimeout(100000000);

describe('argUtility test', () => {
    // test('This module\'s download count should be greater than or equal to zero', async () => {
    //     const cnt = await getNpmDownloads({ repository: 'get-npm-downloads', period: 'today' });

    //     expect(cnt.downloads >= 0).toBe(true);
    // });

    test('This module\'s download count should be greater than or equal to zero', async () => {
        console.time();
        const cnts = await getNpmDownloads({ userId: 'jopemachine', period: 'today' });
        console.timeEnd('c!');

        for (const cnt of cnts) {
            expect(cnt.downloads >= 0).toBe(true);
        }
    });
});