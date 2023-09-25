<template>
  <div
    class="relative flex justify-center items-center w-full min-h-screen  bg-gradient-to-r from-cyan-100 to-blue-100 "
  >
    <div
      class="w-full p-2 max-w-3xl min-h-full rounded-lg z-10"
    >
      <ClientOnly>
        <ContactForm />
      </ClientOnly>
    </div>
    <div class="absolute left-0 top-0 w-screen h-screen z-0">
      <div class="animatedBubblesCont">
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
        <div class="animatedBubble"></div>
      </div>
    </div>

  </div>
</template>
<script setup></script>
