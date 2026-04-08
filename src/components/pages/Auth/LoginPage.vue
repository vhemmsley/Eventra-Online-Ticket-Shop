<template>
  <!-- global container -->

  <div class="bg-secondary-gradient pt-4">
    <!-- header container -->
    <div class="flex flex-col section-container">
      <p class="text-3xl text-gradient text-center my-6">LogIn to Eventra</p>
    </div>

    <div class="section-container mt-6 flex flex-col">
      <!-- card container -->
      <div
        class="relative flex flex-col margin-6 space-y-10 bg-white shadow-2xl rouded-2xl md:flex-row md:space-y-0 md:m-0"
      >
        <!-- left side-->
        <div class="p-6 md:p-12">
          <!-- top content-->
          <h2 class="mb-5 text-2xl">Welcome Back</h2>
          <p class="mx-w-sm mb-12 font-sans font-light-text-gray-600">
            Log in to your account to discover or host amazing events.
          </p>

          <!-- login elements-->
          <div>
            <div class="flex flex-col">
              <!-- email -->
              <div class="flex flex-col space-y-2">
                <p>Email</p>
                <div
                  class="flex flex-row border-2 items-center justify-center space-x-2 shadow-lg text-sm rounded-lg p-3 md:p-2 w-80 md:w-60"
                >
                  <span>✉️</span>
                  <input
                    type="text"
                    class="p-1 placeholder:text-md hover:border-purple-400 outline-purple-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="flex flex-col space-y-2">
                <p>Password</p>
                <div
                  class="flex flex-row items-center justify-center border-2 space-x-2 shadow-lg text-sm rounded-lg p-3 md:p-2 w-80 md:w-60"
                >
                  <span>🔑</span>
                  <input
                    type="text"
                    class="p-1 placeholder:text-md hover:border-purple-400 outline-purple-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- middle container -->
          <div
            class="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0"
          >
            <div class="font-thin text-cyan-700">Forgot password ?</div>
            <button
              class="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
            >
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <!-- border in btw-->
          <div class="mt-12 border-b border-b-gray-300"></div>

          <!-- bottom content -->
          <p class="py-6 text-sm font-thin text-center text-gray-400">Or login with</p>

          <!-- buttoms button container -->
          <div class="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
            <button
              class="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img src="../../../images/socials/facebook.png" class="w-9" alt="" />
              <span>Facebook</span>
            </button>

            <button
              class="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img src="../../../images/socials/google.png" class="w-9" alt="" />
              <span>Google</span>
            </button>
          </div>
        </div>

        <!-- right side-->
        <img src="../../../images/image.jpg" class="w-[430px] hidden md:block" alt="" />

        <!-- close button -->
        <div
          class="group absolute -top-5 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-black group-hover:text-gray-600"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
