"use client";
import Header from "@/app/conponents/Header";
import axios from "axios";
import React from "react";

const Page = () => {
  const [userName, setUsrName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          username: userName,
          password: password,
        }
      );
      console.log(response);
      if (response.data.isSucces) {
        alert(response.data.resultMessage);
      } else {
        alert("Errors: " + response.data.errorMessage);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <form className="w-[400px]">
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              username
            </label>
            <input
              type="username"
              id="username"
              onChange={(e) => setUsrName(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => loginHandler()}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            login
          </button>
        </form>
      </div>
    </>
  );
};
export default Page;
