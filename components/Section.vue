<template>
  <section :id="id" class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <h2
        v-if="title"
        class="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 text-center"
      >
        {{ title }}
      </h2>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  }
}
</script>
