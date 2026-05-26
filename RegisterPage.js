// RegisterPage.js

async function registerUser(userData) {
  try {
    const response = await fetch("/api/register", {
      method: "POST", // method attribute
      headers: {
        "Content-Type": "application/json" // header attribute
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const result = await response.json();
    console.log("User registered successfully:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
registerUser({ username: "Zama", password: "mypassword123" });
