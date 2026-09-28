import api_client from "./Apiclient";

/*
|--------------------------------------------------------------------------
| CUSTOMER LOGIN
|--------------------------------------------------------------------------
*/

export const login = async (credentials) => {
  if (
    !credentials?.username ||
    !credentials?.password
  ) {
    throw new Error(
      "Username and password are required."
    );
  }

  const response = await api_client.post(
    "/auth/login",
    {
      username: credentials.username,
      password: credentials.password,
    }
  );

  const data = response.data;

  if (!data?.access_token) {
    throw new Error(
      "Login successful, but access token was not returned."
    );
  }

  localStorage.setItem(
    "access_token",
    data.access_token
  );

  if (data.refresh_token) {
    localStorage.setItem(
      "refresh_token",
      data.refresh_token
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Get logged-in user
  |--------------------------------------------------------------------------
  */

  const userResponse =
    await api_client.get("/auth/me");

  const user = userResponse.data;

  /*
  |--------------------------------------------------------------------------
  | Customer-only application
  |--------------------------------------------------------------------------
  */

  if (user.role !== "customer") {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    throw new Error(
      "Only customer accounts can access this application."
    );
  }

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  return {
    ...data,
    user,
  };
};


/*
|--------------------------------------------------------------------------
| CUSTOMER REGISTER
|--------------------------------------------------------------------------
*/

export const register = async (userData) => {
  if (!userData) {
    throw new Error(
      "Registration data is required."
    );
  }

  const response =
    await api_client.post(
      "/auth/register",
      {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        confirmpassword:
          userData.confirmpassword,
      }
    );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export const logout = async () => {
  const refreshToken =
    localStorage.getItem(
      "refresh_token"
    );

  try {
    if (refreshToken) {
      await api_client.post(
        "/auth/logout",
        {
          refresh_token: refreshToken,
        }
      );
    }
  } catch (error) {
    console.error(
      "Logout API error:",
      error
    );
  } finally {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "user"
    );
  }
};


/*
|--------------------------------------------------------------------------
| AUTHENTICATION CHECK
|--------------------------------------------------------------------------
*/

export const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem(
      "access_token"
    )
  );
};


/*
|--------------------------------------------------------------------------
| GET STORED USER
|--------------------------------------------------------------------------
*/

export const getCurrentUser = () => {
  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};