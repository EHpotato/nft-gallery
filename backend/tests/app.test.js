const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../src/app');

let server;
let address = '0xD4d871419714B778eBec2E22C7c53572b573706e';

beforeAll(() => {
    server = http.createServer(app);
    server.listen();
    request = supertest(server);
    return db.reset();
});

afterAll((done) => {
    server.close(done);
});

test('GET /random-url-that-does-not-exist', async () => {
    await request.get('/random-url-that-does-not-exist')
    .expect(400);
})

describe('GET /:address?tokenID={tokenID}', () => {
    test('GET token 0', async () => {
        await request.get('/' + address + '?tokenID=0')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual('fulfilled');
            expect(response.body.value.data).toBeDefined();
            expect(response.body.value.data.image).toBeDefined();
        });
    });
    test('GET invalid tokenID', async () => {
        await request.get(`/${address}?tokenID=-1`)
        .expect(400)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.reason).toEqual('Error: invalid/missing tokenID');
        });
    });
    test('GET token not exists', async () => {
        await request.get(`/${address}?tokenID=50000000`)
        .expect(400)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.reason).toEqual('Returned error: execution reverted: ERC721Metadata: URI query for nonexistent token');
        });
    })
    test('GET token 0 twice', async () => {
        await request.get('/' + address + '?tokenID=0')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual('fulfilled');
            expect(response.body.value.data).toBeDefined();
            expect(response.body.value.data.image).toBeDefined();
        });
        await request.get('/' + address + '?tokenID=0')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual('fulfilled');
            expect(response.body.value.data).toBeDefined();
            expect(response.body.value.data.image).toBeDefined();
        });
    })
});

describe('GET /:address/:page', () => {
    test('GET first page', async () => {
        await request.get(`/${address}/0`)
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(9);
        });
    });
    jest.setTimeout(20000);
    test('GET page = -1', async () => {
        await request.get(`/${address}/-1`)
        .expect(400);
    })
    test('GET page out of bounds', async () => {
        await request.get(`/${address}/1000000`)
        .expect(200);
    })
});

describe('GET /:address?tokenID then calling /:address/:page', () => {
    test('GET tokenID = 1 then requesting /:address/0', async () => {
        await request.get('/' + address + '?tokenID=50')
        .expect(200)
        .then((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.status).toEqual('fulfilled');
            expect(response.body.value.data).toBeDefined();
            expect(response.body.value.data.image).toBeDefined();
        });
        await request.get(`/${address}/5`)
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(9);
        });
    })
})