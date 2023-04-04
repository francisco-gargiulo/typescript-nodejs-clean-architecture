import request from "supertest";
import app from "../startup";

describe("Test user routes", () => {
  const userData = {
    name: "John Doe",
    email: "test@example.com",
    password: "password",
  };

  let userId: string;

  it("POST /users should create a new user", async () => {
    const response = await request(app).post("/users").send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      email: userData.email,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    userId = response.body.id;
  });

  it("GET /users/:id should return the created user", async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: userId,
      name: userData.name,
      email: userData.email,
    });
  });

  it("PUT /users/:id should update the user", async () => {
    const updateData = {
      name: "Jane Doe",
      email: "new@example.com",
      password: "newpassword",
    };
    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: userId,
      name: updateData.name,
      email: updateData.email,
      updatedAt: expect.any(String),
    });
  });

  it("DELETE /users/:id should delete the user", async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(204);
    const checkResponse = await request(app).get(`/users/${userId}`);
    expect(checkResponse.status).toBe(404);
  });
});
