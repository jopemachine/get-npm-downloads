const getNpmDownloads = require('./getNpmDownloads');

describe('argUtility test', () => {
    test('This module\'s download count should be greater than or equal to zero', async () => {
        const cnt = await getNpmDownloads({ repository: 'get-npm-downloads', period: 'today' });

        expect(cnt.downloads >= 0).toBe(true);
    });
});