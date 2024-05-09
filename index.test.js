const request = require('supertest');
const app = require('./src/app');


describe('GET /users', () => {
  test('returns all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); 
  });
});

describe('GET /users/:id', () => {
  test('returns a user by id', async () => {
    const response = await request(app).get('/users/2'); 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id'); 
  });

  test('returns 404 for non-existent user id', async () => {
    const response = await request(app).get('/users/999'); 
    expect(response.status).toBe(404);
  });
});

describe('POST /users', () => {
  test('creates a new user', async () => {
    const newUser = { name: 'Test User' };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); 
  });
});

describe('PUT /users/:id', () => {
  test('updates an existing user', async () => {
    const updatedUser = { name: 'Updated User' }
    const response = await request(app).put('/users/2').send(updatedUser); 
    expect(response.body.name).toBe(updatedUser.name); 
  });
});

describe('DELETE /users/:id', () => {
  test('deletes an existing user', async () => {
    const response = await request(app).delete('/users/2'); 
    expect(response.status).toBe(204);
  });

  test('returns 404 for non-existent user id', async () => {
    const response = await request(app).delete('/users/999');
    expect(response.status).toBe(404);
  });
});