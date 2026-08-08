<template>
  <span
    class="
      inline-block
      bg-gray-50
      text-gray-700
      text-sm
      px-3
      py-1
      rounded-full
      border border-gray-100
    "
  >
    {{ skill }}
  </span>
</template>

<script>
export default {
  props: {
    skill: {
      type: String,
      required: true
    }
  }
}
</script>
