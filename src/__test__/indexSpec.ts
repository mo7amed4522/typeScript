import supertest from 'supertest';
import app from '../index';
// create a request object
const req = supertest(app);

describe('Test basic endpoint server', () => {
  it('Get the / endpoint', async () => {
    const response = await req.get('/');
    console.log(response);
  });
});
